import { envConfig } from '@/config';

export const formatCDNUrl = (url: string): string => {
  return `${envConfig().r2.cdnUrl}/${envConfig().r2.bucketName}/${url}`;
};

export const generateInvoiceKey = (
  userId: string,
  invoiceId: string,
  extension: string,
): string => {
  return `${userId}/${invoiceId}.${extension}`;
};
