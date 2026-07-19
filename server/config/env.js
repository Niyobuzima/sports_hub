require('dotenv').config();

const env = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',

  db: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    name: process.env.DB_NAME || 'sports_hub',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'dev_secret_change_me',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
};

if (!process.env.DB_PASSWORD) {
  console.warn('[config] DB_PASSWORD is not set in .env');
}

module.exports = env;
