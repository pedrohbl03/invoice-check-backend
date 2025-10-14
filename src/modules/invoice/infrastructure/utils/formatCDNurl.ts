import { envConfig } from "src/config";

export const formatCDNUrl = (url: string): string => {
  return `${envConfig().r2.cdnUrl}/${url}`;
};