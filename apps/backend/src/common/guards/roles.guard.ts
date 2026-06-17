import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';
import { ROLES_KEY } from '../decorators';

/**
 * Guard untuk mengecek role pengguna berdasarkan @Roles() decorator.
 * PENTING: Guard ini harus digunakan SETELAH JwtAuthGuard agar
 * request.user sudah tersedia.
 *
 * Jika endpoint tidak memiliki @Roles(), maka semua authenticated user diperbolehkan.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Ambil roles yang diperlukan dari decorator
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Jika tidak ada @Roles() decorator, izinkan akses
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      throw new ForbiddenException('Akses ditolak. Silakan login terlebih dahulu.');
    }

    // Cek apakah user memiliki salah satu role yang diperlukan
    const hasRole = requiredRoles.includes(user.role);

    if (!hasRole) {
      throw new ForbiddenException(
        'Akses ditolak. Anda tidak memiliki izin untuk mengakses resource ini.',
      );
    }

    return true;
  }
}
