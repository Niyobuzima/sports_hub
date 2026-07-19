const { Pool } = require('pg');
const env = require('../config/env');

// use a connection string in the cloud (with SSL), individual vars locally
const pool = env.db.url
  ? new Pool({ connectionString: env.db.url, ssl: { rejectUnauthorized: false } })
  : new Pool({
      host: env.db.host,
      port: env.db.port,
      database: env.db.name,
      user: env.db.user,
      password: env.db.password,
    });

// always pass values as params to avoid injection
function query(text, params) {
  return pool.query(text, params);
}

module.exports = { pool, query };
