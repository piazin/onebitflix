import express from 'express';
const router = express.Router();
import { ensureAuth } from '../middlewares/auth';
import { categoriesController } from '../controllers/categories.controller';

router.route('/categories').get(ensureAuth, categoriesController.index);
router.route('/categories/:id').get(ensureAuth, categoriesController.show);

export { router };
