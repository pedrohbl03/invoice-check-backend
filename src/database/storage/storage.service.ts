import { Injectable } from '@nestjs/common';
import { envConfig } from '../../config/env.config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class StorageService {
  private s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      region: 'auto',
      endpoint: envConfig().r2.endpoint,
      credentials: {
        accessKeyId: envConfig().r2.accessKeyId,
        secretAccessKey: envConfig().r2.secretAccessKey,
      },
    });
  }

  async uploadFile(
    bucketName: string,
    key: string,
    body: Buffer,
    contentType: string,
  ): Promise<void> {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: body,
      ContentType: contentType,
    });
    await this.s3Client.send(command);
  }
}
