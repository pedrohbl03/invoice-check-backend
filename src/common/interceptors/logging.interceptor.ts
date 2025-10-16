import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const method = request.method;
    const url = request.url;
    const now = Date.now();
    const userId = request['userId'];

    this.logger.log(`${method} ${url} user: ${userId} - Starting request -> ${now}`);

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse<Response>();
        const delay = Date.now() - now;
        this.logger.log(`${method} ${url} ${response.statusCode} - Request finished -> ${delay}ms - user: ${userId}`);
      }),
      catchError((error) => {
        this.logger.error(`${method} ${url} ${error.status} - ${error.message}`);
        return throwError(() => error);
      }),
    );
  }
}
