import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Decorator untuk mengambil data user saat ini dari request.
 * User di-set oleh JwtStrategy setelah validasi token.
 *
 * @example
 * // Mengambil seluruh data user
 * @CurrentUser() user: JwtPayload
 *
 * // Mengambil field tertentu
 * @CurrentUser('id') userId: string
 * @CurrentUser('role') role: UserRole
 */
export const CurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    // Jika data diberikan, kembalikan field spesifik
    if (data) {
      return user?.[data];
    }

    return user;
  },
);
