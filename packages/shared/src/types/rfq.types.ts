import { RfqStatus } from '../enums';

/**
 * Interface untuk data RFQ.
 */
export interface IRfq {
  id: string;
  buyerId: string;
  categoryId: string;
  title: string;
  description: string;
  quantity: number | null;
  unit: string | null;
  budget: number | null;
  deadlineAt: string;
  status: RfqStatus;
  selectedSupplierId: string | null;
  quotationCount: number;
  closedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Preset deadline yang tersedia saat membuat RFQ.
 */
export type RfqDeadlinePreset = 3 | 7 | 14 | 'custom';

/**
 * Data untuk membuat RFQ baru.
 */
export interface ICreateRfqRequest {
  categoryId: string;
  title: string;
  description: string;
  quantity?: number;
  unit?: string;
  budget?: number;
  /** Preset dalam hari (3, 7, 14) atau tanggal custom (ISO string) */
  deadlinePreset?: RfqDeadlinePreset;
  /** Digunakan ketika deadlinePreset = 'custom' */
  customDeadline?: string;
}

/**
 * Data untuk update RFQ (hanya saat status Open).
 */
export interface IUpdateRfqRequest {
  title?: string;
  description?: string;
  quantity?: number;
  unit?: string;
  budget?: number;
}

/**
 * RFQ yang tersedia untuk supplier (view supplier).
 * Tidak menampilkan identitas supplier lain yang menerima RFQ sama (FR-040).
 */
export interface IRfqForSupplier {
  id: string;
  categoryId: string;
  categoryName: string;
  title: string;
  description: string;
  quantity: number | null;
  unit: string | null;
  budget: number | null;
  deadlineAt: string;
  status: RfqStatus;
  /** Jumlah supplier yang menerima RFQ ini (FR-039) */
  supplierCount: number;
  /** Apakah supplier saat ini sudah mengirim quotation */
  hasSubmittedQuotation: boolean;
  createdAt: string;
}
