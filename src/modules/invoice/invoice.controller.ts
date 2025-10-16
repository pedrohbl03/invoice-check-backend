import {
  Controller,
  Delete,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
  UseGuards,
  Req,
  Body,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { InvoiceService } from './application/services';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../auth/auth.guard';
import { InvoiceChatResponseDto, InvoiceResponseDto } from './application';
import { InvoiceChatMessageResponseDto } from './application/dto/invoice-chat-message-responde.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Invoices')
@UseGuards(AuthGuard)
@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiCreatedResponse({
    description: 'The invoice has been successfully created.',
    type: InvoiceResponseDto,
  })
  uploadInvoice(
    @UploadedFile(new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }), // 10MB
        new FileTypeValidator({ fileType: /^image\/(png|jpg|jpeg)$/ }),
      ],
    })) file: Express.Multer.File,
    @Req() request: Request,
  ): Promise<InvoiceResponseDto> {
    return this.invoiceService.createInvoice(file, request['userId']);
  }

  @Get()
  @ApiOkResponse({
    description: 'The invoices have been successfully fetched.',
    type: [InvoiceResponseDto],
  })
  findAllInvoices(): Promise<InvoiceResponseDto[]> {
    return this.invoiceService.findAllInvoices();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'The invoice has been successfully fetched.',
    type: InvoiceResponseDto,
  })
  findInvoiceById(@Param('id') id: string): Promise<InvoiceResponseDto | null> {
    return this.invoiceService.findInvoiceById(id);
  }

  @Get('/user/:id')
  @ApiOkResponse({
    description: 'The invoices have been successfully fetched.',
    type: [InvoiceResponseDto],
  })
  findInvoicesByUserId(
    @Param('id') userId: string,
  ): Promise<InvoiceResponseDto[]> {
    return this.invoiceService.findInvoicesByUserId(userId);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'The invoice has been successfully deleted.',
  })
  deleteInvoice(@Param('id') id: string): Promise<void> {
    return this.invoiceService.deleteInvoice(id);
  }

  @Get(':id/chat')
  @ApiOkResponse({
    description: 'The chat history has been successfully fetched.',
    type: InvoiceChatResponseDto,
  })
  getChatHistory(
    @Param('id') id: string,
  ): Promise<InvoiceChatResponseDto | null> {
    return this.invoiceService.getChatHistoryByInvoiceId(id);
  }

  @Post(':id/chat')
  @ApiCreatedResponse({
    description: 'The chat message has been successfully created.',
    type: InvoiceChatMessageResponseDto,
  })
  postChatMessage(
    @Param('id') id: string,
    @Body('message') message: string,
  ): Promise<InvoiceChatMessageResponseDto> {
    return this.invoiceService.postChatMessage(id, message);
  }

  @Get(':id/pdf')
  @ApiOkResponse({
    description: 'The invoice PDF has been successfully fetched.',
    schema: {
      type: 'object',
      properties: {
        url: { type: 'string' },
      },
    },
  })
  async getInvoicePdf(@Param('id') id: string): Promise<{ url: string }> {
    return await this.invoiceService.getCompilatedInvoicePdf(id);
  }
}
