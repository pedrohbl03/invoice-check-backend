import { PrismaService } from '../../../../database';
import {
  ChatEntity,
  ChatInteractionEntity,
  InvoiceEntity,
  InvoiceItemEntity,
} from '../../domain';
import { Injectable } from '@nestjs/common';
import { IInvoiceRepository } from '../../domain/repositories/invoice.repository.interface';
import { Prisma } from 'generated/prisma';

@Injectable()
export class InvoiceRepository implements IInvoiceRepository {
  constructor(private readonly prisma: PrismaService) {}

  private readonly INVOICE_INCLUDE = {
    invoiceItems: true,
    chatHistory: {
      include: {
        chatInteractions: true,
      },
    },
  };

  async createInvoice(
    invoice: InvoiceEntity,
    tx?: Prisma.TransactionClient,
  ): Promise<InvoiceEntity> {
    const prisma = tx || this.prisma;

    const createdInvoice = await prisma.invoice.create({
      data: {
        ...invoice,
        ...(invoice.invoiceItems && {
          invoiceItems: {
            create: invoice.invoiceItems || [],
          },
        }),
        chatHistory: {
          create: {
            chatInteractions: {
              create: [],
            },
          },
        },
      },
      include: this.INVOICE_INCLUDE,
    });

    return this.mapInvoiceToEntity(createdInvoice);
  }

  async updateInvoice(
    id: string,
    invoice: Partial<InvoiceEntity>,
    tx?: Prisma.TransactionClient,
  ): Promise<InvoiceEntity> {
    const updatedInvoice = await (tx || this.prisma).invoice.update({
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

    return this.mapInvoiceToEntity(updatedInvoice);
  }

  async updateInvoiceRelationships(
    id: string,
    invoice: Partial<InvoiceEntity>,
    tx?: Prisma.TransactionClient,
  ): Promise<InvoiceEntity> {
    const { invoiceItems, chatHistory, ...invoiceData } = invoice;
    const updatedInvoice = await (tx || this.prisma).invoice.update({
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
                  create: chatHistory.chatInteractions,
                },
              }),
            },
          },
        }),
      },
      include: this.INVOICE_INCLUDE,
    });

    return this.mapInvoiceToEntity(updatedInvoice);
  }

  async findInvoiceById(
    id: string,
    tx?: Prisma.TransactionClient,
  ): Promise<InvoiceEntity | null> {
    const invoice = await (tx || this.prisma).invoice.findUnique({
      where: { id },
      include: this.INVOICE_INCLUDE,
    });

    return invoice ? this.mapInvoiceToEntity(invoice) : null;
  }

  async deleteInvoice(
    id: string,
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    await (tx || this.prisma).invoice.delete({
      where: { id },
    });
  }

  async findAllInvoices(
    tx?: Prisma.TransactionClient,
  ): Promise<InvoiceEntity[]> {
    const invoices = await (tx || this.prisma).invoice.findMany({
      include: this.INVOICE_INCLUDE,
    });

    return invoices.map((invoice) => this.mapInvoiceToEntity(invoice));
  }

  async findInvoicesByUserId(
    userId: string,
    tx?: Prisma.TransactionClient,
  ): Promise<InvoiceEntity[]> {
    const invoices = await (tx || this.prisma).invoice.findMany({
      where: { userId },
      include: this.INVOICE_INCLUDE,
    });

    return invoices.map((invoice) => this.mapInvoiceToEntity(invoice));
  }

  private mapInvoiceToEntity(prismaInvoice: any): InvoiceEntity {
    return new InvoiceEntity({
      ...prismaInvoice,
      invoiceItems: prismaInvoice.invoiceItems?.map(
        (i: InvoiceItemEntity) => new InvoiceItemEntity(i),
      ),
      chatHistory: prismaInvoice.chatHistory
        ? new ChatEntity({
            ...prismaInvoice.chatHistory,
            chatInteractions:
              prismaInvoice.chatHistory.chatInteractions?.map(
                (c: ChatInteractionEntity) => c,
              ) ?? [],
          })
        : null,
    });
  }
}
