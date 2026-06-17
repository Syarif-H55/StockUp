import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard untuk endpoint refresh token.
 * Menggunakan strategy 'jwt-refresh' yang terpisah dari 'jwt'.
 */
@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh') {}
