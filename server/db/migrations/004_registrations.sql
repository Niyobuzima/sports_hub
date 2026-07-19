CREATE TABLE registrations (
  id           SERIAL PRIMARY KEY,
  user_id      INTEGER NOT NULL REFERENCES users(id),
  category_id  INTEGER REFERENCES membership_categories(id),
  status       TEXT NOT NULL DEFAULT 'pending',
  reviewed_by  INTEGER REFERENCES users(id),
  reviewed_at  TIMESTAMPTZ,
  note         TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
