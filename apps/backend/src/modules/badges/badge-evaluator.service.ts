import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class BadgeEvaluatorService {
  private readonly logger = new Logger(BadgeEvaluatorService.name);

  constructor(private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async evaluateAllBadges() {
    this.logger.log('Starting badge evaluation...');
    await Promise.all([
      this.evaluateTrustedSupplierBadge(),
      this.evaluateResponsiveSupplierBadge(),
    ]);
    this.logger.log('Badge evaluation completed');
  }

  async evaluateTrustedSupplierBadge() {
    const badge = await this.prisma.badge.findUnique({
      where: { name: 'TRUSTED_SUPPLIER' },
    });
    if (!badge || !badge.isActive) return;

    const verifiedSuppliers = await this.prisma.supplierProfile.findMany({
      where: {
        verificationStatus: 'VERIFIED',
        user: { accountStatus: 'ACTIVE' },
      },
      include: {
        user: { select: { createdAt: true } },
        badges: true,
      },
    });

    for (const supplier of verifiedSuppliers) {
      const alreadyHasBadge = supplier.badges.some((b) => b.badgeId === badge.id);
      if (alreadyHasBadge) continue;

      const accountAge = Date.now() - new Date(supplier.user.createdAt).getTime();
      const accountAgeDays = accountAge / (1000 * 60 * 60 * 24);

      if (accountAgeDays >= 14) {
        await this.prisma.supplierBadge.create({
          data: {
            supplierId: supplier.id,
            badgeId: badge.id,
            awardedBy: 'SYSTEM',
          },
        });
        this.logger.log(`Trusted Supplier badge awarded to ${supplier.businessName}`);
      }
    }
  }

  async evaluateResponsiveSupplierBadge() {
    const badge = await this.prisma.badge.findUnique({
      where: { name: 'RESPONSIVE_SUPPLIER' },
    });
    if (!badge || !badge.isActive) return;

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const activeSuppliers = await this.prisma.supplierProfile.findMany({
      where: {
        verificationStatus: 'VERIFIED',
        user: { accountStatus: 'ACTIVE' },
      },
      include: {
        quotations: {
          where: { submittedAt: { gte: thirtyDaysAgo } },
          include: { rfq: { select: { createdAt: true, deadlineAt: true } } },
        },
        badges: true,
      },
    });

    for (const supplier of activeSuppliers) {
      const alreadyHasBadge = supplier.badges.some((b) => b.badgeId === badge.id);
      if (alreadyHasBadge) continue;

      if (supplier.quotations.length === 0) continue;

      const responseTimes = supplier.quotations.map((q) => {
        const responseTime = q.submittedAt.getTime() - q.rfq.createdAt.getTime();
        return responseTime / (1000 * 60 * 60);
      });

      const avgResponseHours = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;

      if (avgResponseHours <= 24 && supplier.quotations.length >= 3) {
        await this.prisma.supplierBadge.create({
          data: {
            supplierId: supplier.id,
            badgeId: badge.id,
            awardedBy: 'SYSTEM',
          },
        });
        this.logger.log(`Responsive Supplier badge awarded to ${supplier.businessName}`);
      }
    }
  }

  async evaluateSupplier(supplierId: string) {
    await Promise.all([
      this.evaluateSingleTrustedBadge(supplierId),
      this.evaluateSingleResponsiveBadge(supplierId),
    ]);
  }

  private async evaluateSingleTrustedBadge(supplierId: string) {
    const badge = await this.prisma.badge.findUnique({
      where: { name: 'TRUSTED_SUPPLIER' },
    });
    if (!badge || !badge.isActive) return;

    const supplier = await this.prisma.supplierProfile.findUnique({
      where: { id: supplierId },
      include: {
        user: { select: { createdAt: true } },
        badges: true,
      },
    });
    if (!supplier || supplier.verificationStatus !== 'VERIFIED') return;

    const alreadyHasBadge = supplier.badges.some((b) => b.badgeId === badge.id);
    if (alreadyHasBadge) return;

    const accountAge = Date.now() - new Date(supplier.user.createdAt).getTime();
    const accountAgeDays = accountAge / (1000 * 60 * 60 * 24);

    if (accountAgeDays >= 14) {
      await this.prisma.supplierBadge.create({
        data: { supplierId: supplier.id, badgeId: badge.id, awardedBy: 'SYSTEM' },
      });
      this.logger.log(`Trusted Supplier badge awarded to ${supplier.businessName}`);
    }
  }

  private async evaluateSingleResponsiveBadge(supplierId: string) {
    const badge = await this.prisma.badge.findUnique({
      where: { name: 'RESPONSIVE_SUPPLIER' },
    });
    if (!badge || !badge.isActive) return;

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const supplier = await this.prisma.supplierProfile.findUnique({
      where: { id: supplierId },
      include: {
        quotations: {
          where: { submittedAt: { gte: thirtyDaysAgo } },
          include: { rfq: { select: { createdAt: true, deadlineAt: true } } },
        },
        badges: true,
      },
    });
    if (!supplier) return;

    const alreadyHasBadge = supplier.badges.some((b) => b.badgeId === badge.id);
    if (alreadyHasBadge) return;

    if (supplier.quotations.length === 0) return;

    const responseTimes = supplier.quotations.map((q) => {
      const responseTime = q.submittedAt.getTime() - q.rfq.createdAt.getTime();
      return responseTime / (1000 * 60 * 60);
    });

    const avgResponseHours = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;

    if (avgResponseHours <= 24 && supplier.quotations.length >= 3) {
      await this.prisma.supplierBadge.create({
        data: { supplierId: supplier.id, badgeId: badge.id, awardedBy: 'SYSTEM' },
      });
      this.logger.log(`Responsive Supplier badge awarded to ${supplier.businessName}`);
    }
  }
}
