import fs from 'fs';
import path from 'path';
import { Response } from 'express';
import { IWatchTime, WatchTime } from '../models/WatchTime';

class EpisodeService {
  streamEpisodeToResponse(
    res: Response,
    videoUrl: string,
    range: string | undefined
  ) {
    const filePath = path.join(__dirname, '..', '..', 'uploads', videoUrl);
    const fileStat = fs.statSync(filePath);

    if (range) {
      var parts = range.replace(/bytes=/, '').split('-');

      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileStat.size - 1;

      const chunkSize = end - start + 1;

      const file = fs.createReadStream(filePath, { start, end });

      const headers = {
        'Content-Range': `bytes ${start}-${end}/${fileStat.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4',
      };

      res.writeHead(206, headers);

      file.pipe(res);
    } else {
      const headers = {
        'Content-Length': fileStat.size,
        'Content-Type': 'video/mp4',
      };

      res.writeHead(200, headers);

      fs.createReadStream(filePath).pipe(res);
    }
  }

  async getWatchTime(userId: number, episodeId: number) {
    const watchTime = await WatchTime.findOne({
      attributes: ['seconds'],
      where: {
        userId,
        episodeId,
      },
    });

    return watchTime;
  }

  async setWatchTime({ userId, episodeId, seconds }: IWatchTime) {
    const watchTimeAlreadyExists = await WatchTime.findOne({
      where: {
        userId,
        episodeId,
      },
    });

    if (watchTimeAlreadyExists) {
      watchTimeAlreadyExists.seconds = seconds;
      await watchTimeAlreadyExists.save();
      return watchTimeAlreadyExists;
    }

    const watchTime = await WatchTime.create({
      episodeId,
      userId,
      seconds,
    });

    return watchTime;
  }
}

export const episodeService = new EpisodeService();
