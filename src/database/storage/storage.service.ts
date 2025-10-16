import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StorageService {
  private s3Client: S3Client;

  constructor(private configService: ConfigService) {
    this.s3Client = new S3Client({
      region: 'auto',
      endpoint: this.configService.get<string>('r2.endpoint', { infer: true }),
      credentials: {
        accessKeyId: this.configService.get<string>('r2.accessKeyId', {
          infer: true,
        })!,
        secretAccessKey: this.configService.get<string>('r2.secretAccessKey', {
          infer: true,
        })!,
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
