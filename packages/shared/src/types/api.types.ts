/**
 * Interface standar untuk API response StockUp.
 * Semua response API mengikuti format ini untuk konsistensi.
 */
export interface IApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
  meta?: IApiMeta;
}

/**
 * Metadata untuk response yang memiliki pagination.
 */
export interface IApiMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

/**
 * Interface standar untuk pagination request.
 */
export interface IPaginationQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
