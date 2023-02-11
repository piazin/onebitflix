import { User, UserCreationAttributes } from '../models';
import { EpisodeInstance } from '../models/Episode';

function filterLastEpisodesByCourse(episodes: EpisodeInstance[]) {
  const coursesOnList: number[] = [];

  const lastEpisodes = episodes.reduce((currentList, episode) => {
    if (!coursesOnList.includes(episode.courseId)) {
      coursesOnList.push(episode.courseId);
      currentList.push(episode);
      return currentList;
    }

    const episodeFromSameCourse = currentList.find(
      (ep) => ep.courseId === episode.courseId
    );

    if (episodeFromSameCourse!.order > episode.order) return currentList;

    const listWithoutEpisodeFromSameCourse = currentList.filter(
      (ep) => ep.courseId !== episode.courseId
    );

    listWithoutEpisodeFromSameCourse.push(episode);

    return listWithoutEpisodeFromSameCourse;
  }, [] as EpisodeInstance[]);

  return lastEpisodes;
}

class UserService {
  async findByEmail(email: string) {
    return await User.findOne({ where: { email } });
  }

  async create(attributes: UserCreationAttributes) {
    var userAlreadyExists = await this.findByEmail(attributes.email);
    if (userAlreadyExists) throw new Error('usuário já registrado!');

    return await User.create(attributes);
  }

  async getKeepWatchingList(id: number) {
    const userWithWatchingEpisodes = await User.findByPk(id, {
      include: {
        association: 'episodes',
        attributes: [
          'id',
          'name',
          'synopsis',
          'order',
          'videoUrl',
          'secondsLong',
          'courseId',
        ],
        include: [
          {
            association: 'Course',
            attributes: ['id', 'name', 'synopsis', 'thumbnailUrl'],
          },
        ],
        through: {
          as: 'watchTime',
          attributes: ['seconds', 'updatedAt'],
        },
      },
    });

    if (!userWithWatchingEpisodes) throw new Error('Usuário não encontrado!');

    const keepWatchingList = filterLastEpisodesByCourse(
      userWithWatchingEpisodes.episodes!
    );

    keepWatchingList.sort((a, b) =>
      // @ts-ignore
      a.watchTime.updatedAt < b.watchTime.updatedAt ? 1 : -1
    );

    return keepWatchingList;
  }
}

export const userService = new UserService();
