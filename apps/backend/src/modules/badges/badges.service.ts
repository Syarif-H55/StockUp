import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { AssignBadgeDto, CreateBadgeDto } from './dto';

@Injectable()
export class BadgesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(includeInactive = false) {
    return this.prisma.badge.findMany({
      where: includeInactive ? {} : { isActive: true },
      orderBy: { displayName: 'asc' },
    });
  }

  async findBySupplier(supplierId: string) {
    return this.prisma.supplierBadge.findMany({
      where: { supplierId },
      include: { badge: true },
      orderBy: { awardedAt: 'desc' },
    });
  }

  async create(dto: CreateBadgeDto) {
    const existing = await this.prisma.badge.findUnique({ where: { name: dto.name } });
    if (existing) {
      throw new ConflictException('Badge dengan nama tersebut sudah ada');
    }
    return this.prisma.badge.create({ data: dto });
  }

  async assign(adminId: string, dto: AssignBadgeDto) {
    const badge = await this.prisma.badge.findUnique({ where: { id: dto.badgeId } });
    if (!badge || !badge.isActive) {
      throw new NotFoundException('Badge tidak ditemukan atau tidak aktif');
    }

    const supplier = await this.prisma.supplierProfile.findUnique({ where: { id: dto.supplierId } });
    if (!supplier) {
      throw new NotFoundException('Supplier tidak ditemukan');
    }

    const existing = await this.prisma.supplierBadge.findUnique({
      where: { supplierId_badgeId: { supplierId: dto.supplierId, badgeId: dto.badgeId } },
    });
    if (existing) {
      throw new ConflictException('Supplier sudah memiliki badge ini');
    }

    return this.prisma.supplierBadge.create({
      data: {
        supplierId: dto.supplierId,
        badgeId: dto.badgeId,
        awardedBy: adminId,
      },
      include: { badge: true },
    });
  }

  async remove(supplierId: string, badgeId: string) {
    const result = await this.prisma.supplierBadge.deleteMany({
      where: { supplierId, badgeId },
    });
    if (result.count === 0) {
      throw new NotFoundException('Badge tidak ditemukan pada supplier ini');
    }
    return { message: 'Badge berhasil dihapus dari supplier' };
  }
}
