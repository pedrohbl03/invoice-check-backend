import { PrismaService } from '@/database';
import { Injectable } from '@nestjs/common';
import { TokensEntity } from '../../domain/entities/tokens.entity';
import { EnumTokenType } from 'generated/prisma';

@Injectable()
export class TokensRepository {
  constructor(private readonly prisma: PrismaService) {}

  async deleteTokensByUserId(userId: string): Promise<void> {
    await this.prisma.userTokens.deleteMany({
      where: { userId },
    });
  }

  async saveToken(token: TokensEntity): Promise<TokensEntity> {
    const createdAuthToken = await this.prisma.userTokens.create({
      data: token,
    });

    return createdAuthToken;
  }

  async findTokenByType(
    userId: string,
    type: EnumTokenType,
  ): Promise<TokensEntity | null> {
    const token = await this.prisma.userTokens.findFirst({
      where: { userId, type },
    });

    return token;
  }

  async findTokensByUserId(userId: string): Promise<TokensEntity[]> {
    const tokens = await this.prisma.userTokens.findMany({
      where: { userId },
    });

    return tokens;
  }
}
