import express from 'express';
import cors from 'cors';
import { adminJs, adminJsRouter } from '../adminjs';

export const useMiddlewares = (app: express.Express) => {
  app.use(cors());
  app.use(express.static('public'));
  app.use(adminJs.options.rootPath, adminJsRouter);

  app.use(express.json(), express.urlencoded({ extended: false }));
};
