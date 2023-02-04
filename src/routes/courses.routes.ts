import express from 'express';
const router = express.Router();
import { coursesController } from '../controllers/courses.controller';

router.route('/courses/search').get(coursesController.search);
router.route('/courses/newest').get(coursesController.newest);
router.route('/courses/featured').get(coursesController.featured);
router.route('/courses/:id').get(coursesController.show);


export { router };
