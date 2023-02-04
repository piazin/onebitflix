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
};
