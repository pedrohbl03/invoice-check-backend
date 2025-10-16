import { Exclude } from 'class-transformer';
import { InvoiceItem } from '../../../../../generated/prisma';
export class InvoiceItemEntity implements InvoiceItem {
  @Exclude()
  id: number;
  @Exclude()
  invoiceId: string;
  itemName: string;
  itemQuantity: number;

  itemPrice: number;
  itemTotal: number;

  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<InvoiceItemEntity>) {
    Object.assign(this, partial);
  }
}
