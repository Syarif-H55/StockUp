/**
 * Tipe notifikasi dalam sistem StockUp.
 * Digunakan untuk in-app notification dan email notification.
 */
export enum NotificationType {
  /** RFQ baru yang sesuai dengan kategori supplier */
  RFQ_NEW = 'RFQ_NEW',

  /** Quotation baru diterima untuk RFQ buyer */
  QUOTATION_RECEIVED = 'QUOTATION_RECEIVED',

  /** Pengajuan verifikasi supplier disetujui */
  VERIFICATION_APPROVED = 'VERIFICATION_APPROVED',

  /** Pengajuan verifikasi supplier ditolak */
  VERIFICATION_REJECTED = 'VERIFICATION_REJECTED',

  /** Supplier dipilih oleh buyer untuk RFQ */
  SUPPLIER_SELECTED = 'SUPPLIER_SELECTED',

  /** RFQ ditutup (manual atau auto deadline) */
  RFQ_CLOSED = 'RFQ_CLOSED',

  /** Notifikasi sistem umum */
  SYSTEM = 'SYSTEM',
}
