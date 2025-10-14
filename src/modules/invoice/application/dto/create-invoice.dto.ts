import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EnumInvoiceStatus } from 'generated/prisma';

export class CreateInvoiceDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The title of the invoice',
    example: 'Invoice April 2024',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The URL of the invoice file',
    example: 'https://example.com/invoices/april-2024.pdf',
  })
  fileUrl: string;

  @ApiProperty({ enum: EnumInvoiceStatus, required: false, example: 'PENDING' })
  @IsOptional()
  @IsEnum(EnumInvoiceStatus)
  status: EnumInvoiceStatus;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The description of the invoice',
    example: 'Invoice for services rendered in April 2024',
  })
  description: string;
}
