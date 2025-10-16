import { UserResponseDto } from '../../application/dto/user-response.dto';
import { UserEntity } from '../../domain';

export class UserMapper {
  static toResponse(entity: UserEntity): UserResponseDto {
    return UserResponseDto.fromEntity(entity);
  }

  static toResponseMany(entities: UserEntity[]): UserResponseDto[] {
    return entities.map((entity) => this.toResponse(entity));
  }
}
