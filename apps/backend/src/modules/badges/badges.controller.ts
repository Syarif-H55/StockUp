import { Controller, Get, Post, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { BadgesService } from './badges.service';
import { AssignBadgeDto, CreateBadgeDto } from './dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { UserRole } from '@prisma/client';

@Controller('badges')
export class BadgesController {
  constructor(private readonly badgesService: BadgesService) {}

  @Public()
  @Get()
  async findAll(@Query('includeInactive') includeInactive?: string) {
    return this.badgesService.findAll(includeInactive === 'true');
  }

  @Public()
  @Get('supplier/:supplierId')
  async findBySupplier(@Param('supplierId') supplierId: string) {
    return this.badgesService.findBySupplier(supplierId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  async create(@Body() dto: CreateBadgeDto) {
    return this.badgesService.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('assign')
  async assign(@CurrentUser('id') adminId: string, @Body() dto: AssignBadgeDto) {
    return this.badgesService.assign(adminId, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':badgeId/supplier/:supplierId')
  async remove(@Param('supplierId') supplierId: string, @Param('badgeId') badgeId: string) {
    return this.badgesService.remove(supplierId, badgeId);
  }
}
