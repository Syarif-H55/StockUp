import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AuditLogService } from './audit-log.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('audit-logs')
export class AuditLogController {
  constructor(private readonly auditLogService: AuditLogService) {}

  @Get()
  async findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.auditLogService.findAll(page, limit);
  }

  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string, @Query('page') page?: number, @Query('limit') limit?: number) {
    return this.auditLogService.findByUser(userId, page, limit);
  }

  @Get('entity/:entityType/:entityId')
  async findByEntity(@Param('entityType') entityType: string, @Param('entityId') entityId: string, @Query('page') page?: number, @Query('limit') limit?: number) {
    return this.auditLogService.findByEntity(entityType, entityId, page, limit);
  }
}
