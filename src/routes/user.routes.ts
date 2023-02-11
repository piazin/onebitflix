import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { ensureAuth } from '../middlewares/auth';
const router = Router();

router.route('/user/watching').get(ensureAuth, userController.watching);

export { router };
