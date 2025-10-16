import { Injectable } from '@nestjs/common';
import { StorageService } from '../../../../database/storage/storage.service';
import { InvoiceRepository } from '../../infrastructure/repositories/invoice.repository';
import { ChatInteractionEntity, InvoiceEntity } from '../../domain';
import { EnumInvoiceStatus } from '../../../../../generated/prisma';
import {
  formatCDNUrl,
  generateInvoiceKey,
} from '../../infrastructure/utils/formatCDNurl';
import {
  InteractionNotFoundError,
  OpenAIService,
} from '../../../../modules/openai';
import {
  InvoiceNotFoundError,
  InvoiceProcessingError,
  InvoiceValidationError,
} from '../../invoice.error';
import { PdfService } from './pdf.service';
import { ConfigService } from '@nestjs/config';
import { InvoiceChatResponseDto, InvoiceResponseDto } from '../dto';
import { InvoiceMapper } from '../../infrastructure/mappers/invoice.mapper';
import { ChatMapper } from '../../infrastructure/mappers/chat.mapper';
import { InvoiceChatMessageResponseDto } from '../dto/invoice-chat-message-responde.dto';
import { ChatMessageMapper } from '../../infrastructure/mappers/chat-message.mapper';
import { ChatRepository } from '../../infrastructure/repositories/chat.repository';
import { PrismaService } from '../../../../database';
import { StorageUploadError } from '@/database/storage/storage.error';

@Injectable()
export class InvoiceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly invoiceRepository: InvoiceRepository,
    private readonly chatRepository: ChatRepository,
    private readonly openaiService: OpenAIService,
    private readonly storageService: StorageService,
    private readonly pdfService: PdfService,
    private readonly configService: ConfigService,
  ) {}

  async createInvoice(
    file: Express.Multer.File,
    userId: string,
  ): Promise<InvoiceResponseDto> {
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
      .uploadFile(
        this.configService.get<string>('r2.bucketName', {
          infer: true,
        })!,
        invoiceKey,
        file.buffer,
        file.mimetype,
      )
      .catch(async (error) => {
        await this.invoiceRepository.deleteInvoice(invoice.id);
        console.error(invoice.id, error);
        throw new StorageUploadError(error.message);
      });

    const invoiceUrl = formatCDNUrl(
      this.configService.get<string>('r2.cdnUrl', {
        infer: true,
      })!,
      this.configService.get<string>('r2.bucketName', {
        infer: true,
      })!,
      invoiceKey,
    );

    const invoiceUpdated = await this.invoiceRepository.updateInvoice(
      invoice.id,
      new InvoiceEntity({
        invoiceUrl,
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

    return InvoiceMapper.toResponse(invoiceUpdated);
  }

  async findAllInvoices(): Promise<InvoiceResponseDto[]> {
    const invoices = await this.invoiceRepository.findAllInvoices();
    return InvoiceMapper.toResponseMany(invoices);
  }

  async findInvoicesByUserId(userId: string): Promise<InvoiceResponseDto[]> {
    const invoices = await this.invoiceRepository.findInvoicesByUserId(userId);
    return InvoiceMapper.toResponseMany(invoices);
  }

  async findInvoiceById(id: string): Promise<InvoiceResponseDto | null> {
    const invoice = await this.invoiceRepository.findInvoiceById(id);

    if (!invoice) {
      throw new InvoiceNotFoundError('Invoice not found');
    }

    return InvoiceMapper.toResponse(invoice);
  }

  async deleteInvoice(id: string): Promise<void> {
    await this.invoiceRepository.deleteInvoice(id);
  }

  async getChatHistoryByInvoiceId(id: string): Promise<InvoiceChatResponseDto> {
    const invoice = await this.invoiceRepository.findInvoiceById(id);

    if (!invoice) {
      throw new InvoiceNotFoundError('Invoice not found');
    }

    const chatHistory = await this.chatRepository.findChatByInvoiceId(id);

    if (!chatHistory) {
      throw new InteractionNotFoundError('Chat history not found');
    }

    return ChatMapper.toResponse(chatHistory);
  }

  async postChatMessage(
    id: string,
    message: string,
  ): Promise<InvoiceChatMessageResponseDto> {
    return this.prisma.$transaction(
      async (tx) => {
        const invoice = await this.invoiceRepository.findInvoiceById(id, tx);

        if (!invoice) {
          throw new InvoiceNotFoundError('Invoice not found');
        }

        if (invoice.invoiceStatus !== EnumInvoiceStatus.ANALYZED) {
          throw new InvoiceValidationError(
            'Invoice must be analyzed before chatting',
          );
        }

        let history = await this.chatRepository.findChatByInvoiceId(id, tx);

        if (!history) {
          history = await this.chatRepository.createChat(id, tx);
        }

        await this.chatRepository.appendChatInteraction(
          history.id,
          new ChatInteractionEntity({
            role: 'USER',
            content: message,
          }),
        );

        const chatResponse = await this.openaiService.sendMessage(
          invoice,
          history,
          message,
        );

        const registredResponse =
          await this.chatRepository.appendChatInteraction(
            history.id,
            new ChatInteractionEntity({
              role: 'ASSISTANT',
              content: chatResponse,
            }),
          );

        return ChatMessageMapper.toResponse(registredResponse);
      },
      {
        timeout: 30000,
      },
    );
  }

  private async processInvoiceAsync(
    invoice: InvoiceEntity,
    file: Express.Multer.File,
  ): Promise<InvoiceResponseDto> {
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
      throw new InvoiceValidationError('Failed to update invoice');
    }

    return InvoiceMapper.toResponse(updatedInvoice);
  }

  async getCompilatedInvoicePdf(id: string): Promise<{ url: string }> {
    const invoice = await this.invoiceRepository.findInvoiceById(id);

    if (!invoice) {
      throw new InvoiceNotFoundError('Invoice not found');
    }

    if (invoice.invoiceStatus !== EnumInvoiceStatus.ANALYZED) {
      throw new InvoiceValidationError(
        'Invoice must be analyzed to generate PDF',
      );
    }

    const pdfBuffer = await this.pdfService.generatePdfByInvoice(
      InvoiceMapper.toResponse(invoice),
    );

    await this.storageService.uploadFile(
      this.configService.get<string>('r2.bucketName', {
        infer: true,
      })!,
      generateInvoiceKey(invoice.userId, invoice.id, 'pdf'),
      pdfBuffer,
      'application/pdf',
    );

    const pdfUrl = formatCDNUrl(
      this.configService.get<string>('r2.cdnUrl', {
        infer: true,
      })!,
      this.configService.get<string>('r2.bucketName', {
        infer: true,
      })!,
      generateInvoiceKey(invoice.userId, invoice.id, 'pdf'),
    );

    return { url: pdfUrl };
  }
}
