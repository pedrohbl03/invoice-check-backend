import { Injectable } from '@nestjs/common';
import { StorageService } from 'src/database/storage/storage.service';
import { InvoiceRepository } from '../../infrastructure/repositories/invoice.repository';
import { InvoiceEntity } from '../../domain';
import { envConfig } from 'src/config';
import { EnumInvoiceStatus } from 'generated/prisma';
import { formatCDNUrl, generateInvoiceKey } from '../../infrastructure/utils/formatCDNurl';
import { OpenAIService } from 'src/modules/openai';
import { InvoiceNotFoundError, InvoiceValidationError } from '../../invoice.error';

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

    if (!analyzedInvoice) {
      throw new Error('Failed to analyze invoice');
    }

    const invoice = await this.invoiceRepository.createInvoice({
      ...analyzedInvoice,
      userId,
      invoiceStatus: EnumInvoiceStatus.ANALYZED,
    });

    const invoiceKey = generateInvoiceKey(userId, invoice.id, file.mimetype.split('/')[1]);

    await this.storageService.uploadFile(envConfig().r2.bucketName, invoiceKey, file)
      .catch(async (error) => {
        await this.invoiceRepository.deleteInvoice(invoice.id);
        throw new Error('Failed to upload invoice');
      });

    invoice.invoiceUrl = formatCDNUrl(invoiceKey);

    const updatedInvoice = await this.invoiceRepository.updateInvoice(invoice.id, invoice);

    if (!updatedInvoice) {
      throw new Error('Failed to update invoice');
    }

    return new InvoiceEntity(updatedInvoice);
  }

  async findAllInvoices(): Promise<InvoiceEntity[]> {
    return await this.invoiceRepository.findAllInvoices();
  }

  async findInvoiceById(id: string): Promise<InvoiceEntity | null> {
    return await this.invoiceRepository.findInvoiceById(id);
  }

  async deleteInvoice(id: string): Promise<void> {
    await this.invoiceRepository.deleteInvoice(id);
  }

  async chat(id: string): Promise<void> {
    const invoice = await this.invoiceRepository.findInvoiceById(id);

    if (!invoice) {
      throw new InvoiceNotFoundError();
    }


   /*  const history = await this.invoiceRepository.findHistoryByInvoiceId(id);

    if (!history) {
      throw new InvoiceNotFoundError();
    }
 */
    throw new Error('Chat with invoice not implemented');
  }
}
