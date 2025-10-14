import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { OpenAIModule } from './modules/openai/openai.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { UserModule } from './modules/user/user.module';

import { PrismaModule } from './database/prisma/prisma.module';
import { StorageModule } from './database/storage/storage.module';

@Module({
  imports: [
    StorageModule,
    PrismaModule,
    AuthModule,
    OpenAIModule,
    InvoiceModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
