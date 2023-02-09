import { Like } from '../models';

class LikeService {
  async create(userId: number, courseId: number) {
    const like = await Like.create({
      userId,
      courseId,
    });

    return like;
  }

  async delete(userId: number, courseId: number) {
    await Like.destroy({
      where: {
        userId,
        courseId,
      },
    });
  }

  async isLiked(userId: number, courseId: number) {
    const like = await Like.findOne({
      where: {
        userId,
        courseId,
      },
    });

    return like ? true : false;
  }
}

export const likeService = new LikeService();
