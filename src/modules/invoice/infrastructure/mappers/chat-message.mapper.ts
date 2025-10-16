import { InvoiceChatMessageResponseDto } from '../../application/dto/invoice-chat-message-responde.dto';
import { ChatInteractionEntity } from '../../domain';

export class ChatMessageMapper {
  static toResponse(
    entity: ChatInteractionEntity,
  ): InvoiceChatMessageResponseDto {
    return new InvoiceChatMessageResponseDto(entity);
  }
}
