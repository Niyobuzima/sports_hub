# Sports HUB Management System

A web-based platform to manage a sports club's memberships, registrations,
payments, referrals, reward points, facilities, and reports.

University group project (BBICT Group Three).

## Tech stack

| Layer    | Technology                                             |
| -------- | ------------------------------------------------------ |
| Frontend | React (Vite) + React Router + react-bootstrap + Axios  |
| Backend  | Node.js + Express (REST API)                           |
| Database | PostgreSQL                                             |
| Auth     | JWT + bcrypt                                            |

## Features

- User registration and login (customer / instructor / admin) with JWT + bcrypt
- Admin approval workflow (approve / reject / suspend); pending & suspended users
  are shown a status page instead of the dashboard
- Membership categories (Bronze / Silver / Gold / Platinum / VIP) managed by admin
- Payments for registration and monthly plans (1 / 3 / 6 / 12 months) with automatic
  expiry; renewals extend from the current expiry
- Membership status: Active / Expiring Soon / Expired / Suspended with days remaining
- Referrals: unique `SPH-` codes, referral capture at signup, referral bonuses
- Reward points earned on registration, payments and referrals
- Point withdrawal subject to category minimum limits
- Facilities gated by membership category + bookings (earn points)
- Admin reports (members, revenue, referrals, points, category & facility stats)
  with CSV export and print-to-PDF
- Dashboard notifications for approval, payments, referrals and withdrawals

## Project structure

```
sports_hub/
  server/    # Express REST API
    db/          # migrations + seed
    routes/ controllers/ models/ middleware/ utils/ config/
  client/    # React single-page app (Vite)
    src/ api/ pages/ components/ context/
```

## Getting started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+ running locally

### 1. Database

Create a database (default name `sports_hub`):

```bash
createdb sports_hub
```

### 2. Backend (server)

```bash
cd server
cp .env.example .env      # set DB credentials, PORT and JWT_SECRET
npm install
npm run migrate           # create tables
npm run seed              # roles, 5 categories, admin account
npm run dev               # starts the API
```

Default admin login: `admin@sportshub.local` / `admin123`

> **Ports must match.** The API `PORT` in `server/.env` and the client's
> `VITE_API_URL` in `client/.env` must point to the same port
> (e.g. server `PORT=5000` ⇄ client `VITE_API_URL=http://localhost:5000/api`).

### 3. Frontend (client)

```bash
cd client
cp .env.example .env      # set VITE_API_URL to the API URL
npm install
npm run dev               # starts the app at http://localhost:5173
```

## API overview

| Area          | Routes                                             |
| ------------- | -------------------------------------------------- |
| Auth          | `POST /api/auth/register`, `/login`, `GET /me`     |
| Registrations | `GET /api/registrations`, `PATCH /:userId/status`  |
| Categories    | `GET/POST/PUT/DELETE /api/categories`              |
| Payments      | `POST /api/payments`, `GET /api/payments/me`       |
| Subscription  | `GET /api/subscriptions/me`                        |
| Referrals     | `GET /api/referrals/me`                            |
| Rewards       | `GET /api/rewards/me`                              |
| Withdrawals   | `POST /api/withdrawals`, `GET /me`                 |
| Facilities    | `GET /api/facilities`, `POST /book`, `GET /bookings` |
| Reports       | `GET /api/reports/summary`, `/transactions`        |
| Notifications | `GET /api/notifications/me`, `POST /read`          |

## Branching workflow

- `main` — stable, graded state.
- `develop` — integration branch. All feature branches merge here.
- `feature/NN-short-name` — one task per branch, opened as a PR into `develop`.

## Deployment notes

- **Client:** any static host (Netlify, Vercel). Build with `npm run build`; set
  `VITE_API_URL` to the deployed API URL.
- **Server:** any Node host (Render, Railway, etc.). Set the `.env` variables and
  run `npm run migrate && npm run seed` once against the production database.
- **Database:** a managed PostgreSQL instance (Render, Supabase, Neon).
- Remember to set the server's `CLIENT_URL` to the deployed client origin for CORS.
