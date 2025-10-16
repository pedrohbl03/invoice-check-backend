import { Injectable } from '@nestjs/common';
import { Prisma } from '../../../../../generated/prisma';
import { PrismaService } from '../../../../database';
import { ChatEntity, ChatInteractionEntity } from '../../domain';
import { IChatRepository } from '../../domain/repositories/chat.repository.interface';

@Injectable()
export class ChatRepository implements IChatRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createChat(
    invoiceId: string,
    tx?: Prisma.TransactionClient,
  ): Promise<ChatEntity> {
    const createdChat = await (tx || this.prisma).chat.create({
      data: {
        invoiceId: invoiceId,
      },
      include: {
        chatInteractions: true,
      },
    });

    return new ChatEntity(createdChat);
  }

  async findChatByInvoiceId(
    invoiceId: string,
    tx?: Prisma.TransactionClient,
  ): Promise<ChatEntity | null> {
    return await (tx || this.prisma).chat.findUnique({
      where: { invoiceId },
      include: {
        chatInteractions: true,
      },
    });
  }

  async appendChatInteraction(
    chatId: string,
    interaction: ChatInteractionEntity,
    tx?: Prisma.TransactionClient,
  ): Promise<ChatInteractionEntity> {
    return await (tx || this.prisma).chatInteraction.create({
      data: {
        ...interaction,
        chatId,
      },
    });
  }
}
