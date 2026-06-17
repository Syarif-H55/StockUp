import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

/**
 * Passport strategy untuk validasi JWT refresh token.
 * Token diambil dari HttpOnly cookie 'refresh_token'.
 */
@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // Ambil refresh token dari cookie
        (request: Request) => {
          return request?.cookies?.refresh_token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }

  /**
   * Memvalidasi refresh token.
   * Di Phase 2, akan ditambahkan pengecekan refresh token
   * terhadap hash yang tersimpan di database.
   */
  async validate(request: Request, payload: { sub: string; email: string }) {
    const refreshToken = request?.cookies?.refresh_token;
    return {
      id: payload.sub,
      email: payload.email,
      refreshToken,
    };
  }
}
