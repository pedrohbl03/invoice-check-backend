import { Exclude, Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { EnumInteractionRole } from "generated/prisma";

export class InvoiceChatMessageResponseDto {
  @ApiProperty() @Exclude() id: string;
  @ApiProperty() @Exclude() chatId: string;
  @ApiProperty({ enum: EnumInteractionRole }) @Expose() role: EnumInteractionRole;
  @ApiProperty() @Expose() content: string;
  @Exclude() createdAt?: Date;
  @Exclude() updatedAt?: Date;

  constructor(partial: Partial<InvoiceChatMessageResponseDto>) {
    Object.assign(this, partial);
  }
}