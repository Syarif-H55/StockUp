import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { UpdateBuyerProfileDto } from './dto';

@Injectable()
export class BuyersService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(userId: string) {
    const profile = await this.prisma.buyerProfile.findUnique({
      where: { userId },
    });
    if (!profile) {
      throw new NotFoundException('Profil buyer tidak ditemukan');
    }
    return profile;
  }

  async updateProfile(userId: string, dto: UpdateBuyerProfileDto) {
    const profile = await this.prisma.buyerProfile.findUnique({
      where: { userId },
    });
    if (!profile) {
      throw new NotFoundException('Profil buyer tidak ditemukan');
    }
    return this.prisma.buyerProfile.update({
      where: { userId },
      data: dto,
    });
  }
}
