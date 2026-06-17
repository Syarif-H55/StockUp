import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { Prisma } from '@prisma/client';
import { UpdateSupplierProfileDto, AddSupplierCategoriesDto, SupplierDirectoryQueryDto } from './dto';

@Injectable()
export class SuppliersService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(userId: string) {
    const profile = await this.prisma.supplierProfile.findUnique({
      where: { userId },
      include: {
        categories: { include: { category: true } },
        badges: { include: { badge: true } },
      },
    });
    if (!profile) {
      throw new NotFoundException('Profil supplier tidak ditemukan');
    }
    return profile;
  }

  async updateProfile(userId: string, dto: UpdateSupplierProfileDto) {
    const profile = await this.prisma.supplierProfile.findUnique({
      where: { userId },
    });
    if (!profile) {
      throw new NotFoundException('Profil supplier tidak ditemukan');
    }
    return this.prisma.supplierProfile.update({
      where: { userId },
      data: dto,
      include: {
        categories: { include: { category: true } },
        badges: { include: { badge: true } },
      },
    });
  }

  async addCategories(userId: string, dto: AddSupplierCategoriesDto) {
    const profile = await this.prisma.supplierProfile.findUnique({
      where: { userId },
    });
    if (!profile) {
      throw new NotFoundException('Profil supplier tidak ditemukan');
    }

    const existingCategories = await this.prisma.supplierCategory.findMany({
      where: { supplierId: profile.id },
    });
    const existingCategoryIds = existingCategories.map((c) => c.categoryId);

    const newCategoryIds = dto.categoryIds.filter((id) => !existingCategoryIds.includes(id));

    if (newCategoryIds.length > 0) {
      await this.prisma.supplierCategory.createMany({
        data: newCategoryIds.map((categoryId) => ({
          supplierId: profile.id,
          categoryId,
        })),
        skipDuplicates: true,
      });
    }

    return this.prisma.supplierProfile.findUnique({
      where: { userId },
      include: {
        categories: { include: { category: true } },
        badges: { include: { badge: true } },
      },
    });
  }

  async removeCategory(userId: string, categoryId: string) {
    const profile = await this.prisma.supplierProfile.findUnique({
      where: { userId },
    });
    if (!profile) {
      throw new NotFoundException('Profil supplier tidak ditemukan');
    }

    await this.prisma.supplierCategory.deleteMany({
      where: { supplierId: profile.id, categoryId },
    });

    return this.prisma.supplierProfile.findUnique({
      where: { userId },
      include: {
        categories: { include: { category: true } },
        badges: { include: { badge: true } },
      },
    });
  }

  async getDirectory(query: SupplierDirectoryQueryDto) {
    const { page = 1, limit = 10, search, categorySlug, verificationStatus, sortBy = 'createdAt', sortOrder = 'desc' } = query;

    const where: Prisma.SupplierProfileWhereInput = {};

    if (search) {
      where.OR = [
        { businessName: { contains: search } },
        { description: { contains: search } },
        { user: { fullName: { contains: search } } },
      ];
    }

    if (categorySlug) {
      where.categories = {
        some: { category: { slug: categorySlug, isActive: true } },
      };
    }

    if (verificationStatus) {
      where.verificationStatus = verificationStatus as any;
    }

    const [data, total] = await Promise.all([
      this.prisma.supplierProfile.findMany({
        where,
        include: {
          categories: { include: { category: true } },
          badges: { include: { badge: true } },
          user: { select: { fullName: true } },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.supplierProfile.count({ where }),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getDashboardStats(userId: string) {
    const profile = await this.prisma.supplierProfile.findUnique({
      where: { userId },
    });
    if (!profile) {
      throw new NotFoundException('Profil supplier tidak ditemukan');
    }

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const [
      totalQuotations,
      quotationsThisMonth,
      totalRfqResponses,
      pendingVerification,
      selectedQuotations,
      badges,
    ] = await Promise.all([
      this.prisma.quotation.count({ where: { supplierId: profile.id } }),
      this.prisma.quotation.count({
        where: { supplierId: profile.id, submittedAt: { gte: thirtyDaysAgo } },
      }),
      this.prisma.quotation.count({ where: { supplierId: profile.id } }),
      profile.verificationStatus === 'PENDING'
        ? this.prisma.supplierVerification.count({
            where: { supplierId: profile.id, status: 'PENDING' },
          })
        : Promise.resolve(0),
      this.prisma.quotation.count({
        where: { supplierId: profile.id, status: 'SELECTED' },
      }),
      this.prisma.supplierBadge.findMany({
        where: { supplierId: profile.id },
        include: { badge: true },
      }),
    ]);

    return {
      totalQuotations,
      quotationsThisMonth,
      totalRfqResponses,
      pendingVerification: pendingVerification > 0,
      selectedQuotations,
      totalBadges: badges.length,
      badges,
      verificationStatus: profile.verificationStatus,
      accountAge: profile.createdAt,
    };
  }

  async getPublicProfile(supplierId: string) {
    const profile = await this.prisma.supplierProfile.findUnique({
      where: { id: supplierId },
      include: {
        categories: {
          include: { category: true },
        },
        badges: {
          include: { badge: true },
        },
        user: {
          select: { fullName: true, createdAt: true },
        },
      },
    });

    if (!profile) {
      throw new NotFoundException('Supplier tidak ditemukan');
    }

    return profile;
  }
}
