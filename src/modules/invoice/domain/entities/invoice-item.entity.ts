import { InvoiceItem } from 'generated/prisma';
import { Decimal } from 'generated/prisma/runtime/library';

export class InvoiceItemEntity implements InvoiceItem {
  id: number;
  invoiceId: string;
  itemName: string;
  itemQuantity: number;
  itemPrice: Decimal;
  itemTotal: Decimal;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<InvoiceItemEntity>) {
    Object.assign(this, partial);
  }
}
