# Deployment Guide

The app is hosted on **Vercel** (client + API) with the database on **Render**.

## A. Run locally

1. Install Node.js and PostgreSQL.
2. Create the database: `createdb sports_hub`.
3. Backend:
   ```bash
   cd server
   cp .env.example .env      # fill in DB details, PORT, JWT_SECRET
   npm install
   npm run migrate
   npm run seed
   npm run dev
   ```
4. Frontend:
   ```bash
   cd client
   cp .env.example .env      # set VITE_API_URL
   npm install
   npm run dev
   ```
5. Open http://localhost:5173. Admin: `admin@sportshub.local` / `admin123`.

## B. Deploy online

### 1. Database (Render)

- Create a PostgreSQL instance on Render and copy its connection string.

### 2. Create the tables

- Put the connection string as `DATABASE_URL` in `server/.env`, then run
  `npm run migrate` and `npm run seed` once (this fills the cloud database).

### 3. Vercel

- Import the GitHub repo into Vercel (keep Root Directory as the repo root — the
  `vercel.json` file handles the build).
- Add these environment variables in Vercel:
  - `DATABASE_URL` — the Render connection string
  - `JWT_SECRET` — a long random string
  - `CLIENT_URL` — your Vercel site URL
- Deploy. The client is served at the site root and the API at `/api`.

## Notes

- Keep `PORT` (server) and `VITE_API_URL` (client) matching when running locally.
- Never commit the `.env` file (it holds secrets).
