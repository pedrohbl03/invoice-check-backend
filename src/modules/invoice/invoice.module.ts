import { Module } from '@nestjs/common';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './application/services';
import { InvoiceRepository } from './infrastructure/repositories/invoice.repository';
import { OpenAIModule } from '../openai';

@Module({
  imports: [OpenAIModule],
  controllers: [InvoiceController],
  providers: [InvoiceService, InvoiceRepository],
  exports: [InvoiceService],
})
export class InvoiceModule {}
