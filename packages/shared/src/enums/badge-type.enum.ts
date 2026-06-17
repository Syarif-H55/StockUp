/**
 * Tipe badge supplier di StockUp.
 *
 * v1.0 (Manual — diberikan oleh admin/sistem):
 * - VERIFIED_SUPPLIER: Badge untuk supplier yang sudah terverifikasi
 * - VERIFIED_PRO: Badge untuk supplier dengan paket Pro (monetisasi)
 *
 * v1.5 (Otomatis — berbasis reputasi, belum diimplementasi):
 * - TRUSTED_SUPPLIER: Berdasarkan review dan rating
 * - RESPONSIVE_SUPPLIER: Berdasarkan kecepatan respon RFQ
 * - TOP_RATED_SUPPLIER: Berdasarkan rating tertinggi
 */
export enum BadgeType {
  // v1.0 - Manual badges
  VERIFIED_SUPPLIER = 'VERIFIED_SUPPLIER',
  VERIFIED_PRO = 'VERIFIED_PRO',

  // v1.5 - Automated badges (placeholder, belum digunakan di MVP)
  TRUSTED_SUPPLIER = 'TRUSTED_SUPPLIER',
  RESPONSIVE_SUPPLIER = 'RESPONSIVE_SUPPLIER',
  TOP_RATED_SUPPLIER = 'TOP_RATED_SUPPLIER',
}
