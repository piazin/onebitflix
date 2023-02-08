import { Request, Response } from 'express';
import { favoriteService } from '../services/favorite.service';

export const favoritesController = {
  save: async (req: Request, res: Response) => {
    const { courseId } = req.body;
    const userId = req.user!.id;

    try {
      const favorite = await favoriteService.create(userId, courseId);
      return res.status(201).json(favorite);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          message: error.message,
        });
      }
    }
  },
};
