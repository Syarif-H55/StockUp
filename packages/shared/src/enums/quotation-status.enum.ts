/**
 * Status quotation yang dikirim supplier.
 *
 * - SUBMITTED: Quotation sudah dikirim
 * - SELECTED: Quotation dipilih oleh buyer
 * - NOT_SELECTED: Quotation tidak dipilih (buyer memilih supplier lain)
 */
export enum QuotationStatus {
  SUBMITTED = 'SUBMITTED',
  SELECTED = 'SELECTED',
  NOT_SELECTED = 'NOT_SELECTED',
}
