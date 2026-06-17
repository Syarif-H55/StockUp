import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardStats() {
    const [
      totalUsers,
      totalBuyers,
      totalSuppliers,
      totalVerifications,
      pendingVerifications,
      totalRfqs,
      openRfqs,
      totalQuotations,
      activeSuppliers,
      activeBuyers,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.buyerProfile.count(),
      this.prisma.supplierProfile.count(),
      this.prisma.supplierVerification.count(),
      this.prisma.supplierVerification.count({ where: { status: 'PENDING' } }),
      this.prisma.rfq.count(),
      this.prisma.rfq.count({ where: { status: 'OPEN' } }),
      this.prisma.quotation.count(),
      this.prisma.supplierProfile.count({
        where: {
          user: { accountStatus: 'ACTIVE' },
          verificationStatus: 'VERIFIED',
        },
      }),
      this.prisma.buyerProfile.count({
        where: { user: { accountStatus: 'ACTIVE' } },
      }),
    ]);

    return {
      totalUsers,
      totalBuyers,
      totalSuppliers,
      totalVerifications,
      pendingVerifications,
      totalRfqs,
      openRfqs,
      totalQuotations,
      activeSuppliers,
      activeBuyers,
    };
  }

  async getSuppliers(page = 1, limit = 20) {
    const [data, total] = await Promise.all([
      this.prisma.supplierProfile.findMany({
        include: {
          user: { select: { fullName: true, email: true, accountStatus: true, createdAt: true } },
          categories: { include: { category: true } },
          _count: { select: { quotations: true } },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.supplierProfile.count(),
    ]);
    return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async getSupplierDetail(supplierId: string) {
    const supplier = await this.prisma.supplierProfile.findUnique({
      where: { id: supplierId },
      include: {
        user: { select: { fullName: true, email: true, accountStatus: true, createdAt: true } },
        categories: { include: { category: true } },
        verifications: { orderBy: { createdAt: 'desc' } },
        badges: { include: { badge: true } },
        quotations: {
          include: { rfq: { select: { title: true } } },
          orderBy: { submittedAt: 'desc' },
          take: 20,
        },
      },
    });
    if (!supplier) throw new NotFoundException('Supplier tidak ditemukan');
    return supplier;
  }

  async suspendSupplier(supplierId: string) {
    const supplier = await this.prisma.supplierProfile.findUnique({ where: { id: supplierId } });
    if (!supplier) throw new NotFoundException('Supplier tidak ditemukan');
    return this.prisma.user.update({
      where: { id: supplier.userId },
      data: { accountStatus: 'SUSPENDED' },
    });
  }

  async reactivateSupplier(supplierId: string) {
    const supplier = await this.prisma.supplierProfile.findUnique({ where: { id: supplierId } });
    if (!supplier) throw new NotFoundException('Supplier tidak ditemukan');
    return this.prisma.user.update({
      where: { id: supplier.userId },
      data: { accountStatus: 'ACTIVE' },
    });
  }

  async getRfqs(page = 1, limit = 20) {
    const [data, total] = await Promise.all([
      this.prisma.rfq.findMany({
        include: {
          category: true,
          buyer: { select: { businessName: true, user: { select: { fullName: true } } } },
          _count: { select: { quotations: true } },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.rfq.count(),
    ]);
    return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async getRfqDetail(id: string) {
    const rfq = await this.prisma.rfq.findUnique({
      where: { id },
      include: {
        category: true,
        buyer: {
          include: { user: { select: { fullName: true, email: true } } },
        },
        selectedSupplier: {
          include: { user: { select: { fullName: true, email: true } } },
        },
        quotations: {
          include: {
            supplier: {
              include: { user: { select: { fullName: true, email: true } } },
            },
          },
        },
      },
    });
    if (!rfq) throw new NotFoundException('RFQ tidak ditemukan');
    return rfq;
  }

  async getBuyers(page = 1, limit = 20) {
    const [data, total] = await Promise.all([
      this.prisma.buyerProfile.findMany({
        include: {
          user: { select: { fullName: true, email: true, accountStatus: true, createdAt: true } },
          _count: { select: { rfqs: true } },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.buyerProfile.count(),
    ]);
    return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async getRecentActivities(limit = 20) {
    const auditLogs = await this.prisma.auditLog.findMany({
      include: { user: { select: { fullName: true, email: true, role: true } } },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return auditLogs;
  }
}
