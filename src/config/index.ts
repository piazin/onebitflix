import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  database: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    db_name: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
  },
  jwt_secret: process.env.JWT_SECRET,
  port: process.env.PORT,
  node_env: process.env.NODE_ENV,
  url_allowed: process.env.URL_ALLOWED,
};
