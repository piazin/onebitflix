import { UserInstance } from '../../models/User';

declare global {
  namespace Express {
    interface Request {
      user?: UserInstance | null;
    }
  }
}
