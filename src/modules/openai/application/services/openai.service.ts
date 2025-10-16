import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { InvoiceEntity } from '../../../../modules/invoice/domain';
import { INSTRUCTIONS } from '../../infrastructure/constants/instructions.constants';
import { ChatInteractionEntity } from '../../../../modules/invoice/domain/entities/chat-interaction.entity';
import { ChatEntity } from '../../../../modules/invoice/domain/entities/invoice-chat.entity';

@Injectable()
export class OpenAIService {
  private client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async analyzeInvoiceByBuffer(
    invoiceFile: Express.Multer.File,
  ): Promise<Partial<InvoiceEntity>> {
    const response = await this.client.responses.create({
      model: 'gpt-4o-mini',
      input: [
        {
          role: 'system',
          content: [{ type: 'input_text', text: INSTRUCTIONS.ANALYZE_INVOICE }],
        },
        {
          role: 'user',
          content: [
            {
              type: 'input_image',
              image_url: `data:${invoiceFile.mimetype};base64,${invoiceFile.buffer.toString('base64')}`,
              detail: 'high',
            },
          ],
        },
      ],
    });

    return JSON.parse(response.output_text ?? '{}') as Partial<InvoiceEntity>;
  }

  async sendMessage(
    invoice: InvoiceEntity,
    history: ChatEntity,
    newMessage: string,
  ): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: [
            {
              type: 'text',
              text: INSTRUCTIONS.INVOICE_CONTEXT(invoice),
            },
          ],
        },

        ...(history?.chatInteractions?.map(
          (interaction: ChatInteractionEntity) => ({
            role: interaction.role.toLowerCase() as 'user' | 'assistant',
            content: interaction.content,
          }),
        ) || []),

        { role: 'user', content: newMessage },
      ],
    });
    return response.choices[0].message.content ?? '';
  }
}
