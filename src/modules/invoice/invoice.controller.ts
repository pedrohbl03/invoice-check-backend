import {
  Controller,
  Delete,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
  UseGuards,
} from '@nestjs/common';
import { InvoiceService } from './application/services';
import { FileInterceptor } from '@nestjs/platform-express';
import { InvoiceEntity } from './domain/entities/invoice.entity';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  //@UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  uploadInvoice(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<InvoiceEntity> {
    const user = {
      id: '123',
    }; // TODO: remove this to get the user from the auth guard
    return this.invoiceService.createInvoice(file, user.id);
  }

  @Get()
  findAllInvoices(): Promise<InvoiceEntity[]> {
    return this.invoiceService.findAllInvoices();
  }

  @Get(':id')
  findInvoiceById(@Param('id') id: string): Promise<InvoiceEntity | null> {
    return this.invoiceService.findInvoiceById(id);
  }

  @Delete(':id')
  deleteInvoice(@Param('id') id: string): Promise<void> {
    return this.invoiceService.deleteInvoice(id);
  }
}
