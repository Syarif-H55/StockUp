import { Controller, Get, Patch, Param, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('dashboard')
  async getDashboard() {
    return this.adminService.getDashboardStats();
  }

  @Get('suppliers')
  async getSuppliers(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.adminService.getSuppliers(page, limit);
  }

  @Get('suppliers/:id')
  async getSupplierDetail(@Param('id') id: string) {
    return this.adminService.getSupplierDetail(id);
  }

  @Patch('suppliers/:id/suspend')
  async suspendSupplier(@Param('id') id: string) {
    return this.adminService.suspendSupplier(id);
  }

  @Patch('suppliers/:id/reactivate')
  async reactivateSupplier(@Param('id') id: string) {
    return this.adminService.reactivateSupplier(id);
  }

  @Get('rfqs')
  async getRfqs(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.adminService.getRfqs(page, limit);
  }

  @Get('rfqs/:id')
  async getRfqDetail(@Param('id') id: string) {
    return this.adminService.getRfqDetail(id);
  }

  @Get('buyers')
  async getBuyers(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.adminService.getBuyers(page, limit);
  }

  @Get('activities')
  async getRecentActivities(@Query('limit') limit?: number) {
    return this.adminService.getRecentActivities(limit);
  }
}
