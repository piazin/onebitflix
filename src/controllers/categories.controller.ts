import { Request, Response } from 'express';
import { categoryService } from '../services/categories.service';

export const categoriesController = {
  index: async (req: Request, res: Response) => {
    const { page, limit } = req.query;

    try {
      const data = await categoryService.findAllPaginated(
        page as string,
        limit as string
      );

      return res.status(200).json(data);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  byId: async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const category = await categoryService.findByIdWithCourses(id);
      return res.status(200).json(category);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
};
