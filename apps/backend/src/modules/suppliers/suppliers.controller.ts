import { Controller, Get, Patch, Post, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { UpdateSupplierProfileDto, AddSupplierCategoriesDto, SupplierDirectoryQueryDto } from './dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole } from '@prisma/client';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Public()
  @Get('directory')
  async getDirectory(@Query() query: SupplierDirectoryQueryDto) {
    return this.suppliersService.getDirectory(query);
  }

  @Public()
  @Get(':id')
  async getPublicProfile(@Param('id') id: string) {
    return this.suppliersService.getPublicProfile(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPPLIER)
  @Get('profile/me')
  async getMyProfile(@CurrentUser('id') userId: string) {
    return this.suppliersService.getProfile(userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPPLIER)
  @Get('dashboard')
  async getDashboard(@CurrentUser('id') userId: string) {
    return this.suppliersService.getDashboardStats(userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPPLIER)
  @Patch('profile')
  async updateProfile(@CurrentUser('id') userId: string, @Body() dto: UpdateSupplierProfileDto) {
    return this.suppliersService.updateProfile(userId, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPPLIER)
  @Post('categories')
  async addCategories(@CurrentUser('id') userId: string, @Body() dto: AddSupplierCategoriesDto) {
    return this.suppliersService.addCategories(userId, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPPLIER)
  @Delete('categories/:categoryId')
  async removeCategory(@CurrentUser('id') userId: string, @Param('categoryId') categoryId: string) {
    return this.suppliersService.removeCategory(userId, categoryId);
  }
}
