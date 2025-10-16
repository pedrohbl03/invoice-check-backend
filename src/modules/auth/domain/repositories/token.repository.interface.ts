import { EnumTokenType } from "../../../../../generated/prisma";
import { TokensEntity } from "../entities/tokens.entity";

export interface TokenRepositoryInterface {
  saveToken(token: TokensEntity): Promise<TokensEntity>;
  findTokenByType(userId: string, type: EnumTokenType): Promise<TokensEntity | null>;
  deleteTokensByUserId(userId: string): Promise<void>;
  findTokensByUserId(userId: string): Promise<TokensEntity[]>;
}