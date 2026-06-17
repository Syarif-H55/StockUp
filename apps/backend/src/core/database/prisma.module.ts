import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * Module global untuk Prisma.
 * Ditandai @Global agar PrismaService tersedia di semua module
 * tanpa perlu import PrismaModule di setiap feature module.
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
