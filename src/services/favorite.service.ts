import { Favorite } from '../models';

class FavoriteService {
  async create(userId: number, courseId: number) {
    const favorite = await Favorite.create({ userId, courseId });

    return favorite;
  }
}

export const favoriteService = new FavoriteService();
