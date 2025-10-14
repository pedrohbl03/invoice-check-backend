import { ApiProperty } from '@nestjs/swagger';
import { File } from 'buffer';
export class CreateInvoiceDto {
  @ApiProperty({
    type: File,
    description: 'Invoice file to be uploaded',
    format: 'binary',
    required: true,
  })
  file: Express.Multer.File;
}
