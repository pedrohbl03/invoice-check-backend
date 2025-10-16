import { Module } from '@nestjs/common';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './application/services';
import { InvoiceRepository } from './infrastructure/repositories/invoice.repository';
import { OpenAIModule } from '../openai';
import { PdfService } from './application/services/pdf.service';
import { ChatRepository } from './infrastructure/repositories/chat.repository';

@Module({
  imports: [OpenAIModule],
  controllers: [InvoiceController],
  providers: [InvoiceService, InvoiceRepository, PdfService, ChatRepository],
  exports: [InvoiceService],
})
export class InvoiceModule {}
