import { Controller, Get } from '@nestjs/common';
import { InvoiceService } from './application/services';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get()
  getHello(): string {
    return this.invoiceService.getHello();
  }
}
