import { EnumInteractionRole, ChatInteraction } from 'generated/prisma';

export class ChatInteractionEntity implements ChatInteraction {
  id: string;
  chatId: string;
  role: EnumInteractionRole;
  content: string;

  createdAt: Date;
  updatedAt: Date;
}
