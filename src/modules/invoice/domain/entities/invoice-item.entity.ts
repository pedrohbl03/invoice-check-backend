import { Exclude } from 'class-transformer';
import { InvoiceItem } from '../../../../../generated/prisma';
export class InvoiceItemEntity implements InvoiceItem {
  id: number;
  invoiceId: string;
  itemName: string;
  itemQuantity: number;

  itemPrice: number;
  itemTotal: number;

  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<InvoiceItemEntity>) {
    Object.assign(this, partial);
  }
}
