/**
 * Pagination DTO
 * Note: Install class-validator and class-transformer for enhanced validation
 * npm install class-validator class-transformer
 */
export class PaginationDto {
  page?: number = 1;
  limit?: number = 10;
}

export class PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;

  constructor(page: number, limit: number, total: number) {
    this.page = page;
    this.limit = limit;
    this.total = total;
    this.totalPages = Math.ceil(total / limit);
  }
}
