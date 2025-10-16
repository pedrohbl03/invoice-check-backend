import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { EnumInvoiceStatus } from '../../../../../generated/prisma';
import { InvoiceChatResponseDto } from './invoice-chat-response.dto';

export class InvoiceItemResponseDto {
  @ApiProperty() @Expose() itemName: string;
  @ApiProperty() @Expose() itemQuantity: number;
  @ApiProperty() @Expose() itemPrice: number;
  @ApiProperty() @Expose() itemTotal: number;

  @Exclude() createdAt?: Date;
  @Exclude() updatedAt?: Date;
  @Exclude() invoiceId?: string;
  @Exclude() id?: number;


  constructor(partial: Partial<InvoiceItemResponseDto>) {
    Object.assign(this, partial);
  }
}

export class InvoiceResponseDto {
  @ApiProperty() @Expose() id?: string;
  @ApiProperty() @Expose() userId?: string;
  @ApiProperty() @Expose() invoiceNumber: string | null;
  @ApiProperty() @Expose() shipperName: string | null;
  @ApiProperty() @Expose() consigneeName: string | null;
  @ApiProperty() @Expose() invoiceDate: Date | null;
  @ApiProperty() @Expose() invoiceAmount: number | null;
  @ApiProperty() @Expose() invoiceDiscount: number | null;
  @ApiProperty() @Expose() invoiceTax: number | null;
  @ApiProperty() @Expose() invoiceStatus: EnumInvoiceStatus;
  @Expose() invoiceUrl: string | null;
  @ApiProperty() @Expose() fileOriginalName: string | null;
  @ApiProperty() @Expose() createdAt?: Date;
  @ApiProperty() @Expose() updatedAt?: Date;

  @Expose()
  @Type(() => InvoiceItemResponseDto)
  invoiceItems: InvoiceItemResponseDto[];

  @Expose()
  @Type(() => InvoiceChatResponseDto)
  chatHistory: InvoiceChatResponseDto;


  constructor(partial: Partial<InvoiceResponseDto>) {
    Object.assign(this, partial);
  }
}