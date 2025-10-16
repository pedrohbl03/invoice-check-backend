import { Injectable } from '@nestjs/common';
import { envConfig } from '../../config/env.config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class StorageService {
  private s3Client: S3Client;
  private config = envConfig();

  constructor() {
    this.s3Client = new S3Client({
      region: 'auto',
      endpoint: this.config.r2.endpoint,
      credentials: {
        accessKeyId: this.config.r2.accessKeyId,
        secretAccessKey: this.config.r2.secretAccessKey,
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
