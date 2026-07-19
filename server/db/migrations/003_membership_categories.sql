CREATE TABLE membership_categories (
  id                SERIAL PRIMARY KEY,
  name              TEXT UNIQUE NOT NULL,
  registration_fee  NUMERIC(10,2) NOT NULL,
  monthly_fee       NUMERIC(10,2) NOT NULL,
  referral_percent  NUMERIC(5,2)  NOT NULL DEFAULT 0,
  withdrawal_limit  NUMERIC(10,2) NOT NULL DEFAULT 0,
  reward_multiplier NUMERIC(5,2)  NOT NULL DEFAULT 1,
  facilities        TEXT,
  is_active         BOOLEAN NOT NULL DEFAULT true
);
