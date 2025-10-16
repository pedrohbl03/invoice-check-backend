import { Transform } from 'class-transformer';
import { EnumInvoiceStatus, Invoice } from '../../../../../generated/prisma';
import { InvoiceItemEntity } from './invoice-item.entity';
import { ChatEntity } from './invoice-chat.entity';

export class InvoiceEntity implements Invoice {
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

  id: string;
  userId: string;
  shipperName: string | null;
  consigneeName: string | null;
  invoiceNumber: string | null;

  @Transform(({ value }) => {
    if (value) {
      return new Date(value);
    }
    return null;
  })
  invoiceDate: Date | null;

  invoiceAmount: number | null;
  invoiceDiscount: number | null;
  invoiceTax: number | null;
  invoiceStatus: EnumInvoiceStatus;
  invoiceUrl: string | null;
  fileOriginalName: string | null;

  invoiceItems: InvoiceItemEntity[];
  chatHistory: ChatEntity;

  createdAt: Date;
  updatedAt: Date;
}
