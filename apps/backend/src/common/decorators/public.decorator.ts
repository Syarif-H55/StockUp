import { SetMetadata } from '@nestjs/common';

/**
 * Key metadata untuk public routes.
 */
export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Decorator untuk menandai endpoint sebagai public (tidak perlu autentikasi).
 * Digunakan bersama JwtAuthGuard yang di-set global.
 *
 * @example
 * @Public()
 * @Get('directory')
 * async getDirectory() { ... }
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
