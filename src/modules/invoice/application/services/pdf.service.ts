import { Injectable } from '@nestjs/common';
import PDFDocument from 'pdfkit';
import { InvoiceEntity } from '../../domain';
import download from '../../infrastructure/utils/download';
import { InvoiceProcessingError } from '../../invoice.error';
import { getFileNameByUrl } from '../../infrastructure/utils/files';
import fs from 'fs';
import { join } from 'path';

@Injectable()
export class PdfService {
  constructor() {}

  async generatePdfByInvoice(invoice: InvoiceEntity): Promise<Buffer> {
    if (
      !invoice ||
      !invoice.invoiceUrl ||
      invoice.invoiceStatus !== 'ANALYZED'
    ) {
      throw new InvoiceProcessingError(
        'Invalid invoice data provided for PDF generation.',
      );
    }

    const tempDir = '/tmp';
    const filePath = join(tempDir, getFileNameByUrl(invoice.invoiceUrl));

    await download(invoice.invoiceUrl, filePath).catch((err) => {
      console.error('Download error:', err);
      throw new InvoiceProcessingError(
        'Failed to download invoice image to server generate PDF.',
      );
    });

    const doc = new PDFDocument();
    const chunks: Buffer[] = [];

    return new Promise<Buffer>((resolve, reject) => {
      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => {
        const result = Buffer.concat(chunks);
        this.removeTempFile(filePath);
        resolve(result);
      });
      // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
      doc.on('error', (err) => reject(err));

      doc.fontSize(25).text('Invoice', { align: 'center' });
      doc.moveDown();
      doc.fontSize(16).text(`Invoice ID: ${invoice.id}`);
      doc.text(`User ID: ${invoice.userId}`);
      doc.text(`Status: ${invoice.invoiceStatus}`);

      if (invoice.fileOriginalName) {
        doc.text(`Original File Name: ${invoice.fileOriginalName}`);
      }

      if (invoice.invoiceUrl) {
        doc.image(filePath, {
          fit: [500, 400],
          align: 'center',
          valign: 'center',
        });
      }

      const { chatHistory, ...restInvoiceInfo } = invoice;

      if (invoice.invoiceStatus === 'ANALYZED') {
        doc.addPage();
        doc.fontSize(20).text('Extracted Data', { align: 'center' });
        doc.moveDown();

        if (!restInvoiceInfo) {
          doc.fontSize(14).text('No extracted data available.');
        }

        Object.entries(restInvoiceInfo as Record<string, unknown>).forEach(
          ([key, value]) => {
            if (Array.isArray(value) && value !== null) {
              doc.table({
                columnStyles: [100, '*', 200, '*'],
                data: [
                  Object.keys(value[0] as Record<string, unknown>),
                  ...value.map((item) =>
                    Object.values(item as Record<string, unknown>),
                  ),
                ],
              });
            } else {
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              doc.fontSize(14).text(`${key}: ${value}`);
            }
            doc.moveDown();
          },
        );
        doc.moveDown();
      }

      if (
        chatHistory.chatInteractions &&
        chatHistory.chatInteractions.length > 0
      ) {
        doc.addPage();
        doc.fontSize(20).text('Chat History', { align: 'center' });
        doc.moveDown();

        invoice.chatHistory.chatInteractions.forEach((chat) => {
          doc.fontSize(14).text(`${chat.role}: ${chat.content} \n`, {
            linebreak: true,
            align: 'left',
          });
          doc.moveDown();
        });
      } else {
        doc.fontSize(14).text('No chat history available.');
      }

      doc.end();
    });
  }

  private removeTempFile(filePath: string): void {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting temp file:', err);
      } else {
        console.log('Temp file deleted:', filePath);
      }
    });
  }
}
