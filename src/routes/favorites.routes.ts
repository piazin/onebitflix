import express from 'express';
const router = express.Router();
import { ensureAuth } from '../middlewares/auth';
import { favoritesController } from '../controllers/favorite.controller';

router.route('/favorites').post(ensureAuth, favoritesController.save);

export { router };
