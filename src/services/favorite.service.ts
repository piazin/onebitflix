import { Favorite } from '../models';

class FavoriteService {
  async findAllByUserId(userId: number) {
    const favorites = await Favorite.findAll({
      where: { userId },
      attributes: ['userId'],
      include: {
        association: 'Course',
        attributes: ['id', 'name', 'synopsis', 'thumbnailUrl'],
      },
    });

    return {
      userId,
      courses: favorites.map((favorite) => favorite.Course),
    };
  }

  async create(userId: number, courseId: number) {
    const favorite = await Favorite.create({ userId, courseId });

    return favorite;
  }

  async delete(userId: number, courseId: number) {
    await Favorite.destroy({
      where: {
        userId,
        courseId,
      },
    });
  }

  async isFavorited(userId: number, courseId: number) {
    const favorite = await Favorite.findOne({
      where: {
        userId,
        courseId,
      },
    });

    return favorite ? true : false;
  }
}

export const favoriteService = new FavoriteService();
