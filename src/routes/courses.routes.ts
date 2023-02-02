import express from 'express';
const router = express.Router();
import { coursesController } from '../controllers/courses.controller';

router.route('/courses/:id').get(coursesController.show);

export { router };
