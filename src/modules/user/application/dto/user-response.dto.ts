import { ApiProperty } from '@nestjs/swagger';
import { EnumRole } from '../../../../../generated/prisma';
import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  @ApiProperty() @Expose() id: string;
  @ApiProperty() @Expose() email: string;
  @ApiProperty() @Expose() name: string;
  @ApiProperty({ enum: EnumRole }) @Expose() role: EnumRole;

  @Exclude() password?: string;
  @Exclude() createdAt?: Date;
  @Exclude() updatedAt?: Date;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
