import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { OpenAIModule } from './modules/openai/openai.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { UserModule } from './modules/user/user.module';

import { PrismaModule } from './database/prisma/prisma.module';
import { StorageModule } from './database/storage/storage.module';
import { envValidationSchema } from './config/env.validations';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
      load: [envConfig],
    }),

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
