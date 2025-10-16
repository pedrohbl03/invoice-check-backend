import { envConfig } from '../../../../config';

const r2Config = envConfig().r2;

export const formatCDNUrl = (url: string): string => {
  return `${r2Config.cdnUrl}/${r2Config.bucketName}/${url}`;
};

export const generateInvoiceKey = (
  userId: string,
  invoiceId: string,
  extension: string,
): string => {
  return `${userId}/${invoiceId}.${extension}`;
};
