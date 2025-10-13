import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './application/services';
import { UserRepository } from './infrastructure/repositories';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
