import express from 'express';
const router = express.Router();
import { ensureAuth } from '../middlewares/auth';
import { favoritesController } from '../controllers/favorite.controller';

router
  .route('/favorites')
  .get(ensureAuth, favoritesController.index)
  .post(ensureAuth, favoritesController.save);

router.route('/favorites/:id').delete(ensureAuth, favoritesController.remove);

export { router };
