import { Request, Response } from 'express';
import { jwtService } from '../services/jwt.service';
import { userService } from '../services/users.service';

export const authController = {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await userService.findByEmail(email);

      if (!user)
        return res.status(401).json({ message: 'E-mail não registrado!' });

      user.checkPassword(password, (err, isSame) => {
        if (err) return res.status(400).json({ message: err.message });

        if (!isSame)
          return res.status(401).json({ message: 'Email ou senha incorreta!' });

        const payload = {
          id: user.id,
          firstName: user.firstName,
          email: user.email,
        };

        const token = jwtService.signToken(payload, '7d');

        return res.status(200).json({ authenticated: true, ...payload, token });
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          message: error.message,
        });
      }
    }
  },

  register: async (req: Request, res: Response) => {
    const { firstName, lastName, phone, birth, email, password } = req.body;

    try {
      const user = await userService.create({
        firstName,
        lastName,
        phone,
        birth,
        email,
        password,
        role: 'user',
      });

      return res.status(201).json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
};
