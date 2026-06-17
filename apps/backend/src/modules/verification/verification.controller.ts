import { Controller, Get, Post, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { SubmitVerificationDto, ReviewVerificationDto } from './dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole } from '@prisma/client';

@Controller('verification')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPPLIER)
  @Post()
  async submitVerification(@CurrentUser('id') userId: string, @Body() dto: SubmitVerificationDto) {
    return this.verificationService.submitVerification(userId, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPPLIER)
  @Get('my-status')
  async getMyStatus(@CurrentUser('id') userId: string) {
    return this.verificationService.getMyVerificationStatus(userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('pending')
  async getPendingVerifications() {
    return this.verificationService.getPendingVerifications();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get(':id')
  async getVerificationDetail(@Param('id') id: string) {
    return this.verificationService.getVerificationDetail(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id/review')
  async reviewVerification(@CurrentUser('id') adminId: string, @Param('id') id: string, @Body() dto: ReviewVerificationDto) {
    return this.verificationService.reviewVerification(adminId, id, dto);
  }
}
