/**
 * Status akun pengguna.
 *
 * - ACTIVE: Akun aktif dan dapat digunakan
 * - SUSPENDED: Akun dinonaktifkan oleh admin karena pelanggaran kebijakan
 */
export enum AccountStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
}
