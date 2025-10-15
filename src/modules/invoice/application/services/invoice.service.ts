import { Injectable } from '@nestjs/common';
import { StorageService } from 'src/database/storage/storage.service';
import { InvoiceRepository } from '../../infrastructure/repositories/invoice.repository';
import { InvoiceEntity } from '../../domain';
import { envConfig } from 'src/config';
import { EnumInvoiceStatus } from 'generated/prisma';
import {
  formatCDNUrl,
  generateInvoiceKey,
} from '../../infrastructure/utils/formatCDNurl';
import { InteractionNotFoundError, OpenAIService } from 'src/modules/openai';
import {
  InvoiceNotFoundError,
  InvoiceProcessingError,
  InvoiceValidationError,
} from '../../invoice.error';
import { StorageUploadError } from 'src/database/storage/storage.error';
import { ChatEntity } from '../../domain/entities/invoice-chat.entity';

@Injectable()
export class InvoiceService {
  constructor(
    private readonly invoiceRepository: InvoiceRepository,
    private readonly openaiService: OpenAIService,
    private readonly storageService: StorageService,
  ) {}

  async createInvoice(
    file: Express.Multer.File,
    userId: string,
  ): Promise<InvoiceEntity> {
    const invoice = await this.invoiceRepository.createInvoice(
      new InvoiceEntity({
        userId,
        invoiceStatus: EnumInvoiceStatus.PENDING,
        fileOriginalName: file.originalname,
      }),
    );

    const invoiceKey = generateInvoiceKey(
      userId,
      invoice.id,
      file.mimetype.split('/')[1],
    );

    await this.storageService
      .uploadFile(envConfig().r2.bucketName, invoiceKey, file)
      .catch(async (error) => {
        await this.invoiceRepository.deleteInvoice(invoice.id);
        console.error(invoice.id, error);
        throw new StorageUploadError();
      });

    const invoiceUpdated = await this.invoiceRepository.updateInvoice(
      invoice.id,
      new InvoiceEntity({
        invoiceUrl: formatCDNUrl(invoiceKey),
      }),
    );

    this.processInvoiceAsync(invoice, file).catch(async (error) => {
      await this.invoiceRepository.updateInvoice(
        invoice.id,
        new InvoiceEntity({
          invoiceStatus: EnumInvoiceStatus.ERROR,
        }),
      );
      console.error(invoice.id, error);
      throw new InvoiceProcessingError();
    });

    return new InvoiceEntity(invoiceUpdated);
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

  async getChatHistoryByInvoiceId(id: string): Promise<ChatEntity | null> {
    const invoice = await this.invoiceRepository.findInvoiceById(id);

    if (!invoice) {
      throw new InvoiceNotFoundError();
    }

    const chatHistory =
      await this.invoiceRepository.getChatHistoryByInvoiceId(id);

    if (!chatHistory) {
      throw new InteractionNotFoundError();
    }

    return chatHistory;
  }

  async postChatMessage(id: string, message: string): Promise<any> {
    const invoice = await this.invoiceRepository.findInvoiceById(id);

    if (!invoice) {
      throw new InvoiceNotFoundError();
    }

    if (invoice.invoiceStatus !== EnumInvoiceStatus.ANALYZED) {
      throw new InvoiceValidationError(
        'Invoice must be analyzed before chatting',
      );
    }

    let history = await this.invoiceRepository.getChatHistoryByInvoiceId(id);

    if (!history) {
      history = await this.invoiceRepository.createChatHistory(id);
    }

    await this.invoiceRepository.createChatInteraction(
      history.id,
      'USER',
      message,
    );

    const response = await this.openaiService.sendMessage(
      invoice,
      history,
      message,
    );

    await this.invoiceRepository.createChatInteraction(
      history.id,
      'ASSISTANT',
      response,
    );

    return response;
  }

  private async processInvoiceAsync(
    invoice: InvoiceEntity,
    file: Express.Multer.File,
  ): Promise<InvoiceEntity> {
    const analyzedInvoice =
      await this.openaiService.analyzeInvoiceByBuffer(file);

    if (!analyzedInvoice) {
      throw new InvoiceValidationError('Failed to analyze invoice');
    }

    const updatedInvoice =
      await this.invoiceRepository.updateInvoiceRelationships(
        invoice.id,
        new InvoiceEntity({
          ...analyzedInvoice,
          invoiceStatus: EnumInvoiceStatus.ANALYZED,
        }),
      );

    if (!updatedInvoice) {
      throw new Error('Failed to update invoice');
    }

    return new InvoiceEntity(updatedInvoice);
  }
}
