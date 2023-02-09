import { Request, Response } from 'express';
import { courseService } from '../services/course.service';
import { favoriteService } from '../services/favorite.service';
import { likeService } from '../services/like.service';

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
    const courseId = req.params.id;
    const userId = req.user!.id;

    try {
      const course = await courseService.findByIdWithEpisodes(courseId);

      if (!course)
        return res.status(404).json({ message: 'Curso não encontrado' });

      const liked = await likeService.isLiked(userId, Number(courseId));
      const favorited = await favoriteService.isFavorited(
        userId,
        Number(courseId)
      );

      return res.status(200).json({ ...course.get(), liked, favorited });
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

  popular: async (req: Request, res: Response) => {
    try {
      const topTen = await courseService.getTopTenByLikes();
      return res.status(200).json(topTen);
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
