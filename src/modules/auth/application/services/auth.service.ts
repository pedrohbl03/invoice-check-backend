import { Injectable } from '@nestjs/common';

import { InvalidCredentialsError } from '../../auth.error';
import { UserAlreadyExistsError, UserService } from '../../../user';
import { passwordCompare } from '../../infrastructure/utils/passwordCompare';
import { LoginRequestDto } from '../dto/login-request.dto';
import { RegisterRequestDto } from '../dto/register.dto';
import { EnumRole } from '../../../../../generated/prisma';
import { TokensService } from './tokens.service';
import { UserResponseDto } from '@/modules/user/application/dto/user-response.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { LoginMapper } from '../../infrastructure/mappers/login.mapper';
import { UserMapper } from '@/modules/user/infrastructure/mappers/user.mappers';
import { RegisterResponseDto } from '../dto/register-response.dto';
import { RegisterMapper } from '../../infrastructure/mappers/register.mapper';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokensService: TokensService,
  ) { }

  async login(loginDto: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.userService.findUserByEmail(loginDto.email);

    if (!user || !user.password || !user.id || !(await passwordCompare(loginDto.password, user.password))) {
      throw new InvalidCredentialsError();
    }

    const tokens = await this.tokensService.generateAuthTokens(user.id);

    return LoginMapper.toResponse(user, tokens);
  }

  async register(
    registerRequestDto: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    const existingUser = await this.userService.findUserByEmail(registerRequestDto.email);

    if (existingUser) {
      throw new UserAlreadyExistsError();
    }

    const createdUser = await this.userService.createUser({
      ...registerRequestDto,
      role: EnumRole.USER,
    });
    const tokens = await this.tokensService.generateAuthTokens(createdUser.id);

    return RegisterMapper.toResponse(createdUser, tokens);
  }

  async logout(userId: string): Promise<void> {
    await this.tokensService.deleteTokensByUserId(userId);
  }
}
