import { QuotationStatus } from '../enums';

/**
 * Interface untuk data quotation.
 */
export interface IQuotation {
  id: string;
  rfqId: string;
  supplierId: string;
  priceOffer: number;
  minimumOrderQuantity: number | null;
  estimatedDeliveryTime: string | null;
  unit: string | null;
  notes: string | null;
  status: QuotationStatus;
  submittedAt: string;
}

/**
 * Quotation dengan informasi supplier (untuk buyer view).
 */
export interface IQuotationWithSupplier extends IQuotation {
  supplier: {
    id: string;
    businessName: string;
    logoUrl: string | null;
    verificationStatus: string;
    badges: { badgeName: string }[];
  };
}

/**
 * Data untuk mengirim quotation baru.
 */
export interface ISubmitQuotationRequest {
  rfqId: string;
  priceOffer: number;
  minimumOrderQuantity?: number;
  estimatedDeliveryTime?: string;
  unit?: string;
  notes?: string;
}

/**
 * Data untuk perbandingan quotation (buyer view).
 */
export interface IQuotationComparison {
  rfqTitle: string;
  rfqDescription: string;
  quotations: IQuotationWithSupplier[];
}
