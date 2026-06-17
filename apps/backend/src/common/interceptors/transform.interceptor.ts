import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Interface standar API response StockUp.
 */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: Record<string, unknown>;
}

/**
 * Global interceptor untuk membungkus semua response dalam format standar.
 * Response dari controller akan otomatis dibungkus menjadi:
 * {
 *   success: true,
 *   message: "Success",
 *   data: { ... }
 * }
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        // Jika data sudah dalam format ApiResponse, kembalikan langsung
        if (data && typeof data === 'object' && 'success' in data && 'message' in data) {
          return data;
        }

        return {
          success: true,
          message: 'Success',
          data,
        };
      }),
    );
  }
}
