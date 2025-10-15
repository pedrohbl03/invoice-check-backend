import { PrismaService } from 'src/database';
import { InvoiceEntity } from '../../domain';
import { Injectable } from '@nestjs/common';
import { ChatEntity } from '../../domain/entities/invoice-chat.entity';

@Injectable()
export class InvoiceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createInvoice(invoice: InvoiceEntity): Promise<InvoiceEntity> {
    const createdInvoice = await this.prisma.invoice.create({
      data: {
        ...invoice,
        ...(invoice.invoiceItems && {
          invoiceItems: {
            createMany: { data: invoice.invoiceItems },
          },
        }),

        // Create chat history if it not exists
        ...(invoice.chatHistory && {
          chatHistory: {
            create: {
              ...(invoice.chatHistory.chatInteractions && {
                chatInteractions: {
                  createMany: { data: invoice.chatHistory.chatInteractions },
                },
              }),
            },
          },
        }),
      },
      include: {
        invoiceItems: true,
        chatHistory: true,
      },
    });

    if (!createdInvoice) {
      throw new Error('Failed to create invoice');
    }

    return new InvoiceEntity(createdInvoice as InvoiceEntity);
  }

  async updateInvoice(
    id: string,
    invoice: Partial<InvoiceEntity>,
  ): Promise<InvoiceEntity> {
    const updatedInvoice = await this.prisma.invoice.update({
      where: { id },
      data: {
        id: invoice.id,
        userId: invoice.userId,
        invoiceUrl: invoice.invoiceUrl,
        invoiceStatus: invoice.invoiceStatus,
        invoiceAmount: invoice.invoiceAmount,
        invoiceDate: invoice.invoiceDate,
        invoiceDiscount: invoice.invoiceDiscount,
        invoiceTax: invoice.invoiceTax,
        shipperName: invoice.shipperName,
        consigneeName: invoice.consigneeName,
        invoiceNumber: invoice.invoiceNumber,
        fileOriginalName: invoice.fileOriginalName,
      },
    });

    return new InvoiceEntity(updatedInvoice);
  }

  async updateInvoiceRelationships(
    id: string,
    invoice: Partial<InvoiceEntity>,
  ): Promise<InvoiceEntity> {
    const { invoiceItems, chatHistory, ...invoiceData } = invoice;
    const updatedInvoice = await this.prisma.invoice.update({
      where: { id },
      data: {
        ...invoiceData,
        ...(invoiceItems && {
          invoiceItems: {
            createMany: { data: invoiceItems },
          },
        }),
        ...(chatHistory && {
          chat: {
            create: {
              ...(chatHistory?.chatInteractions && {
                chatInteractions: {
                  createMany: { data: chatHistory.chatInteractions },
                },
              }),
            },
          },
        }),
      },
      include: {
        invoiceItems: true,
        chatHistory: true,
      },
    });

    return new InvoiceEntity(updatedInvoice as InvoiceEntity);
  }

  async findInvoiceById(id: string): Promise<InvoiceEntity | null> {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id },
    });

    if (!invoice) {
      return null;
    }

    return new InvoiceEntity(invoice);
  }

  async deleteInvoice(id: string): Promise<void> {
    await this.prisma.invoice.delete({
      where: { id },
    });
  }

  async findAllInvoices(): Promise<InvoiceEntity[]> {
    const invoices = await this.prisma.invoice.findMany();

    return invoices.map((invoice) => new InvoiceEntity(invoice));
  }

  async findInvoicesByUserId(userId: string): Promise<InvoiceEntity[]> {
    const invoices = await this.prisma.invoice.findMany({
      where: { userId },
    });

    return invoices.map((invoice) => new InvoiceEntity(invoice));
  }

  async createChatHistory(invoiceId: string): Promise<ChatEntity> {
    const newChat = await this.prisma.chat.create({
      data: {
        invoiceId,
      },
    });

    return new ChatEntity({
      ...newChat,
    });
  }

  async getChatHistoryByInvoiceId(
    invoiceId: string,
  ): Promise<ChatEntity | null> {
    const chat = await this.prisma.chat.findUnique({
      where: { invoiceId },
      include: {
        chatInteractions: true,
      },
    });

    if (!chat) {
      return null;
    }

    return new ChatEntity({
      ...chat,
    });
  }

  async createChatInteraction(
    chatId: string,
    role: 'USER' | 'ASSISTANT',
    content: string,
  ): Promise<void> {
    await this.prisma.chatInteraction.create({
      data: {
        chatId: chatId,
        role,
        content,
      },
    });
  }
}
