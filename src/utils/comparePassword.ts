import bcrypt from "bcrypt";

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  return bcrypt.compare(
    password,
    hashedPassword
  );
};