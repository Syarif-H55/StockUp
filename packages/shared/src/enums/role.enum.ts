/**
 * Role pengguna dalam sistem StockUp.
 * Sistem menggunakan Single Role — satu akun hanya boleh memiliki satu role.
 */
export enum UserRole {
  BUYER = 'BUYER',
  SUPPLIER = 'SUPPLIER',
  ADMIN = 'ADMIN',
}
