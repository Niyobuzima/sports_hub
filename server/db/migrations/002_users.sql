CREATE TABLE users (
  id             SERIAL PRIMARY KEY,
  full_name      TEXT NOT NULL,
  email          TEXT UNIQUE NOT NULL,
  password_hash  TEXT NOT NULL,
  role_id        INTEGER NOT NULL REFERENCES roles(id),
  account_status TEXT NOT NULL DEFAULT 'pending',
  -- filled later by referral / reward modules
  referral_code  TEXT UNIQUE,
  referred_by    INTEGER REFERENCES users(id),
  reward_points  INTEGER NOT NULL DEFAULT 0,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);
