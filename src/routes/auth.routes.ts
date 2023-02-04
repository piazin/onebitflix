import express from 'express';
import { authController } from '../controllers/auth.controller';
const router = express.Router();

router.route('/auth/register').post(authController.register);

export { router };
