import * as bcrypt from 'bcrypt';

export const passwordCompare = async (
  password: string,
  hashedPassword: string,
) => {
  return await bcrypt.compare(password, hashedPassword);
};
