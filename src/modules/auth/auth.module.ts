import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './application/services';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
