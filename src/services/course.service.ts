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
}

export const courseService = new CourseService();
