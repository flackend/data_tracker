let config = {};

if (process.env.ENVIRONMENT === 'development') {
  config = {
    client: 'sqlite3',
    connection: {
      filename: process.env.DB_DATABASE,
    },
  };
} else if (process.env.ENVIRONMENT === 'production') {
  config = {
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_DATABASE,
    }
  };
}

module.exports = require('knex')(config);
