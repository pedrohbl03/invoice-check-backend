import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { InteractionModule } from './modules/interaction/interaction.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    InteractionModule,
    InvoiceModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
