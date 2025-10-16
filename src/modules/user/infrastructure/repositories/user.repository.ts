import { PrismaService } from '../../../../database';
import { IUserRepository, UserEntity } from '../../domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(user: UserEntity): Promise<UserEntity> {
    const createdUser = await this.prisma.user.create({
      data: user,
    });

    if (!createdUser) {
      throw new Error('Failed to create user');
    }

    return new UserEntity(createdUser);
  }

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return new UserEntity(user);
  }

  async deleteUser(id: string): Promise<void> {
    console.log('deleteUser', id);
    await this.prisma.user.delete({
      where: { id },
    });
    console.log('deleteUser after', id);
  }

  async updateUser(id: string, user: UserEntity): Promise<UserEntity> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: user,
    });

    return new UserEntity(updatedUser);
  }

  async findUserById(id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    return new UserEntity(user);
  }

  async findAllUsers(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany();

    return users.map((user) => new UserEntity(user));
  }
}
