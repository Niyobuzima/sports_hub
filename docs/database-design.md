# Database Design

PostgreSQL. Tables are created by the SQL files in `server/db/migrations/`.
Money is stored as `NUMERIC(10,2)`. Below is a short summary of each table.

| Table | Main columns | Notes |
|---|---|---|
| roles | id, name | customer / instructor / admin |
| users | id, full_name, email, password_hash, role_id, account_status, referral_code, referred_by, reward_points | account_status = pending/active/rejected/suspended |
| membership_categories | id, name, registration_fee, monthly_fee, referral_percent, withdrawal_limit, reward_multiplier, facilities | Bronze, Silver, Gold, Platinum, VIP |
| registrations | id, user_id, category_id, status, reviewed_by, reviewed_at, note | approval history |
| subscriptions | id, user_id, category_id, start_date, expiry_date, status | one active membership period |
| payments | id, user_id, subscription_id, payment_type, months_paid, amount, paid_at | registration or monthly |
| referral_bonuses | id, referrer_id, referred_user_id, payment_id, amount | bonus for referrer |
| reward_transactions | id, user_id, points, reason, created_at | +/- points history |
| point_withdrawals | id, user_id, points, status, created_at | redeemed points |
| facilities | id, name, is_active | Gym, Football, Swimming, etc. |
| bookings | id, user_id, facility_id, booking_date | facility bookings |
| notifications | id, user_id, message, is_read, created_at | dashboard alerts |

(`schema_migrations` also exists to track which migrations have run.)

## Keys

- Every table has an `id` primary key (SERIAL).
- Foreign keys link most tables back to `users` (and to categories/facilities).
- `users.email` and `membership_categories.name` are unique.
