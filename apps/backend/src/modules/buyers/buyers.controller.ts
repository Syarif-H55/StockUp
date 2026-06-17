import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { BuyersService } from './buyers.service';
import { UpdateBuyerProfileDto } from './dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole } from '@prisma/client';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.BUYER)
@Controller('buyers')
export class BuyersController {
  constructor(private readonly buyersService: BuyersService) {}

  @Get('profile')
  async getProfile(@CurrentUser('id') userId: string) {
    return this.buyersService.getProfile(userId);
  }

  @Patch('profile')
  async updateProfile(@CurrentUser('id') userId: string, @Body() dto: UpdateBuyerProfileDto) {
    return this.buyersService.updateProfile(userId, dto);
  }
}
