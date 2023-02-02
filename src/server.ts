import express from 'express';
import { adminJs, adminJsRouter } from './adminjs';
import { sequelize } from './database';
import { categoriesRouter, coursesRouter } from './routes';

const app = express();

app.use(express.static('public'));
app.use(adminJs.options.rootPath, adminJsRouter);
app.use(categoriesRouter);
app.use(coursesRouter);

(async () => {
  try {
    await sequelize.authenticate();
    console.info('💾 -> sequelize connection successfull');
  } catch (err) {
    console.error('❌ ~ file: server.ts:10 ~ sequelize connection fail', err);
  }
})();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.info(`🚀 -> server started in http://localhost:${PORT}/`);
});
