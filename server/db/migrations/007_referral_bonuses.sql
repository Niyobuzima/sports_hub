CREATE TABLE referral_bonuses (
  id               SERIAL PRIMARY KEY,
  referrer_id      INTEGER NOT NULL REFERENCES users(id),
  referred_user_id INTEGER NOT NULL REFERENCES users(id),
  payment_id       INTEGER REFERENCES payments(id),
  amount           NUMERIC(10,2) NOT NULL,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
