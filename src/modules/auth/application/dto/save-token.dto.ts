import { IsNotEmpty, IsString } from "class-validator";
import { EnumTokenType } from "generated/prisma";

export class SaveTokenDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  type: EnumTokenType;

  @IsString()
  @IsNotEmpty()
  token: string;
}