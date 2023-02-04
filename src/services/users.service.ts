import { User, UserCreationAttributes } from '../models';

class UserService {
  async findByEmail(email: string) {
    return await User.findOne({ where: { email } });
  }

  async create(attributes: UserCreationAttributes) {
    var userAlreadyExists = await this.findByEmail(attributes.email);
    if (userAlreadyExists) throw new Error('usuário já registrado!');

    return await User.create(attributes);
  }
}

export const userService = new UserService();
