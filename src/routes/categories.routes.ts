import express from 'express';
const router = express.Router();
import { categoriesController } from '../controllers/categories.controller';

router.route('/categories').get(categoriesController.index);
router.route('/categories/:id').get(categoriesController.show);

export { router };
