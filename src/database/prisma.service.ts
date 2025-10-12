import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

// Note: Run 'npx prisma generate' to generate the Prisma client
// The generated client will be available at '../../generated/prisma'

let PrismaClient: any;

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  PrismaClient = require('../../generated/prisma').PrismaClient;
} catch {
  // Fallback if Prisma client is not generated yet
  PrismaClient = class {
    async $connect() {}

    async $disconnect() {}
  };
}

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await this.$connect();
  }

  async onModuleDestroy() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await this.$disconnect();
  }
}
