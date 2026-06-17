/**
 * Konstanta yang digunakan di seluruh platform StockUp.
 */

/** Batas maksimal ukuran file upload (dalam bytes) */
export const MAX_FILE_SIZE_DOCUMENT = 5 * 1024 * 1024; // 5MB
export const MAX_FILE_SIZE_IMAGE = 2 * 1024 * 1024; // 2MB

/** Tipe file yang diperbolehkan */
export const ALLOWED_DOCUMENT_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

/** Preset deadline RFQ (dalam hari) */
export const RFQ_DEADLINE_PRESETS = [3, 7, 14] as const;

/** Panjang minimum dan maksimum field */
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 128,
  BUSINESS_NAME_MIN_LENGTH: 2,
  BUSINESS_NAME_MAX_LENGTH: 200,
  RFQ_TITLE_MIN_LENGTH: 5,
  RFQ_TITLE_MAX_LENGTH: 200,
  RFQ_DESCRIPTION_MIN_LENGTH: 20,
  RFQ_DESCRIPTION_MAX_LENGTH: 5000,
  PHONE_MIN_LENGTH: 10,
  PHONE_MAX_LENGTH: 15,
  NOTES_MAX_LENGTH: 2000,
} as const;

/** Konfigurasi pagination default */
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

/** Konfigurasi JWT expiration */
export const JWT_CONFIG = {
  ACCESS_TOKEN_EXPIRY: '15m',
  REFRESH_TOKEN_EXPIRY: '7d',
} as const;
