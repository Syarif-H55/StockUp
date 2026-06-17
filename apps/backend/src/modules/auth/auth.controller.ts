import { Controller, Post, Get, Body, UseGuards, Res, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterBuyerDto, RegisterSupplierDto, LoginDto, VerifyEmailDto } from './dto';
import { Public } from '../../common/decorators/public.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { JwtRefreshGuard } from '../../common/guards/jwt-refresh.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Public()
  @Post('register/buyer')
  async registerBuyer(@Body() dto: RegisterBuyerDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.registerBuyer(dto);
    this.setRefreshTokenCookie(res, result.refreshToken);
    return { ...result, refreshToken: undefined };
  }

  @Public()
  @Post('register/supplier')
  async registerSupplier(@Body() dto: RegisterSupplierDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.registerSupplier(dto);
    this.setRefreshTokenCookie(res, result.refreshToken);
    return { ...result, refreshToken: undefined };
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.login(dto);
    this.setRefreshTokenCookie(res, result.refreshToken);
    return { ...result, refreshToken: undefined };
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@CurrentUser() user: { id: string; refreshToken: string }, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.authService.refreshToken(user.id, user.refreshToken);
    this.setRefreshTokenCookie(res, tokens.refreshToken);
    return { accessToken: tokens.accessToken, refreshToken: undefined };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@CurrentUser('id') userId: string, @Res({ passthrough: true }) res: Response) {
    await this.authService.logout(userId);
    res.clearCookie('refresh_token');
    return { message: 'Logout berhasil' };
  }

  @Public()
  @Post('verify-email')
  @HttpCode(HttpStatus.OK)
  async verifyEmail(@Body() dto: VerifyEmailDto) {
    return this.authService.verifyEmail(dto.token);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@CurrentUser('id') userId: string) {
    return this.authService.getMe(userId);
  }

  private setRefreshTokenCookie(res: Response, refreshToken: string) {
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/api/auth/refresh',
    });
  }
}
