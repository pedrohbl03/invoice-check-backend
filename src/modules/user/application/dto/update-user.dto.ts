import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'test@example.com',
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password',
  })
  @IsString()
  @IsOptional()
  @MinLength(6)
  password: string;
}
