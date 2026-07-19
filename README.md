# Sports HUB Management System

A web-based platform to manage a sports club's memberships, registrations,
payments, referrals, reward points, facilities, and reports.

University group project (BBICT Group Four).

## Live demo

- **App (frontend):** https://sports-hub-cpzg.vercel.app/
- **API (backend):** https://sports-hub-fdmh.onrender.com/api

Admin login: `admin@sportshub.local` / `admin123`
(The API root returns 404 by design — all endpoints live under `/api`.)

## Group members (BBICT Group Four)

| #  | Name                      | Registration number |
| -- | ------------------------- | ------------------- |
| 1  | NIYOBUZIMA Theophile      | BBICTR/2026/69295   |
| 2  | Rukundo Toussaint         | BBICTR/2026/69182   |
| 3  | Uwamahirwe Yvette         | BBICTR/2026/69598   |
| 4  | Isimbi Teta Sonia         | BBICTR/2026/68283   |
| 5  | Agatesi Queen             | BBICTR/2026/69575   |
| 6  | Mugisha Simeon            | BBICTR/2026/69432   |
| 7  | Mwami Elie                | BBICTR/2026/69133   |
| 8  | Manzi Eria                | BBICTR/2026/69831   |
| 9  | Manzi Solomon             | BICTR/2026/69389    |
| 10 | Murekatete Divine         | BBICTR/2026/68328   |
| 11 | Mizero Igena Yvaun        | BBICTR/2026/69248   |
| 12 | Mujawayezu Egidia         | BBICTR/2026/68790   |
| 13 | Ikuzwe Chrispin           | BBICTR/2026/69898   |
| 14 | INGABIRE Ridhuanat Bin'ta | BBICTR/2026/30090   |
| 15 | Mukama Caleb              | BICTR/2026/68518    |
| 16 | Yvan CYUSA                | BBICTR/2026/69803   |
| 17 | Ramadhan HIRWA            | BBICTR/2026/69188   |
| 18 | Kwizera Maxime            | BBICTR/2026/30075   |
| 19 | Ntakirutimana Yassin      | BBICTR/2026/69540   |
| 20 | Munezero David            | BBICTR/2026/69852   |
| 21 | Asingizwe Aphyah Bonny    | BBICTR/2026/68828   |
| 22 | Rugaba Kenny              | BBICTR/2026/69773   |
| 23 | Isimbi Kanziga Darlene    | BBICTR/2026/69444   |
| 24 | Rutagarama Severin        | BBICTR/2026/69270   |

## Tech stack

| Layer    | Technology                                            |
| -------- | ----------------------------------------------------- |
| Frontend | React (Vite) + React Router + react-bootstrap + Axios |
| Backend  | Node.js + Express (REST API)                          |
| Database | PostgreSQL                                            |
| Auth     | JWT + bcrypt                                          |

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

| Area          | Routes                                                     |
| ------------- | ---------------------------------------------------------- |
| Auth          | `POST /api/auth/register`, `/login`, `GET /me`       |
| Registrations | `GET /api/registrations`, `PATCH /:userId/status`      |
| Categories    | `GET/POST/PUT/DELETE /api/categories`                    |
| Payments      | `POST /api/payments`, `GET /api/payments/me`           |
| Subscription  | `GET /api/subscriptions/me`                              |
| Referrals     | `GET /api/referrals/me`                                  |
| Rewards       | `GET /api/rewards/me`                                    |
| Withdrawals   | `POST /api/withdrawals`, `GET /me`                     |
| Facilities    | `GET /api/facilities`, `POST /book`, `GET /bookings` |
| Reports       | `GET /api/reports/summary`, `/transactions`            |
| Notifications | `GET /api/notifications/me`, `POST /read`              |

## Branching workflow

- `main` — stable, graded state.
- `develop` — integration branch. All feature branches merge here.
- `feature/NN-short-name` — one task per branch, opened as a PR into `develop`.

## Deployment (Vercel monorepo)

This repo is a monorepo: the React client and the Express API deploy together
from one Vercel project, configured by [`vercel.json`](vercel.json):

- The **client** (`client/`) builds as a static site (`@vercel/static-build`).
- The **API** (`server/index.js`) runs as a serverless function; all `/api/*`
  requests route to it, and the client calls it same-origin at `/api`.

### One-time setup on Vercel

1. Import the GitHub repo into Vercel. Leave the **Root Directory** at the repo
   root — `vercel.json` handles the monorepo build (do not set it to `client`).
2. Provision a managed PostgreSQL database (Supabase, Neon, Render, …).
3. In the Vercel project **Environment Variables**, set:
   - `DATABASE_URL` — the cloud Postgres connection string (used with SSL)
   - `JWT_SECRET` — a long random string
   - `CLIENT_URL` — your Vercel site URL (for CORS)
4. Create the schema once by running the migrations/seed locally against the
   cloud DB: set `DATABASE_URL` in `server/.env`, then
   `cd server && npm run migrate && npm run seed`.
5. Deploy. The site serves the client, and the API is live under `/api`.

> Local development is unchanged: `server/.env` uses the individual `DB_*` vars,
> and the client uses `VITE_API_URL`. In production the client falls back to the
> same-origin `/api`, so no client build-time env var is required.

### Other hosts

- **Client:** any static host — build `client` with `npm run build`, set
  `VITE_API_URL` to the API URL.
- **Server:** any Node host (Render, Railway) — set the env vars and run
  `npm run migrate && npm run seed` against the database.
