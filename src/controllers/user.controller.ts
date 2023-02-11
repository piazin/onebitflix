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
};
