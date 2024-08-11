import { getPrisma } from '../../infrastructure/database';

export const UserService = {
  register: async (email: string, password: string) => {
    if (!email || typeof email !== 'string' || !password || typeof password !== 'string') {
      throw new Error('Invalid Args');
    }
    const existingUser = await getPrisma().user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('A user already exists with that email address');
    }
    return await getPrisma().user.create({ data: { email, password, name: email } });
  },

  login: async (email: string, password: string) => {
    if (!email || typeof email !== 'string' || !password || typeof password !== 'string') {
      throw new Error('Invalid Args');
    }
    const user = await getPrisma().user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('Invalid Email');
    }
    if (user.password !== password) {
      throw new Error('Invalid Password');
    }
    return user;
  }
};
