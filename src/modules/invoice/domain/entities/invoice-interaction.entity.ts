import { EnumInteractionType, Interaction } from 'generated/prisma';

export class InteractionEntity implements Interaction {
  id: string;
  invoiceId: string;
  interactionType: EnumInteractionType;
  interactionData: string;

  createdAt: Date;
  updatedAt: Date;
}
