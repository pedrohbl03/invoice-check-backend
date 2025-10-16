import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { InvoiceChatMessageResponseDto } from './invoice-chat-message-responde.dto';

export class InvoiceChatResponseDto {
  @ApiProperty() @Expose() id: string;
  @ApiProperty() @Expose() invoiceId: string;
  @Exclude() createdAt?: Date;
  @Exclude() updatedAt?: Date;

  @ApiProperty({ type: [InvoiceChatMessageResponseDto] })
  @Expose()
  @Type(() => InvoiceChatMessageResponseDto)
  chatInteractions?: InvoiceChatMessageResponseDto[];

  constructor(partial: Partial<InvoiceChatResponseDto>) {
    Object.assign(this, partial);
  }
}
