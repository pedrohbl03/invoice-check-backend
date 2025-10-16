import { InvoiceEntity } from '../entities/invoice.entity';
import { PrismaService } from '@/database';

export interface IInvoiceRepository {
  createInvoice(
    invoice: InvoiceEntity,
    tx?: PrismaService,
  ): Promise<InvoiceEntity>;
  findInvoiceById(
    id: string,
    tx?: PrismaService,
  ): Promise<InvoiceEntity | null>;
  findAllInvoices(tx?: PrismaService): Promise<InvoiceEntity[]>;
  findInvoicesByUserId(userId: string): Promise<InvoiceEntity[]>;
  deleteInvoice(id: string, tx?: PrismaService): Promise<void>;
  updateInvoice(
    id: string,
    invoice: Partial<InvoiceEntity>,
    tx?: PrismaService,
  ): Promise<InvoiceEntity>;
}
