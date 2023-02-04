import { Request, Response } from 'express';
import { episodeService } from '../services/episodes.service';

export const episodesController = {
  stream: async (req: Request, res: Response) => {
    const { videoUrl } = req.query;
    const range = req.headers.range;
    console.log('🚀 ~ file: episodes.controller.ts:8 ~ stream: ~ range', range);

    try {
      if (typeof videoUrl !== 'string')
        throw new Error('videoUrl param must be of type string');

      episodeService.streamEpisodeToResponse(res, videoUrl, range);
    } catch (error) {}
  },
};
