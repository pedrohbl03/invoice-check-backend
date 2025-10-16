import { UserResponseDto } from '@/modules/user/application/dto/user-response.dto';
import { RegisterTokensResponseDto } from './tokens.response.dto';
import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty()
  @Expose()
  @Type(() => UserResponseDto)
  user: UserResponseDto;
  @ApiProperty()
  @Expose()
  @Type(() => RegisterTokensResponseDto)
  tokens: RegisterTokensResponseDto;

  constructor(partial: Partial<LoginResponseDto>) {
    Object.assign(this, partial);
  }
}
