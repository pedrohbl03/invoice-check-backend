import { UserResponseDto } from '@/modules/user/application/dto/user-response.dto';
import { Expose, Type } from 'class-transformer';
import { RegisterTokensResponseDto } from './tokens.response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterResponseDto {
  @ApiProperty() @Expose()
  @Type(() => UserResponseDto)
  user: UserResponseDto;
  @ApiProperty() @Expose()
  @Type(() => RegisterTokensResponseDto)
  tokens: RegisterTokensResponseDto;

  constructor(partial: Partial<RegisterResponseDto>) {
    Object.assign(this, partial);
  }
}
