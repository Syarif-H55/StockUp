/**
 * Status verifikasi supplier.
 *
 * - PENDING: Pengajuan verifikasi sudah dikirim, menunggu review admin
 * - VERIFIED: Supplier sudah diverifikasi oleh admin
 * - REJECTED: Pengajuan verifikasi ditolak oleh admin
 */
export enum VerificationStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED',
}
