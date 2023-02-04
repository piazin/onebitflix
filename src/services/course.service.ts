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
}

export const courseService = new CourseService();
