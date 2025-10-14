import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto';
import { UserEntity } from '../../domain';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { UserAlreadyExistsError, UserNotFoundError } from '../../user.error';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
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

    return await this.userRepository.createUser(newUser);
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const updatedUser = await this.userRepository.updateUser(
      id,
      new UserEntity({
        ...updateUserDto,
      }),
    );

    if (!updatedUser) {
      throw new Error('Failed to update user');
    }

    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    return await this.userRepository.deleteUser(id);
  }

  async findAllUsers(): Promise<UserEntity[]> {
    const users = await this.userRepository.findAllUsers();

    return users;
  }

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.userRepository.findUserByEmail(email);

    return user;
  }

  async findUserById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findUserById(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }
}
