export const envConfig = () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  database: {
    url: process.env.DATABASE_URL,
  },
  r2: {
    bucketName: process.env.R2_BUCKET_NAME || 'your_r2_bucket_name',
    accessKeyId: process.env.R2_ACCESS_KEY_ID || 'your_r2_access_key_id',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || 'your_r2_access_key',
    accountId: process.env.R2_ACCOUNT_ID || 'your_r2_account_id',
    cdnUrl: process.env.R2_CDN_URL || 'your_r2_cdn_url',
    endpoint: process.env.R2_ENDPOINT || `your-r2_endpoint`,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY || 'your_openai_api_key',
  },
});
