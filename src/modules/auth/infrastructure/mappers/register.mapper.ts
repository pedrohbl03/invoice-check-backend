import { UserResponseDto } from "@/modules/user/application/dto/user-response.dto";
import { RegisterTokensResponseDto } from "../../application/dto/tokens.response.dto";
import { RegisterResponseDto } from "../../application/dto/register-response.dto";

export class RegisterMapper {
  static toResponse(user: UserResponseDto, tokens: RegisterTokensResponseDto): RegisterResponseDto {
    return new RegisterResponseDto({ user, tokens });
  }
}