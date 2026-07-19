CREATE TABLE facilities (
  id        SERIAL PRIMARY KEY,
  name      TEXT UNIQUE NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE bookings (
  id           SERIAL PRIMARY KEY,
  user_id      INTEGER NOT NULL REFERENCES users(id),
  facility_id  INTEGER NOT NULL REFERENCES facilities(id),
  booking_date DATE NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO facilities (name) VALUES
  ('Gym'),
  ('Football'),
  ('Swimming'),
  ('Tennis'),
  ('Basketball'),
  ('Indoor Games'),
  ('Fitness Classes');
