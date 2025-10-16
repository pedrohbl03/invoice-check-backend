import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto';
import { UserEntity } from '../../domain';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { UserAlreadyExistsError, UserNotFoundError } from '../../user.error';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { UserMapper } from '../../infrastructure/mappers/user.mappers';
import { UserResponseDto } from '../dto/user-response.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const existingUser = await this.userRepository.findUserByEmail(
      createUserDto.email,
    );

    if (existingUser) {
      throw new UserAlreadyExistsError();
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser = new UserEntity({
      ...createUserDto,
      password: hashedPassword,
    });

    const createdUser = await this.userRepository.createUser(newUser);

    return UserMapper.toResponse(createdUser);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const user = await this.userRepository.findUserById(id);

    if (!user) {
      throw new UserNotFoundError();
    } 

    const updatedUser = await this.userRepository.updateUser(
      id,
      new UserEntity({
        ...updateUserDto,
        password: await bcrypt.hash(updateUserDto.password, 10),
      }),
    );

    return UserMapper.toResponse(updatedUser);
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.deleteUser(id);
  }

  async findAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAllUsers();

    return UserMapper.toResponseMany(users);
  }

  async findUserByEmail(email: string): Promise<UserResponseDto | null> {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      return null;
    }

    return UserMapper.toResponse(user);
  }

  async findUserById(id: string): Promise<UserResponseDto | null> {
    const user = await this.userRepository.findUserById(id);

    if (!user) {
      return null;
    }

    return UserMapper.toResponse(user);
  }
}
