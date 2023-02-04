import express from 'express';
import { episodesController } from '../controllers/episodes.controller';
const router = express.Router();

router.route('/episodes/stream').get(episodesController.stream);

export { router };
