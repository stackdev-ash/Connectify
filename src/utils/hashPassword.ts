import bcrypt from "bcrypt";

export const hashPassword = async (
  password: string
) => {
  return bcrypt.hash(password, 10);
};