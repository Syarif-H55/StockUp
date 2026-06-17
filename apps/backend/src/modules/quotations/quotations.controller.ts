import { Controller, Get, Post, Param, Body, Query, UseGuards } from '@nestjs/common';
import { QuotationsService } from './quotations.service';
import { SubmitQuotationDto, QuotationQueryDto } from './dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole } from '@prisma/client';

@Controller('quotations')
export class QuotationsController {
  constructor(private readonly quotationsService: QuotationsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPPLIER)
  @Post('rfq/:rfqId')
  async submit(@CurrentUser('id') userId: string, @Param('rfqId') rfqId: string, @Body() dto: SubmitQuotationDto) {
    return this.quotationsService.submit(userId, rfqId, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPPLIER)
  @Get('my')
  async findBySupplier(@CurrentUser('id') userId: string, @Query() query: QuotationQueryDto) {
    return this.quotationsService.findBySupplier(userId, query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('rfq/:rfqId')
  async findByRfq(@Param('rfqId') rfqId: string) {
    return this.quotationsService.findByRfq(rfqId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('rfq/:rfqId/comparison')
  async getComparison(@Param('rfqId') rfqId: string) {
    return this.quotationsService.getComparison(rfqId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.BUYER)
  @Post('rfq/:rfqId/select/:quotationId')
  async selectSupplier(@CurrentUser('id') userId: string, @Param('rfqId') rfqId: string, @Param('quotationId') quotationId: string) {
    return this.quotationsService.selectSupplier(userId, rfqId, quotationId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.quotationsService.findById(id);
  }
}
