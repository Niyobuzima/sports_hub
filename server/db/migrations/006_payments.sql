CREATE TABLE payments (
  id              SERIAL PRIMARY KEY,
  user_id         INTEGER NOT NULL REFERENCES users(id),
  subscription_id INTEGER REFERENCES subscriptions(id),
  payment_type    TEXT NOT NULL,
  months_paid     INTEGER NOT NULL DEFAULT 1,
  amount          NUMERIC(10,2) NOT NULL,
  paid_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  reference       TEXT
);
