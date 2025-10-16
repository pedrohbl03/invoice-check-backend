import { Exclude } from 'class-transformer';
import { EnumRole } from '../../../../../generated/prisma';

export interface UserProps {
  id: string;
  email: string;
  password: string;
  name: string;
  role: EnumRole;
  createdAt: Date;
  updatedAt: Date;
}

export class UserEntity {
  id: string;
  email: string;

  @Exclude()
  password: string;
  name: string;
  role: EnumRole;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: Partial<UserProps>) {
    Object.assign(this, props);
  }
}
