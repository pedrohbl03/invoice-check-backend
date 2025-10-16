import { InvoiceEntity } from '../entities/invoice.entity';
import { ChatEntity } from '../entities/invoice-chat.entity';
import { ChatInteractionEntity } from '../entities/chat-interaction.entity';

export interface IInvoiceRepository {
  createInvoice(invoice: InvoiceEntity): Promise<InvoiceEntity>;
  findInvoiceById(id: string): Promise<InvoiceEntity | null>;
  findAllInvoices(): Promise<InvoiceEntity[]>;
  findInvoicesByUserId(userId: string): Promise<InvoiceEntity[]>;
  deleteInvoice(id: string): Promise<void>;
  updateInvoice(
    id: string,
    invoice: Partial<InvoiceEntity>,
  ): Promise<InvoiceEntity>;
  getChatHistoryByInvoiceId(invoiceId: string): Promise<ChatEntity | null>;
  createChatHistory(invoiceId: string): Promise<ChatEntity>;
  createChatInteraction(
    chatId: string,
    role: 'USER' | 'ASSISTANT',
    content: string,
  ): Promise<ChatInteractionEntity>;
}
