import { InvoiceItemResponseDto, InvoiceResponseDto } from "../../application";
import { InvoiceEntity, InvoiceItemEntity } from "../../domain";
import { ChatMapper } from "./chat.mapper";

export class InvoiceMapper {
  static toResponse(entity: InvoiceEntity): InvoiceResponseDto {
    return new InvoiceResponseDto(entity);
  }

  static toResponseMany(entities: InvoiceEntity[]): InvoiceResponseDto[] {
    return entities.map((entity) => this.toResponse(entity));
  }

  static toItemResponse(entity: InvoiceItemEntity): InvoiceItemResponseDto {
    return new InvoiceItemResponseDto(entity);
  }

  static toItemResponseMany(entities: InvoiceItemEntity[]): InvoiceItemResponseDto[] {
    return entities.map((entity) => this.toItemResponse(entity));
  }
}