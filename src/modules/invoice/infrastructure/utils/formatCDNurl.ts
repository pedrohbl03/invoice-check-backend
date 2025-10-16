export const formatCDNUrl = (cdnUrl: string, bucketName: string, url: string): string => {
  return `${cdnUrl}/${bucketName}/${url}`;
};

export const generateInvoiceKey = (
  userId: string,
  invoiceId: string,
  extension: string,
): string => {
  return `${userId}/${invoiceId}.${extension}`;
};
