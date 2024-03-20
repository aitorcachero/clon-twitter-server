import bcrypt from 'bcrypt';

const hashPassword = async (password) => {
  const salt = await bcrypt.hash(password, 10);
  return salt;
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export { hashPassword, comparePassword };
