import { Express } from 'express';
import {
  categoriesRouter,
  coursesRouter,
  episodesRouter,
  authUser,
  favoritesRouter,
  likeRouter,
  userRouter,
} from '.';

export const useRoutes = (app: Express) => {
  app.get('/', (req, res) => res.status(200).json({}));
  app.use(
    categoriesRouter,
    coursesRouter,
    episodesRouter,
    authUser,
    favoritesRouter,
    likeRouter,
    userRouter
  );
};
