import { envConfig } from "src/config";

export const formatCDNUrl = (url: string): string => {
  return `${envConfig().r2.cdnUrl}/${url}`;
};

export const generateInvoiceKey = (userId: string, invoiceId: string, extension: string): string => {
  return `/users-invoices/${userId}/${invoiceId}.${extension}`;
};