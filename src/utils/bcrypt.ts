import bcryptjs from "bcryptjs";

export const hashPassword = (password: string): string => {
  const salt = bcryptjs.genSaltSync(12);
  return bcryptjs.hashSync(password, salt);
};

export const verifyPassword = (password: string, hashValues: string): boolean => {
  return bcryptjs.compareSync(password, hashValues);
};
