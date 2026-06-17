/**
 * Status RFQ (Request for Quotation).
 *
 * - OPEN: RFQ aktif dan menerima quotation dari supplier
 * - CLOSED: RFQ ditutup (manual oleh buyer atau auto oleh cron job saat deadline terlewati)
 * - COMPLETED: Buyer sudah memilih supplier untuk RFQ ini
 */
export enum RfqStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  COMPLETED = 'COMPLETED',
}
