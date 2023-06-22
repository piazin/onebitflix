import express from 'express';
import cors from 'cors';
import { adminJs, adminJsRouter } from '../adminjs';
import { config } from '../config';

export const useMiddlewares = (app: express.Express) => {
  app.use(
    cors({
      origin: config.url_allowed,
      optionsSuccessStatus: 200,
    })
  );
  app.use(express.static('public'));
  app.use(adminJs.options.rootPath, adminJsRouter);

  app.use(express.json(), express.urlencoded({ extended: false }));
};
