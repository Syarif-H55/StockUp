import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@prisma/client';

/**
 * Key metadata untuk roles.
 */
export const ROLES_KEY = 'roles';

/**
 * Decorator untuk menentukan role yang boleh mengakses endpoint.
 * Digunakan bersama RolesGuard.
 *
 * @example
 * @Roles(UserRole.ADMIN)
 * @Roles(UserRole.BUYER, UserRole.SUPPLIER)
 */
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
