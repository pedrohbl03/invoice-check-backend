import { Chat } from 'generated/prisma';
import { ChatInteractionEntity } from './chat-interaction.entity';
import { InvoiceEntity } from './invoice.entity';

export class ChatEntity implements Chat {
  constructor(partial: Partial<ChatEntity>) {
    Object.assign(this, partial);
  }

  id: string;
  invoiceId: string;
  createdAt: Date;
  updatedAt: Date;

  chatInteractions: ChatInteractionEntity[];
  invoice: InvoiceEntity;
}
