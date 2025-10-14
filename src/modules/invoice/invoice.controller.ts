import {
  Controller,
  Delete,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { InvoiceService } from './application/services';
import { FileInterceptor } from '@nestjs/platform-express';
import { InvoiceEntity } from './domain/entities/invoice.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadInvoice(
    @UploadedFile() file: Express.Multer.File,
    @Req() request: Request,
  ): Promise<InvoiceEntity> {
    return this.invoiceService.createInvoice(file, request['userId']);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAllInvoices(): Promise<InvoiceEntity[]> {
    return this.invoiceService.findAllInvoices();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findInvoiceById(@Param('id') id: string): Promise<InvoiceEntity | null> {
    return this.invoiceService.findInvoiceById(id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteInvoice(@Param('id') id: string): Promise<void> {
    return this.invoiceService.deleteInvoice(id);
  }

  @UseGuards(AuthGuard)
  @Post(':id/chat')
  chat(@Param('id') id: string): Promise<void> {
    return this.invoiceService.chat(id);
  }
}
