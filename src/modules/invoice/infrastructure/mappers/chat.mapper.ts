import { InvoiceChatResponseDto } from '../../application';
import { ChatEntity } from '../../domain';

export class ChatMapper {
  static toResponse(entity: ChatEntity): InvoiceChatResponseDto {
    return new InvoiceChatResponseDto(entity);
  }
}
