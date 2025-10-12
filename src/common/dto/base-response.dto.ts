export class BaseResponseDto<T = any> {
  success: boolean;
  data?: T;
  message?: string;

  constructor(success: boolean, data?: T, message?: string) {
    this.success = success;
    this.data = data;
    this.message = message;
  }

  static success<T>(data?: T, message?: string): BaseResponseDto<T> {
    return new BaseResponseDto(true, data, message);
  }

  static error(message: string): BaseResponseDto {
    return new BaseResponseDto(false, undefined, message);
  }
}

export class PaginatedResponseDto<T> extends BaseResponseDto<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };

  constructor(
    data: T[],
    page: number,
    limit: number,
    total: number,
    message?: string,
  ) {
    super(true, data, message);
    this.pagination = {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }
}
