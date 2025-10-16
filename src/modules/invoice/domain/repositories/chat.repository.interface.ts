import { PrismaService } from '../../../../database';
import { ChatEntity, ChatInteractionEntity } from '../entities';

export interface IChatRepository {
  createChat(invoiceId: string, tx?: PrismaService): Promise<ChatEntity>;
  findChatByInvoiceId(
    invoiceId: string,
    tx?: PrismaService,
  ): Promise<ChatEntity | null>;
  appendChatInteraction(
    chatId: string,
    interaction: ChatInteractionEntity,
    tx?: PrismaService,
  ): Promise<ChatInteractionEntity>;
}
