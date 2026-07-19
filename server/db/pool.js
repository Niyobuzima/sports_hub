const { Pool } = require('pg');
const env = require('../config/env');

const pool = new Pool({
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
