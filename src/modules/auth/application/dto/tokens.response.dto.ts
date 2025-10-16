import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class TokensResponseDto {
  @ApiProperty({
    description: 'The token',
    example: 'token123',
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({
    description: 'The expires in',
    example: '1h',
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  expiresIn: string;

  constructor(partial: Partial<TokensResponseDto>) {
    Object.assign(this, partial);
  }
}

export class RegisterTokensResponseDto {
  @ApiProperty({
    description: 'The access token',
    type: TokensResponseDto,
  })
  @Expose()
  @Type(() => TokensResponseDto)
  accessToken: TokensResponseDto;

  @ApiProperty({
    description: 'The refresh token',
    type: TokensResponseDto,
  })
  @Expose()
  @Type(() => TokensResponseDto)
  refreshToken: TokensResponseDto;

  constructor(partial: Partial<RegisterTokensResponseDto>) {
    Object.assign(this, partial);
  }
}
