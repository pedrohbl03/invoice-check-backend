import { PrismaService } from 'src/database';
import { InvoiceEntity } from '../../domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InvoiceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createInvoice(invoice: InvoiceEntity): Promise<InvoiceEntity> {
    const createdInvoice = await this.prisma.invoice.create({
      data: invoice,
    });

    if (!createdInvoice) {
      throw new Error('Failed to create invoice');
    }

    return new InvoiceEntity(createdInvoice);
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

  async updateInvoice(
    id: string,
    invoice: InvoiceEntity,
  ): Promise<InvoiceEntity | null> {
    const updatedInvoice = await this.prisma.invoice.update({
      where: { id },
      data: invoice,
    });

    if (!updatedInvoice) {
      return null;
    }

    return new InvoiceEntity(updatedInvoice);
  }
}
