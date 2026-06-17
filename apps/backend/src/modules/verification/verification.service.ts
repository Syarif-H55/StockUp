import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaService } from '../../core/database/prisma.service';
import { SubmitVerificationDto, ReviewVerificationDto } from './dto';

@Injectable()
export class VerificationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async submitVerification(userId: string, dto: SubmitVerificationDto) {
    const profile = await this.prisma.supplierProfile.findUnique({
      where: { userId },
    });
    if (!profile) {
      throw new NotFoundException('Profil supplier tidak ditemukan');
    }

    if (profile.verificationStatus !== 'PENDING') {
      const existing = await this.prisma.supplierVerification.findFirst({
        where: { supplierId: profile.id, status: 'PENDING' },
      });
      if (existing) {
        throw new BadRequestException('Anda sudah memiliki pengajuan verifikasi yang sedang diproses');
      }
    }

    const verification = await this.prisma.supplierVerification.create({
      data: {
        supplierId: profile.id,
        documentUrl: dto.documentUrl,
      },
    });

    await this.prisma.supplierProfile.update({
      where: { userId },
      data: { verificationStatus: 'PENDING' },
    });

    return verification;
  }

  async getMyVerificationStatus(userId: string) {
    const profile = await this.prisma.supplierProfile.findUnique({
      where: { userId },
    });
    if (!profile) {
      throw new NotFoundException('Profil supplier tidak ditemukan');
    }

    const verifications = await this.prisma.supplierVerification.findMany({
      where: { supplierId: profile.id },
      orderBy: { createdAt: 'desc' },
    });

    return {
      verificationStatus: profile.verificationStatus,
      verifications,
    };
  }

  async getPendingVerifications() {
    return this.prisma.supplierVerification.findMany({
      where: { status: 'PENDING' },
      include: {
        supplier: {
          include: {
            user: { select: { fullName: true, email: true } },
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async getVerificationDetail(id: string) {
    const verification = await this.prisma.supplierVerification.findUnique({
      where: { id },
      include: {
        supplier: {
          include: {
            user: { select: { fullName: true, email: true } },
            categories: { include: { category: true } },
          },
        },
      },
    });
    if (!verification) {
      throw new NotFoundException('Pengajuan verifikasi tidak ditemukan');
    }
    return verification;
  }

  async reviewVerification(adminId: string, id: string, dto: ReviewVerificationDto) {
    const verification = await this.prisma.supplierVerification.findUnique({
      where: { id },
    });
    if (!verification) {
      throw new NotFoundException('Pengajuan verifikasi tidak ditemukan');
    }

    if (verification.status !== 'PENDING') {
      throw new BadRequestException('Pengajuan verifikasi sudah diproses');
    }

    const updatedVerification = await this.prisma.supplierVerification.update({
      where: { id },
      data: {
        status: dto.status,
        reviewedBy: adminId,
        reviewedAt: new Date(),
        rejectionReason: dto.rejectionReason,
      },
    });

    const newStatus = dto.status === 'APPROVED' ? 'VERIFIED' : 'REJECTED';
    await this.prisma.supplierProfile.update({
      where: { id: verification.supplierId },
      data: { verificationStatus: newStatus },
    });

    const supplier = await this.prisma.supplierProfile.findUnique({
      where: { id: verification.supplierId },
      include: { user: { select: { id: true, email: true } } },
    });

    if (supplier) {
      if (dto.status === 'APPROVED') {
        this.eventEmitter.emit('verification.approved', {
          supplierUserId: supplier.user.id,
          email: supplier.user.email,
          businessName: supplier.businessName,
        });
      } else {
        this.eventEmitter.emit('verification.rejected', {
          supplierUserId: supplier.user.id,
          email: supplier.user.email,
          businessName: supplier.businessName,
          reason: dto.rejectionReason,
        });
      }
    }

    return updatedVerification;
  }
}
