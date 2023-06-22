const { config } = require('../dist/config');

module.exports = {
  development: {
    dialect: 'postgres',
    host: config.database.host,
    port: String(config.database.port),
    database: config.database.db_name,
    username: config.database.username,
    password: config.database.password,
    dialectOptions:
      config.node_env === 'production'
        ? {
            ssl: true,
            native: true,
          }
        : undefined,
  },
};
