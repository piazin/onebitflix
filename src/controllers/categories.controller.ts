import { Request, Response } from 'express';
import { Category } from '../models';

export const categoriesController = {
  index: async (req: Request, res: Response) => {
    const { page, limit } = req.query;

    const pageNumber =
      typeof page === 'string' && parseInt(page, 10) ? parseInt(page, 10) : 1;

    const limitNumber =
      typeof limit === 'string' && parseInt(limit, 10)
        ? parseInt(limit, 10)
        : 10;

    const offset = (pageNumber - 1) * limitNumber;

    try {
      const { count, rows } = await Category.findAndCountAll({
        attributes: ['id', 'name', 'position'],
        order: [['position', 'ASC']],
        limit: limitNumber,
        offset,
      });

      return res.status(200).json({
        data: {
          categories: rows,
          page: pageNumber,
          limit,
          total: count,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  byId: async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const category = await Category.findByPk(id);

      return res.status(200).json(category);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
};
