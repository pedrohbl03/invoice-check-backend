import { Injectable } from '@nestjs/common';
import { StorageService } from 'src/database/storage/storage.service';
import { InvoiceRepository } from '../../infrastructure/repositories/invoice.repository';
import { InvoiceEntity } from '../../domain';
import { envConfig } from 'src/config';
import { EnumInvoiceStatus } from 'generated/prisma';
import { formatCDNUrl } from '../../infrastructure/utils/formatCDNurl';
import { File } from 'buffer';
import { OpenAIService } from 'src/modules/openai';

@Injectable()
export class InvoiceService {
  constructor(
    private readonly invoiceRepository: InvoiceRepository,
    private readonly openaiService: OpenAIService,
    private readonly storageService: StorageService,
  ) { }

  async createInvoice(
    file: Express.Multer.File,
    userId: string
  ): Promise<InvoiceEntity> {
    const analyzedInvoice = await this.openaiService.analyzeInvoiceByBuffer(file);

    return new InvoiceEntity({
      ...analyzedInvoice,
      userId,
      invoiceUrl: 'https://example.com',
      invoiceStatus: EnumInvoiceStatus.ANALYZED,
    });
   
  }

  findAllInvoices(): Promise<InvoiceEntity[]> {
    return this.invoiceRepository.findAllInvoices();
  }

  findInvoiceById(id: string): Promise<InvoiceEntity | null> {
    return this.invoiceRepository.findInvoiceById(id);
  }

  deleteInvoice(id: string): Promise<void> {
    return this.invoiceRepository.deleteInvoice(id);
  }
}
