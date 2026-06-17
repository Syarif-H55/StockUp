import { Injectable, UnauthorizedException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { UserRole } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../../core/database/prisma.service';
import { RegisterBuyerDto, RegisterSupplierDto, LoginDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async registerBuyer(dto: RegisterBuyerDto) {
    const emailVerifyToken = crypto.randomBytes(32).toString('hex');
    const user = await this.usersService.create({
      email: dto.email,
      password: dto.password,
      fullName: dto.fullName,
      role: UserRole.BUYER,
      emailVerifyToken,
    });

    await this.prisma.buyerProfile.create({
      data: {
        userId: user.id,
        businessName: dto.businessName,
        phoneNumber: dto.phoneNumber,
        address: dto.address,
      },
    });

    this.eventEmitter.emit('user.registered', {
      userId: user.id,
      email: user.email,
      fullName: user.fullName,
      emailVerifyToken,
    });

    return this.generateAuthResponse(user);
  }

  async registerSupplier(dto: RegisterSupplierDto) {
    const emailVerifyToken = crypto.randomBytes(32).toString('hex');
    const user = await this.usersService.create({
      email: dto.email,
      password: dto.password,
      fullName: dto.fullName,
      role: UserRole.SUPPLIER,
      emailVerifyToken,
    });

    await this.prisma.supplierProfile.create({
      data: {
        userId: user.id,
        businessName: dto.businessName,
        businessAddress: dto.businessAddress,
        phoneNumber: dto.phoneNumber,
        description: dto.description,
      },
    });

    this.eventEmitter.emit('user.registered', {
      userId: user.id,
      email: user.email,
      fullName: user.fullName,
      emailVerifyToken,
    });

    return this.generateAuthResponse(user);
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Email atau password salah');
    }

    if (user.accountStatus === 'SUSPENDED') {
      throw new ForbiddenException('Akun Anda telah dinonaktifkan');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email atau password salah');
    }

    return this.generateAuthResponse(user);
  }

  async refreshToken(userId: string, refreshToken: string) {
    const user = await this.usersService.findById(userId);
    if (!user.refreshToken) {
      throw new UnauthorizedException('Refresh token tidak valid');
    }

    const isTokenValid = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isTokenValid) {
      throw new UnauthorizedException('Refresh token tidak valid');
    }

    return this.generateTokens(user);
  }

  async logout(userId: string) {
    await this.usersService.updateRefreshToken(userId, null);
  }

  async verifyEmail(token: string) {
    const user = await this.prisma.user.findFirst({
      where: { emailVerifyToken: token },
    });
    if (!user) {
      throw new BadRequestException('Token verifikasi tidak valid atau sudah kedaluwarsa');
    }

    await this.usersService.verifyEmail(user.id);
    return { message: 'Email berhasil diverifikasi' };
  }

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        buyerProfile: true,
        supplierProfile: {
          include: {
            categories: { include: { category: true } },
            badges: { include: { badge: true } },
          },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException('User tidak ditemukan');
    }

    const { password, refreshToken, emailVerifyToken, ...safeUser } = user;
    return safeUser;
  }

  private async generateAuthResponse(user: { id: string; email: string; role: string; fullName: string }) {
    const tokens = await this.generateTokens(user);
    return { user: { id: user.id, email: user.email, role: user.role, fullName: user.fullName }, ...tokens };
  }

  private async generateTokens(user: { id: string; email: string; role: string }) {
    const payload = { sub: user.id, email: user.email, role: user.role };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRATION', '15m'),
    });

    const refreshToken = this.jwtService.sign(
      { sub: user.id, email: user.email },
      {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION', '7d'),
      },
    );

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);
    await this.usersService.updateRefreshToken(user.id, hashedRefreshToken);

    return { accessToken, refreshToken };
  }
}
