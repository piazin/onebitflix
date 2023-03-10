import { Request, Response } from 'express';
import { favoriteService } from '../services/favorite.service';

export const favoritesController = {
  index: async (req: Request, res: Response) => {
    const userId = req.user!.id;

    try {
      const favorites = await favoriteService.findAllByUserId(userId);
      return res.status(200).json(favorites);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          message: error.message,
        });
      }
    }
  },

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

  remove: async (req: Request, res: Response) => {
    const courseId = req.params.id;
    const userId = req.user!.id;

    try {
      await favoriteService.delete(userId, Number(courseId));
      return res.status(204).send();
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ message: error.message });
    }
  },
};
