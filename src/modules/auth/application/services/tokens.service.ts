import { Injectable } from '@nestjs/common';
import { EnumTokenType } from '../../../../../generated/prisma';
import { expiresInByType } from '../../infrastructure/utils/expires';
import { TokensEntity } from '../../domain/entities/tokens.entity';
import { TokensRepository } from '../../infrastructure/repositories/tokens.repository';
import { SaveTokenDto } from '../dto/save-token.dto';
import { JwtService } from '@nestjs/jwt';
import { TokensResponseDto } from '../dto/tokens.response.dto';
import { TokensMapper } from '../../infrastructure/mappers/tokens.mapper';
@Injectable()
export class TokensService {
  constructor(
    private readonly tokensRepository: TokensRepository,
    private readonly jwtService: JwtService,
  ) {}

  async deleteTokensByUserId(userId: string): Promise<void> {
    await this.tokensRepository.deleteTokensByUserId(userId);
  }

  async verifyToken(token: string): Promise<TokensResponseDto> {
    return await this.jwtService.verifyAsync(token);
  }

  async saveToken(saveTokenDto: SaveTokenDto): Promise<TokensResponseDto> {
    const token = this.generateToken(saveTokenDto.userId, saveTokenDto.type);

    if (!token) {
      throw new Error('Failed to generate token');
    }

    const savedToken = await this.tokensRepository.saveToken(
      new TokensEntity({ ...saveTokenDto, token }),
    );

    return TokensMapper.toResponse(savedToken);
  }

  generateToken(userId: string, type: EnumTokenType): string {
    const tokenPayload = {
      sub: userId,
      iat: Date.now(),
      type,
    };

    return this.jwtService.sign(tokenPayload, {
      expiresIn: expiresInByType(type),
    });
  }

  async generateAuthTokens(userId: string): Promise<{
    accessToken: {
      token: string;
      expiresIn: string;
    };
    refreshToken: {
      token: string;
      expiresIn: string;
    };
  }> {
    const accessToken = this.generateToken(userId, EnumTokenType.ACCESS);
    const refreshToken = this.generateToken(userId, EnumTokenType.REFRESH);

    await this.saveToken({
      userId,
      type: EnumTokenType.REFRESH,
      token: refreshToken,
    });

    return {
      accessToken: {
        token: accessToken,
        expiresIn: expiresInByType(EnumTokenType.ACCESS),
      },
      refreshToken: {
        token: refreshToken,
        expiresIn: expiresInByType(EnumTokenType.REFRESH),
      },
    };
  }

  async findTokensByUserId(userId: string): Promise<TokensEntity[]> {
    return await this.tokensRepository.findTokensByUserId(userId);
  }
}
