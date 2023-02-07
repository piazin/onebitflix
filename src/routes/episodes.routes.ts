import express from 'express';
import { episodesController } from '../controllers/episodes.controller';
import { ensureAuthViaQuery } from '../middlewares/auth';
const router = express.Router();

router
  .route('/episodes/stream')
  .get(ensureAuthViaQuery, episodesController.stream);

export { router };
