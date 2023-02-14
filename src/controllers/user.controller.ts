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
};
