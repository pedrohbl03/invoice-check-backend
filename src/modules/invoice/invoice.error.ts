import { HttpException, HttpStatus } from '@nestjs/common';

export class InvoiceError extends HttpException {
  constructor(message: string, status: HttpStatus = HttpStatus.BAD_REQUEST) {
    super(message, status);
  }
}

export class InvoiceNotFoundError extends InvoiceError {
  constructor(message = 'Invoice not found') {
    super(message, HttpStatus.NOT_FOUND);
  }
}

export class InvoiceValidationError extends InvoiceError {
  constructor(message = 'Invoice validation failed') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export class InvoiceProcessingError extends InvoiceError {
  constructor(message = 'Invoice processing failed') {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
