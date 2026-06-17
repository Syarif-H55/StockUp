import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaService } from '../../core/database/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateRfqDto, UpdateRfqDto, RfqQueryDto } from './dto';

@Injectable()
export class RfqService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(userId: string, dto: CreateRfqDto) {
    const buyer = await this.prisma.buyerProfile.findUnique({ where: { userId } });
    if (!buyer) {
      throw new NotFoundException('Profil buyer tidak ditemukan');
    }

    const category = await this.prisma.category.findUnique({ where: { id: dto.categoryId } });
    if (!category || !category.isActive) {
      throw new NotFoundException('Kategori tidak ditemukan atau tidak aktif');
    }

    const rfq = await this.prisma.rfq.create({
      data: {
        buyerId: buyer.id,
        title: dto.title,
        description: dto.description,
        categoryId: dto.categoryId,
        quantity: dto.quantity,
        unit: dto.unit,
        budget: dto.budget,
        deadlineAt: new Date(dto.deadlineAt),
      },
      include: {
        category: true,
        buyer: { include: { user: { select: { fullName: true } } } },
      },
    });

    const matchingSuppliers = await this.prisma.supplierProfile.findMany({
      where: {
        verificationStatus: 'VERIFIED',
        categories: { some: { categoryId: dto.categoryId } },
      },
      include: { user: { select: { id: true, email: true } } },
    });

    if (matchingSuppliers.length > 0) {
      this.eventEmitter.emit('rfq.created', {
        rfqId: rfq.id,
        rfqTitle: rfq.title,
        supplierUserIds: matchingSuppliers.map((s) => ({
          id: s.user.id,
          email: s.user.email,
          businessName: s.businessName,
        })),
      });
    }

    return rfq;
  }

  async findByBuyer(userId: string, query: RfqQueryDto) {
    const buyer = await this.prisma.buyerProfile.findUnique({ where: { userId } });
    if (!buyer) {
      throw new NotFoundException('Profil buyer tidak ditemukan');
    }

    const { page = 1, limit = 10, status, categoryId } = query;
    const where: Prisma.RfqWhereInput = { buyerId: buyer.id };

    if (status) where.status = status as any;
    if (categoryId) where.categoryId = categoryId;

    const [data, total] = await Promise.all([
      this.prisma.rfq.findMany({
        where,
        include: {
          category: true,
          quotations: {
            include: { supplier: { select: { id: true, businessName: true } } },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.rfq.count({ where }),
    ]);

    return {
      data,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async findForSupplier(userId: string, query: RfqQueryDto) {
    const supplier = await this.prisma.supplierProfile.findUnique({
      where: { userId },
      include: { categories: true },
    });
    if (!supplier) {
      throw new NotFoundException('Profil supplier tidak ditemukan');
    }

    if (supplier.verificationStatus !== 'VERIFIED') {
      throw new ForbiddenException('Supplier harus terverifikasi untuk melihat RFQ');
    }

    const supplierCategoryIds = supplier.categories.map((c) => c.categoryId);
    if (supplierCategoryIds.length === 0) {
      return { data: [], meta: { page: 1, limit: 10, total: 0, totalPages: 0 } };
    }

    const { page = 1, limit = 10, status } = query;
    const where: Prisma.RfqWhereInput = {
      categoryId: { in: supplierCategoryIds },
      deadlineAt: { gte: new Date() },
    };

    if (status) where.status = status as any;
    else where.status = 'OPEN';

    const [data, total] = await Promise.all([
      this.prisma.rfq.findMany({
        where,
        include: {
          category: true,
          buyer: { select: { id: true, businessName: true } },
          quotations: {
            where: { supplierId: supplier.id },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.rfq.count({ where }),
    ]);

    return {
      data,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async findById(id: string) {
    const rfq = await this.prisma.rfq.findUnique({
      where: { id },
      include: {
        category: true,
        buyer: { include: { user: { select: { fullName: true } } } },
        quotations: {
          include: {
            supplier: {
              include: {
                user: { select: { fullName: true } },
                badges: { include: { badge: true } },
              },
            },
          },
        },
      },
    });
    if (!rfq) {
      throw new NotFoundException('RFQ tidak ditemukan');
    }
    return rfq;
  }

  async update(userId: string, rfqId: string, dto: UpdateRfqDto) {
    const buyer = await this.prisma.buyerProfile.findUnique({ where: { userId } });
    if (!buyer) {
      throw new NotFoundException('Profil buyer tidak ditemukan');
    }

    const rfq = await this.prisma.rfq.findUnique({ where: { id: rfqId } });
    if (!rfq) {
      throw new NotFoundException('RFQ tidak ditemukan');
    }
    if (rfq.buyerId !== buyer.id) {
      throw new ForbiddenException('Anda tidak memiliki akses ke RFQ ini');
    }
    if (rfq.status !== 'OPEN') {
      throw new BadRequestException('Hanya RFQ dengan status OPEN yang dapat diedit');
    }

    if (dto.categoryId) {
      const category = await this.prisma.category.findUnique({ where: { id: dto.categoryId } });
      if (!category || !category.isActive) {
        throw new NotFoundException('Kategori tidak ditemukan atau tidak aktif');
      }
    }

    return this.prisma.rfq.update({
      where: { id: rfqId },
      data: {
        ...dto,
        deadlineAt: dto.deadlineAt ? new Date(dto.deadlineAt) : undefined,
      },
      include: {
        category: true,
        quotations: {
          include: { supplier: { select: { id: true, businessName: true } } },
        },
      },
    });
  }

  async close(userId: string, rfqId: string) {
    const buyer = await this.prisma.buyerProfile.findUnique({ where: { userId } });
    if (!buyer) {
      throw new NotFoundException('Profil buyer tidak ditemukan');
    }

    const rfq = await this.prisma.rfq.findUnique({ where: { id: rfqId } });
    if (!rfq) {
      throw new NotFoundException('RFQ tidak ditemukan');
    }
    if (rfq.buyerId !== buyer.id) {
      throw new ForbiddenException('Anda tidak memiliki akses ke RFQ ini');
    }
    if (rfq.status !== 'OPEN') {
      throw new BadRequestException('Hanya RFQ dengan status OPEN yang dapat ditutup');
    }

    return this.prisma.rfq.update({
      where: { id: rfqId },
      data: { status: 'CLOSED', closedAt: new Date() },
      include: { category: true },
    });
  }

  async getRfqDistributionInfo(rfqId: string) {
    const rfq = await this.prisma.rfq.findUnique({
      where: { id: rfqId },
      include: { category: true },
    });
    if (!rfq) {
      throw new NotFoundException('RFQ tidak ditemukan');
    }

    const eligibleSuppliers = await this.prisma.supplierProfile.count({
      where: {
        verificationStatus: 'VERIFIED',
        categories: { some: { categoryId: rfq.categoryId } },
      },
    });

    return {
      eligibleSupplierCount: eligibleSuppliers,
      category: rfq.category,
    };
  }

  async findAll(query: RfqQueryDto) {
    const { page = 1, limit = 10, status, categoryId } = query;
    const where: Prisma.RfqWhereInput = {};
    if (status) where.status = status as any;
    if (categoryId) where.categoryId = categoryId;

    const [data, total] = await Promise.all([
      this.prisma.rfq.findMany({
        where,
        include: {
          category: true,
          buyer: { include: { user: { select: { fullName: true, email: true } } } },
          _count: { select: { quotations: true } },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.rfq.count({ where }),
    ]);

    return {
      data,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }
}
