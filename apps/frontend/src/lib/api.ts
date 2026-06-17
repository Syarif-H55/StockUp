import axios from 'axios';

/**
 * Konfigurasi Axios instance untuk komunikasi dengan backend API.
 *
 * Fitur:
 * - Base URL mengarah ke /api (di-proxy oleh Vite ke backend saat development)
 * - Credentials: true untuk mengirim HttpOnly cookie (refresh token)
 * - Interceptor request: otomatis menambahkan access token dari localStorage
 * - Interceptor response: menangani 401 dan auto-refresh token
 */
const api = axios.create({
  baseURL: '/api',
  withCredentials: true, // Kirim cookie untuk refresh token
  headers: {
    'Content-Type': 'application/json',
  },
});

// Key untuk menyimpan access token di memory
let accessToken: string | null = null;

/**
 * Set access token. Disimpan di memory (bukan localStorage) untuk keamanan.
 */
export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

/**
 * Get access token dari memory.
 */
export const getAccessToken = () => accessToken;

/**
 * Request interceptor: menambahkan Authorization header jika token tersedia.
 */
api.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

/**
 * Response interceptor: menangani token expired (401).
 * Jika access token expired, coba refresh menggunakan refresh token dari cookie.
 * Jika refresh juga gagal, redirect ke halaman login.
 */
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Jika bukan 401 atau sudah pernah retry, langsung reject
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Jika sedang proses refresh, masukkan ke queue
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      // Coba refresh token
      const response = await axios.post('/api/auth/refresh', {}, {
        withCredentials: true,
      });

      const newAccessToken = response.data.data.accessToken;
      setAccessToken(newAccessToken);
      processQueue(null, newAccessToken);

      // Retry request yang gagal dengan token baru
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      setAccessToken(null);

      // Redirect ke login jika refresh gagal
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
