import express from 'express';
import { likeController } from '../controllers/like.controller';
import { ensureAuth } from '../middlewares/auth';
const router = express.Router();

router.route('/likes').post(ensureAuth, likeController.save);

router.route('/likes/:id').delete(ensureAuth, likeController.remove);

export { router };
