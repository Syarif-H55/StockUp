import { Controller, Get, Post, Patch, Param, Body, Query, UseGuards } from '@nestjs/common';
import { RfqService } from './rfq.service';
import { CreateRfqDto, UpdateRfqDto, RfqQueryDto } from './dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole } from '@prisma/client';

@Controller('rfq')
export class RfqController {
  constructor(private readonly rfqService: RfqService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.BUYER)
  @Post()
  async create(@CurrentUser('id') userId: string, @Body() dto: CreateRfqDto) {
    return this.rfqService.create(userId, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.BUYER)
  @Get('my')
  async findByBuyer(@CurrentUser('id') userId: string, @Query() query: RfqQueryDto) {
    return this.rfqService.findByBuyer(userId, query);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPPLIER)
  @Get('available')
  async findForSupplier(@CurrentUser('id') userId: string, @Query() query: RfqQueryDto) {
    return this.rfqService.findForSupplier(userId, query);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('all')
  async findAll(@Query() query: RfqQueryDto) {
    return this.rfqService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.rfqService.findById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.BUYER)
  @Patch(':id')
  async update(@CurrentUser('id') userId: string, @Param('id') id: string, @Body() dto: UpdateRfqDto) {
    return this.rfqService.update(userId, id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.BUYER)
  @Patch(':id/close')
  async close(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.rfqService.close(userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/distribution')
  async getDistributionInfo(@Param('id') id: string) {
    return this.rfqService.getRfqDistributionInfo(id);
  }
}
