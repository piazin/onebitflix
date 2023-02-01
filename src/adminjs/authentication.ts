import bcrypt from 'bcrypt';
import { User } from '../models/User';
import { AuthenticationOptions } from '@adminjs/express';

export const authenticationOptions: AuthenticationOptions = {
  authenticate: async (email, password) => {
    const user = await User.findOne({ where: { email } });

    if (user && user.role === 'admin') {
      const matched = await bcrypt.compare(password, user.password);

      if (matched) {
        return user;
      }
    }
    return false;
  },
  cookiePassword: 'super-secret',
};
