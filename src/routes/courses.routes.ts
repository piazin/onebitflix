import express from 'express';
const router = express.Router();
import { ensureAuth } from '../middlewares/auth';
import { coursesController } from '../controllers/courses.controller';

router.route('/courses/search').get(ensureAuth, coursesController.search);
router.route('/courses/newest').get(coursesController.newest);
router.route('/courses/featured').get(ensureAuth, coursesController.featured);
router.route('/courses/popular').get(ensureAuth, coursesController.popular);
router.route('/courses/:id').get(ensureAuth, coursesController.show);


export { router };
