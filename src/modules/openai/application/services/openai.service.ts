import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { InvoiceEntity } from 'src/modules/invoice/domain';
import { INSTRUCTIONS } from '../../infrastructure/constants/instructions.constants';

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
    history: any[],
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
              text: 'Analyze the invoice and provide a summary of the invoice.',
            },
          ],
        },
        ...history,
        { role: 'user', content: newMessage },
      ],
    });
    return response.choices[0].message.content ?? '';
  }
}
