import { HttpException, HttpStatus } from '@nestjs/common';

export class AuthError extends HttpException {
  constructor(message: string, status: HttpStatus = HttpStatus.UNAUTHORIZED) {
    super(message, status);
  }
}

export class InvalidCredentialsError extends AuthError {
  constructor(message = 'Invalid credentials') {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}

export class TokenExpiredError extends AuthError {
  constructor(message = 'Token has expired') {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}

export class UnauthorizedError extends AuthError {
  constructor(message = 'Unauthorized access') {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}
