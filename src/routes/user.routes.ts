import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { ensureAuth } from '../middlewares/auth';
const router = Router();

router.route('/user/watching').get(ensureAuth, userController.watching);
router
  .route('/users/current')
  .get(ensureAuth, userController.show)
  .put(ensureAuth, userController.update);

router
  .route('/users/current/password')
  .put(ensureAuth, userController.updatePassword);

export { router };
