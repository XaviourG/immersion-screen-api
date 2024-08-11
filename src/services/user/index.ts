import { getPrisma } from '../../infrastructure/database';
import { CError } from '../../utilities/errors';

export const UserService = {
  register: async (email: string, password: string) => {
    if (!email || typeof email !== 'string' || !password || typeof password !== 'string') {
      throw new CError('Invalid Args', { email, password }, 'Unauthorized');
    }
    const existingUser = await getPrisma().user.findUnique({ where: { email } });
    if (existingUser) {
      throw new CError('A user already exists with that email address', { email, password }, 'Unauthorized');
    }
    return await getPrisma().user.create({ data: { email, password, name: email } });
  },

  login: async (email: string, password: string) => {
    if (!email || typeof email !== 'string' || !password || typeof password !== 'string') {
      throw new CError('Invalid Args', { email, password }, 'Unauthorized');
    }
    const user = await getPrisma().user.findUnique({ where: { email } });
    if (!user) {
      throw new CError('Invalid Email', { email, password }, 'Unauthorized');
    }
    if (user.password !== password) {
      throw new CError('Invalid Password', { email, password }, 'Unauthorized');
    }
    return user;
  }
};
