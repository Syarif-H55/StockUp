/**
 * Konfigurasi aplikasi frontend StockUp.
 */
export const APP_CONFIG = {
  /** Nama aplikasi */
  APP_NAME: 'StockUp',

  /** Tagline */
  APP_TAGLINE: 'Smarter Sourcing Discovery Platform for Food Businesses & Beverage',

  /** API base URL (sudah di-handle oleh Vite proxy) */
  API_BASE_URL: '/api',

  /** Durasi polling notifikasi (30 detik) */
  NOTIFICATION_POLL_INTERVAL: 30 * 1000,

  /** Durasi toast notification (4 detik) */
  TOAST_DURATION: 4000,
} as const;
