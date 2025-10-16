import { InvoiceItemResponseDto, InvoiceResponseDto } from '../../application';
import { InvoiceEntity, InvoiceItemEntity } from '../../domain';
import { ChatMapper } from './chat.mapper';

export class InvoiceMapper {
  static toResponse(entity: InvoiceEntity): InvoiceResponseDto {
    return new InvoiceResponseDto({
      ...entity,
      invoiceItems:
        entity.invoiceItems?.length > 0
          ? this.toItemResponseMany(entity.invoiceItems)
          : [],
      chatHistory: entity.chatHistory
        ? ChatMapper.toResponse(entity.chatHistory)
        : undefined,
    });
  }

  static toResponseMany(entities: InvoiceEntity[]): InvoiceResponseDto[] {
    return entities.map((entity) => this.toResponse(entity));
  }

  static toItemResponse(entity: InvoiceItemEntity): InvoiceItemResponseDto {
    return new InvoiceItemResponseDto({
      itemName: entity.itemName,
      itemQuantity: entity.itemQuantity,
      itemPrice: entity.itemPrice,
      itemTotal: entity.itemTotal,
    });
  }

  static toItemResponseMany(
    entities: InvoiceItemEntity[],
  ): InvoiceItemResponseDto[] {
    return entities.map((entity) => this.toItemResponse(entity));
  }
}
