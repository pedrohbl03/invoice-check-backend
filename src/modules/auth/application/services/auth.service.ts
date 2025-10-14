import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

import { UserEntity } from '../../../user/domain/entities/user.entity';
import { InvalidCredentialsError } from '../../auth.error';
import { UserAlreadyExistsError, UserService } from '../../../user';
import { passwordCompare } from '../../infrastructure/utils/passwordCompare';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { EnumRole } from 'generated/prisma';
import { TokensService } from './tokens.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokensService: TokensService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ user: UserEntity; tokens: any }> {
    const user = await this.userService.findUserByEmail(loginDto.email);

    if (!user || !(await passwordCompare(loginDto.password, user.password))) {
      throw new InvalidCredentialsError();
    }

    const tokens = await this.tokensService.generateAuthTokens(user.id);

    return {
      user,
      tokens,
    };
  }

  async register(
    newUser: RegisterDto,
  ): Promise<{ user: UserEntity; tokens: any }> {
    const existingUser = await this.userService.findUserByEmail(newUser.email);

    if (existingUser) {
      throw new UserAlreadyExistsError();
    }

    const createdUser = await this.userService.createUser({
      ...newUser,
      role: EnumRole.USER,
    });
    const tokens = await this.tokensService.generateAuthTokens(createdUser.id);

    return {
      user: createdUser,
      tokens,
    };
  }

  async logout(userId: string): Promise<void> {
    await this.tokensService.deleteTokensByUserId(userId);
  }
}
