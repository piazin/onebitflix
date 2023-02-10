import express from 'express';
import { episodesController } from '../controllers/episodes.controller';
import { ensureAuth, ensureAuthViaQuery } from '../middlewares/auth';
const router = express.Router();

router
  .route('/episodes/stream')
  .get(ensureAuthViaQuery, episodesController.stream);

router
  .route('/episodes/:id/watchTime')
  .get(ensureAuth, episodesController.getWatchTime)
  .post(ensureAuth, episodesController.setWatchTime);

export { router };
