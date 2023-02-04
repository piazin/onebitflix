import { Request, Response } from 'express';
import { courseService } from '../services/course.service';

export const coursesController = {
  featured: async (req: Request, res: Response) => {
    try {
      const courses = await courseService.getRandomFeaturedCourses();
      return res.status(200).json(courses);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  show: async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const course = await courseService.findByIdWithEpisodes(id);
      return res.status(200).json(course);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  newest: async (req: Request, res: Response) => {
    try {
      const newestCourses = await courseService.getTopTenNewest();
      return res.status(200).json(newestCourses);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  search: async (req: Request, res: Response) => {
    const { name, page, limit } = req.query;

    try {
      const courses = await courseService.findByName(
        name as string,
        page as string,
        limit as string
      );
      return res.status(200).json(courses);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
};
