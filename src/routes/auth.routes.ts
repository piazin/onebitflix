import express from 'express';
import { authController } from '../controllers/auth.controller';
const router = express.Router();

router.route('/auth/register').post(authController.register);
router.route('/auth/login').post(authController.login);

export { router };
