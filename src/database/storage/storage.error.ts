import { HttpException, HttpStatus } from '@nestjs/common';

export class StorageError extends HttpException {
  constructor(message: string, status: HttpStatus = HttpStatus.BAD_REQUEST) {
    super(message, status);
  }
}

export class StorageUploadError extends StorageError {
  constructor(message = 'File upload failed') {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class StorageFileNotFoundError extends StorageError {
  constructor(message = 'File not found') {
    super(message, HttpStatus.NOT_FOUND);
  }
}

export class StorageValidationError extends StorageError {
  constructor(message = 'Storage validation failed') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export class StorageConnectionError extends StorageError {
  constructor(message = 'Storage connection failed') {
    super(message, HttpStatus.SERVICE_UNAVAILABLE);
  }
}
