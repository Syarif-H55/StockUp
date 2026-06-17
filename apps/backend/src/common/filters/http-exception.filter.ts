import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

/**
 * Global exception filter untuk format error response yang konsisten.
 * Semua error HTTP akan dikembalikan dalam format:
 * {
 *   success: false,
 *   message: "...",
 *   error: "...",
 *   statusCode: 400
 * }
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Terjadi kesalahan internal pada server.';
    let error = 'Internal Server Error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object') {
        const responseObj = exceptionResponse as Record<string, unknown>;
        message = (responseObj.message as string) || message;
        error = (responseObj.error as string) || error;

        // Handle array of validation messages dari class-validator
        if (Array.isArray(responseObj.message)) {
          message = (responseObj.message as string[]).join(', ');
        }
      }

      error = exception.name || error;
    }

    // Log error untuk debugging (development)
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      console.error('Unhandled Exception:', exception);
    }

    response.status(status).json({
      success: false,
      message,
      error,
      statusCode: status,
    });
  }
}
