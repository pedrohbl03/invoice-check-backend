import { EnumInvoiceStatus, Invoice } from '../../../../../generated/prisma';
import { InvoiceItemEntity } from './invoice-item.entity';
import { ChatEntity } from './invoice-chat.entity';

export class InvoiceEntity implements Invoice {
  id: string;
  userId: string;
  shipperName: string | null;
  consigneeName: string | null;
  invoiceNumber: string | null;

  invoiceDate: Date | null;

  invoiceAmount: number | null;
  invoiceDiscount: number | null;
  invoiceTax: number | null;
  invoiceStatus: EnumInvoiceStatus;
  invoiceUrl: string | null;
  fileOriginalName: string | null;

  invoiceItems: InvoiceItemEntity[];
  chatHistory: ChatEntity | null;

  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<InvoiceEntity>) {
    if (
      partial &&
      partial.invoiceDate &&
      !(partial.invoiceDate instanceof Date)
    ) {
      partial.invoiceDate = new Date(partial.invoiceDate);
    }

    Object.assign(this, partial);
  }
}
