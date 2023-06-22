import express from 'express';
import { sequelize } from './database';
import { useRoutes } from './routes/useRoutes';
import { useMiddlewares } from './middlewares/useMiddlewares';

const app = express();

useMiddlewares(app);
useRoutes(app);

(async () => {
  try {
    await sequelize.authenticate();
    console.info('💾 -> sequelize connection successfull');
  } catch (err) {
    console.error('❌ ~ file: server.ts:10 ~ sequelize connection fail', err);
  }
})();

export { app };
