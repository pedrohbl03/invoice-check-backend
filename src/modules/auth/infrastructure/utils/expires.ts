import { EnumTokenType } from "generated/prisma";

const accessExpiresIn = '1h';
const refreshExpiresIn = '7d';

export const expiresInByType = (type: EnumTokenType) => {
  if (type === EnumTokenType.ACCESS) {
    return accessExpiresIn;
  }
  return refreshExpiresIn;
};