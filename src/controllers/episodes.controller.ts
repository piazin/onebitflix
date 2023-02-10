import { Request, Response } from 'express';
import { episodeService } from '../services/episodes.service';

export const episodesController = {
  stream: async (req: Request, res: Response) => {
    const { videoUrl } = req.query;
    const range = req.headers.range;

    try {
      if (typeof videoUrl !== 'string')
        throw new Error('videoUrl param must be of type string');

      episodeService.streamEpisodeToResponse(res, videoUrl, range);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({
          message: error.message,
        });
    }
  },

  getWatchTime: async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const episodeId = req.params.id;

    try {
      const watchTime = await episodeService.getWatchTime(
        userId,
        Number(episodeId)
      );
      return res.status(200).json(watchTime);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({
          message: error.message,
        });
    }
  },

  setWatchTime: async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const episodeId = Number(req.params.id);
    const {seconds} = req.body;

    try {
      const watchTime = await episodeService.setWatchTime({
        userId, 
        episodeId,
        seconds
      });
      return res.status(200).json(watchTime);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({
          message: error.message,
        });
    }
  },
};
