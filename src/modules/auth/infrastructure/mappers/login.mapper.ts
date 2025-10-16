import { UserResponseDto } from '@/modules/user/application/dto/user-response.dto';
import { LoginResponseDto } from '../../application/dto/login-response.dto';
import { RegisterTokensResponseDto } from '../../application/dto/tokens.response.dto';

export class LoginMapper {
  static toResponse(
    user: UserResponseDto,
    tokens: RegisterTokensResponseDto,
  ): LoginResponseDto {
    return new LoginResponseDto({ user, tokens });
  }
}
