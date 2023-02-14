import { Request, Response } from 'express';
import { userService } from '../services/users.service';

export const userController = {
  watching: async (req: Request, res: Response) => {
    const { id } = req.user!;

    try {
      const watching = await userService.getKeepWatchingList(id);
      return res.status(200).json(watching);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  show: async (req: Request, res: Response) => {
    const currentUser = req.user!;
    try {
      return res.status(200).json(currentUser);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  update: async (req: Request, res: Response) => {
    const { id } = req.user!;
    const { firstName, lastName, email, birth, phone } = req.body;

    try {
      const updatedUser = await userService.update(id, {
        firstName,
        lastName,
        email,
        birth,
        phone,
      });

      return res.status(200).json(updatedUser);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  updatePassword: async (req: Request, res: Response) => {
    const user = req.user;
    const { currentPassword, newPassword } = req.body;

    if (!user) return res.status(401).json({ message: 'Não autorizado!' });

    user.checkPassword(currentPassword, async (err, isSame) => {
      try {
        if (err) return res.status(400).json({ message: err.message });

        if (!isSame)
          return res.status(401).json({ message: 'Senha incorreta!' });

        await userService.updatePassword(user.id, currentPassword);
        return res.status(204).send();
      } catch (error) {
        if (error instanceof Error) {
          return res.status(400).json({ message: error.message });
        }
      }
    });
  },
};
