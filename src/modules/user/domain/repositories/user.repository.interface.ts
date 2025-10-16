import { UserEntity } from '../entities';

export interface IUserRepository {
  createUser(user: UserEntity): Promise<UserEntity>;
  findUserByEmail(email: string): Promise<UserEntity | null>;
  findUserById(id: string): Promise<UserEntity | null>;
  findAllUsers(): Promise<UserEntity[]>;
  updateUser(id: string, user: Partial<UserEntity>): Promise<UserEntity>;
  deleteUser(id: string): Promise<void>;
}
