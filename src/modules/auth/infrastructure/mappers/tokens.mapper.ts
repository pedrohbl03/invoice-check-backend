import { TokensResponseDto } from "../../application/dto/tokens.response.dto";
import { TokensEntity } from "../../domain/entities/tokens.entity";

export class TokensMapper {
  static toResponse(entity: TokensEntity): TokensResponseDto {
    return new TokensResponseDto(entity);
  }
}