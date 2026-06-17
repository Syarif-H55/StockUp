import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import cookieParser from 'cookie-parser';

/**
 * Bootstrap aplikasi StockUp Backend.
 * Konfigurasi: CORS, validation pipe, global filters, interceptors.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Prefix global untuk semua API endpoint
  app.setGlobalPrefix('api');

  // CORS - mengizinkan akses dari frontend
  app.enableCors({
    origin: configService.get<string>('FRONTEND_URL', 'http://localhost:5173'),
    credentials: true, // Diperlukan untuk cookie refresh token
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Cookie parser untuk refresh token di HttpOnly cookie
  app.use(cookieParser());

  // Global validation pipe dengan class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip property yang tidak ada di DTO
      forbidNonWhitelisted: true, // Throw error untuk property yang tidak dikenal
      transform: true, // Otomatis transform payload ke DTO instance
      transformOptions: {
        enableImplicitConversion: true, // Konversi tipe otomatis (string -> number)
      },
    }),
  );

  // Global exception filter untuk format error response konsisten
  app.useGlobalFilters(new HttpExceptionFilter());

  // Global interceptor untuk format response konsisten
  app.useGlobalInterceptors(new TransformInterceptor());

  const port = configService.get<number>('PORT', 3001);
  await app.listen(port);

  console.log(`🚀 StockUp Backend berjalan di http://localhost:${port}`);
  console.log(`📚 API prefix: /api`);
  console.log(`🌍 Environment: ${configService.get<string>('NODE_ENV', 'development')}`);
}

bootstrap();
