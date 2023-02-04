import { Op } from 'sequelize';
import { getPaginationParams } from '../helpers/getPaginationParams';
import { Course } from '../models';

class CourseService {
  async findByIdWithEpisodes(id: string) {
    const courseWithEpisodes = await Course.findByPk(id, {
      attributes: ['id', 'name', 'synopsis', 'thumbnailUrl'],
      include: {
        association: 'episodes',
        attributes: [
          'id',
          'name',
          'synopsis',
          'order',
          ['video_url', 'videoUrl'],
          ['seconds_long', 'secondsLong'],
        ],
        order: [['order', 'ASC']],
        separate: true,
      },
    });

    return courseWithEpisodes;
  }

  async getRandomFeaturedCourses() {
    const featuredCourses = await Course.findAll({
      attributes: ['id', 'name', 'synopsis', 'thumbnailUrl'],
      where: { featured: true },
      limit: 3,
    });

    const randomFeaturedCourses = featuredCourses.sort(
      () => 0.5 - Math.random()
    );

    return randomFeaturedCourses.slice(0, 3);
  }

  async getTopTenNewest() {
    const newestCourses = Course.findAll({
      limit: 10,
      order: [['created_at', 'DESC']],
    });

    return newestCourses;
  }

  async findByName(name: string, page: string, limit: string) {
    const [pageNumber, limitNumber] = getPaginationParams({ page, limit });
    const offset = (pageNumber - 1) * limitNumber;

    const { count, rows } = await Course.findAndCountAll({
      attributes: ['id', 'name', 'synopsis', 'thumbnailUrl'],
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      limit: limitNumber,
      offset,
    });

    return {
      courses: rows,
      page: pageNumber,
      limitNumber,
      total: count,
    };
  }
}

export const courseService = new CourseService();
