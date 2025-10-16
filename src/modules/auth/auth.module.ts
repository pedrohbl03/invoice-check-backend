import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './application/services';
import { UserModule } from '../user';
import { TokensService } from './application/services/tokens.service';
import { TokensRepository } from './infrastructure/repositories/tokens.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, TokensService, TokensRepository],
  exports: [AuthService],
})
export class AuthModule {}
