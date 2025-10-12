import { HttpException, HttpStatus } from '@nestjs/common';

export class InteractionError extends HttpException {
  constructor(message: string, status: HttpStatus = HttpStatus.BAD_REQUEST) {
    super(message, status);
  }
}

export class InteractionNotFoundError extends InteractionError {
  constructor(message = 'Interaction not found') {
    super(message, HttpStatus.NOT_FOUND);
  }
}

export class InteractionValidationError extends InteractionError {
  constructor(message = 'Interaction validation failed') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
