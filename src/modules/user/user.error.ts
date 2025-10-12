import { HttpException, HttpStatus } from '@nestjs/common';

export class UserError extends HttpException {
  constructor(message: string, status: HttpStatus = HttpStatus.BAD_REQUEST) {
    super(message, status);
  }
}

export class UserNotFoundError extends UserError {
  constructor(message = 'User not found') {
    super(message, HttpStatus.NOT_FOUND);
  }
}

export class UserAlreadyExistsError extends UserError {
  constructor(message = 'User already exists') {
    super(message, HttpStatus.CONFLICT);
  }
}

export class UserValidationError extends UserError {
  constructor(message = 'User validation failed') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
