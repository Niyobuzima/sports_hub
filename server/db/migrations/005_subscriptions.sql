CREATE TABLE subscriptions (
  id           SERIAL PRIMARY KEY,
  user_id      INTEGER NOT NULL REFERENCES users(id),
  category_id  INTEGER NOT NULL REFERENCES membership_categories(id),
  start_date   DATE NOT NULL DEFAULT CURRENT_DATE,
  expiry_date  DATE NOT NULL,
  status       TEXT NOT NULL DEFAULT 'active',
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
