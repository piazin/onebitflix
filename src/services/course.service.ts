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
    });

    const randomFeaturedCourses = featuredCourses.sort(
      () => 0.5 - Math.random()
    );

    return randomFeaturedCourses.slice(0, 4);
  }

  async getTopTenNewest() {
    const newestCourses = Course.findAll({
      limit: 10,
      order: [['created_at', 'DESC']],
    });

    return newestCourses;
  }

  async getTopTenByLikes() {
    const result = await Course.sequelize?.query(
      `SELECT
        courses.id,
        courses.name,
        courses.synopsis,
        courses.thumbnail_url as thumbnailUrl,
        COUNT(users.id) AS likes
      FROM courses
          LEFT OUTER JOIN likes
            ON courses.id = likes.course_id
            INNER JOIN users
              ON users.id = likes.user_id
      GROUP BY courses.id
      ORDER BY likes DESC
      LIMIT 10;
      `
    );

    if (result) {
      const [topTen, metadata] = result;
      return topTen;
    } else {
      return null;
    }
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
