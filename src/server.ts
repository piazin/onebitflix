import express from 'express';
import { adminJs, adminJsRouter } from './adminjs';
import { sequelize } from './database';

const app = express();

app.use(express.static('public'));
app.use(adminJs.options.rootPath, adminJsRouter);

(async () => {
  try {
    await sequelize.authenticate();
    console.info('🚀 ~ sequelize connection successfull');
  } catch (err) {
    console.error('🚀 ~ file: server.ts:10 ~ sequelize connection fail', err);
  }
})();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.info(`🚀 ~ server started \n   ~ local: http://localhost:${PORT}/`);
});
