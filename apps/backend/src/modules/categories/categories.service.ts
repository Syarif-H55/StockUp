import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(includeInactive = false) {
    return this.prisma.category.findMany({
      where: includeInactive ? {} : { isActive: true },
      orderBy: { name: 'asc' },
    });
  }

  async findById(id: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundException('Kategori tidak ditemukan');
    }
    return category;
  }

  async create(dto: CreateCategoryDto) {
    const existingSlug = await this.prisma.category.findUnique({ where: { slug: dto.slug } });
    if (existingSlug) {
      throw new ConflictException('Slug kategori sudah digunakan');
    }
    const existingName = await this.prisma.category.findUnique({ where: { name: dto.name } });
    if (existingName) {
      throw new ConflictException('Nama kategori sudah digunakan');
    }
    return this.prisma.category.create({ data: dto });
  }

  async update(id: string, dto: UpdateCategoryDto) {
    await this.findById(id);

    if (dto.slug) {
      const existing = await this.prisma.category.findUnique({ where: { slug: dto.slug } });
      if (existing && existing.id !== id) {
        throw new ConflictException('Slug kategori sudah digunakan');
      }
    }
    if (dto.name) {
      const existing = await this.prisma.category.findUnique({ where: { name: dto.name } });
      if (existing && existing.id !== id) {
        throw new ConflictException('Nama kategori sudah digunakan');
      }
    }

    return this.prisma.category.update({ where: { id }, data: dto });
  }

  async deactivate(id: string) {
    await this.findById(id);
    return this.prisma.category.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async activate(id: string) {
    await this.findById(id);
    return this.prisma.category.update({
      where: { id },
      data: { isActive: true },
    });
  }
}
