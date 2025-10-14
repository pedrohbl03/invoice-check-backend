import { EnumInvoiceStatus, Invoice } from 'generated/prisma';
import { Decimal } from 'generated/prisma/runtime/library';

export class InvoiceEntity implements Invoice {
  id: string;
  userId: string;
  amount: number;
  shipperName: string;
  consigneeName: string;
  invoiceNumber: string;
  invoiceDate: Date;
  invoiceAmount: Decimal;
  invoiceStatus: EnumInvoiceStatus;
  invoiceUrl: string;

  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<Invoice>) {
    Object.assign(this, partial);
  }
}
