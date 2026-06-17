import { Injectable, NotFoundException, ForbiddenException, BadRequestException, ConflictException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaService } from '../../core/database/prisma.service';
import { SubmitQuotationDto, QuotationQueryDto } from './dto';

@Injectable()
export class QuotationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async submit(userId: string, rfqId: string, dto: SubmitQuotationDto) {
    const supplier = await this.prisma.supplierProfile.findUnique({ where: { userId } });
    if (!supplier) {
      throw new NotFoundException('Profil supplier tidak ditemukan');
    }
    if (supplier.verificationStatus !== 'VERIFIED') {
      throw new ForbiddenException('Supplier harus terverifikasi untuk mengirim quotation');
    }

    const rfq = await this.prisma.rfq.findUnique({ where: { id: rfqId } });
    if (!rfq) {
      throw new NotFoundException('RFQ tidak ditemukan');
    }
    if (rfq.status !== 'OPEN') {
      throw new BadRequestException('RFQ sudah tidak menerima quotation');
    }

    if (new Date(rfq.deadlineAt) < new Date()) {
      throw new BadRequestException('Batas waktu RFQ sudah lewat');
    }

    const supplierCategoryIds = await this.prisma.supplierCategory.findMany({
      where: { supplierId: supplier.id },
      select: { categoryId: true },
    });
    if (!supplierCategoryIds.some((sc) => sc.categoryId === rfq.categoryId)) {
      throw new ForbiddenException('RFQ tidak sesuai dengan kategori usaha Anda');
    }

    const existingQuotation = await this.prisma.quotation.findUnique({
      where: { rfqId_supplierId: { rfqId, supplierId: supplier.id } },
    });
    if (existingQuotation) {
      throw new ConflictException('Anda sudah mengirim quotation untuk RFQ ini');
    }

    const quotation = await this.prisma.quotation.create({
      data: {
        rfqId,
        supplierId: supplier.id,
        priceOffer: dto.priceOffer,
        unit: dto.unit,
        minimumOrderQuantity: dto.minimumOrderQuantity,
        estimatedDeliveryTime: dto.estimatedDeliveryTime,
        notes: dto.notes,
      },
      include: {
        rfq: {
          include: {
            category: true,
            buyer: { include: { user: { select: { id: true, email: true } } } },
          },
        },
      },
    });

    this.eventEmitter.emit('quotation.submitted', {
      buyerUserId: quotation.rfq.buyer.user.id,
      buyerEmail: quotation.rfq.buyer.user.email,
      buyerBusinessName: quotation.rfq.buyer.businessName,
      rfqId: quotation.rfqId,
      rfqTitle: quotation.rfq.title,
      supplierBusinessName: supplier.businessName,
    });

    return quotation;
  }

  async findBySupplier(userId: string, query: QuotationQueryDto) {
    const supplier = await this.prisma.supplierProfile.findUnique({ where: { userId } });
    if (!supplier) {
      throw new NotFoundException('Profil supplier tidak ditemukan');
    }

    const { page = 1, limit = 10, status } = query;
    const where: any = { supplierId: supplier.id };
    if (status) where.status = status;

    const [data, total] = await Promise.all([
      this.prisma.quotation.findMany({
        where,
        include: {
          rfq: {
            include: {
              category: true,
              buyer: { select: { businessName: true } },
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { submittedAt: 'desc' },
      }),
      this.prisma.quotation.count({ where }),
    ]);

    return {
      data,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async findByRfq(rfqId: string) {
    const rfq = await this.prisma.rfq.findUnique({ where: { id: rfqId } });
    if (!rfq) {
      throw new NotFoundException('RFQ tidak ditemukan');
    }

    return this.prisma.quotation.findMany({
      where: { rfqId },
      include: {
        supplier: {
          include: {
            user: { select: { fullName: true } },
            badges: { include: { badge: true } },
          },
        },
      },
      orderBy: { submittedAt: 'asc' },
    });
  }

  async selectSupplier(userId: string, rfqId: string, quotationId: string) {
    const buyer = await this.prisma.buyerProfile.findUnique({ where: { userId } });
    if (!buyer) {
      throw new NotFoundException('Profil buyer tidak ditemukan');
    }

    const rfq = await this.prisma.rfq.findUnique({ where: { id: rfqId } });
    if (!rfq) {
      throw new NotFoundException('RFQ tidak ditemukan');
    }
    if (rfq.buyerId !== buyer.id) {
      throw new ForbiddenException('Anda tidak memiliki akses ke RFQ ini');
    }
    if (rfq.status !== 'OPEN') {
      throw new BadRequestException('RFQ sudah tidak dapat dipilih');
    }

    const quotation = await this.prisma.quotation.findUnique({
      where: { id: quotationId },
    });
    if (!quotation || quotation.rfqId !== rfqId) {
      throw new NotFoundException('Quotation tidak ditemukan');
    }

    const [updatedRfq] = await this.prisma.$transaction([
      this.prisma.rfq.update({
        where: { id: rfqId },
        data: {
          status: 'COMPLETED',
          selectedSupplierId: quotation.supplierId,
          closedAt: new Date(),
        },
      }),
      this.prisma.quotation.update({
        where: { id: quotationId },
        data: { status: 'SELECTED' },
      }),
      this.prisma.quotation.updateMany({
        where: { rfqId, id: { not: quotationId } },
        data: { status: 'NOT_SELECTED' },
      }),
    ]);

    return this.prisma.rfq.findUnique({
      where: { id: rfqId },
      include: {
        category: true,
        quotations: {
          include: {
            supplier: { select: { id: true, businessName: true } },
          },
        },
      },
    });
  }

  async getComparison(rfqId: string) {
    const rfq = await this.prisma.rfq.findUnique({ where: { id: rfqId } });
    if (!rfq) {
      throw new NotFoundException('RFQ tidak ditemukan');
    }

    const quotations = await this.prisma.quotation.findMany({
      where: { rfqId },
      include: {
        supplier: {
          include: {
            badges: { include: { badge: true } },
          },
        },
      },
      orderBy: { priceOffer: 'asc' },
    });

    return {
      rfq,
      quotations,
      totalQuotations: quotations.length,
      lowestPrice: quotations.length > 0 ? quotations[0].priceOffer : null,
      highestPrice: quotations.length > 0 ? quotations[quotations.length - 1].priceOffer : null,
    };
  }

  async findById(id: string) {
    const quotation = await this.prisma.quotation.findUnique({
      where: { id },
      include: {
        rfq: { include: { category: true, buyer: { select: { businessName: true } } } },
        supplier: {
          include: {
            badges: { include: { badge: true } },
          },
        },
      },
    });
    if (!quotation) {
      throw new NotFoundException('Quotation tidak ditemukan');
    }
    return quotation;
  }
}
