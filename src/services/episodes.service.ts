import fs from 'fs';
import path from 'path';
import { Response } from 'express';

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
      console.log(
        '🚀 ~ file: episodes.service.ts:16 ~ EpisodeService ~ parts',
        parts
      );

      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileStat.size - 1;
      console.log(
        '🚀 ~ file: episodes.service.ts:23 ~ EpisodeService ~ end',
        end
      );

      const chunkSize = end - start + 1;
      console.log(
        '🚀 ~ file: episodes.service.ts:29 ~ EpisodeService ~ chunkSize',
        chunkSize
      );

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
}

export const episodeService = new EpisodeService();
