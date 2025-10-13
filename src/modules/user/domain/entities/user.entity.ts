import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { EnumRole, User } from 'generated/prisma';

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty({
    description: 'The id of the user',
    example: '123',
  })
  id: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'test@example.com',
  })
  email: string;

  @Exclude()
  password: string;

  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'The role of the user',
    example: 'admin',
  })
  role: EnumRole;

  createdAt: Date;
  updatedAt: Date;
}
