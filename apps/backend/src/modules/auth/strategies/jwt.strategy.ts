import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

/**
 * Payload yang disimpan dalam JWT access token.
 */
export interface JwtPayload {
  sub: string; // user ID
  email: string;
  role: string;
}

/**
 * Passport strategy untuk validasi JWT access token.
 * Token diambil dari header Authorization: Bearer <token>.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_SECRET'),
    });
  }

  /**
   * Memvalidasi payload JWT dan meng-attach data user ke request.
   * Data yang dikembalikan di sini bisa diakses via @CurrentUser() decorator.
   */
  async validate(payload: JwtPayload) {
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
