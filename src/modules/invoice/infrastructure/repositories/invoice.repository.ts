import { PrismaService } from 'src/database';
import { InvoiceEntity } from '../../domain';
import { Injectable } from '@nestjs/common';

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
        ...(invoice.interactions && {
          interactions: {
            createMany: { data: invoice.interactions },
          },
        }),
      },
      include: {
        invoiceItems: true,
        interactions: true,
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
    const { invoiceItems, interactions, ...invoiceData } = invoice;
    const updatedInvoice = await this.prisma.invoice.update({
      where: { id },
      data: invoiceData,
    });

    return new InvoiceEntity(updatedInvoice);
  }

  async updateInvoiceWithNewItemsAndInteractions(
    id: string,
    invoice: Partial<InvoiceEntity>,
  ): Promise<InvoiceEntity> {
    const { invoiceItems, interactions, ...invoiceData } = invoice;
    const updatedInvoice = await this.prisma.invoice.update({
      where: { id },
      data: {
        ...invoiceData,
        ...(invoiceItems && {
          invoiceItems: {
            createMany: { data: invoiceItems },
          },
        }),
        ...(interactions && {
          interactions: {
            createMany: { data: interactions },
          },
        }),
      },
      include: {
        invoiceItems: true,
        interactions: true,
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
}
