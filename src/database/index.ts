import { Sequelize } from 'sequelize';
import { config } from '../config';

const { database, node_env } = config;

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: database.host,
  port: database.port,
  database: database.db_name,
  username: database.username,
  password: database.password,
  dialectOptions:
    node_env === 'test'
      ? {
          ssl: true,
          native: true,
        }
      : undefined,
  define: {
    underscored: true,
  },
  logging: false,
});
