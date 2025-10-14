import { EnumTokenType, UserTokens } from "generated/prisma";

export class TokensEntity implements UserTokens {
  constructor(partial: Partial<TokensEntity>) {
    Object.assign(this, partial);
  }

  id: string;
  userId: string;
  token: string;
  type: EnumTokenType;
  createdAt: Date;
  updatedAt: Date;
}