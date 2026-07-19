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

## Project structure

```
sports_hub/
  server/    # Express REST API (Node.js + PostgreSQL)
  client/    # React single-page app (Vite)
```

## Getting started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+ running locally

### 1. Backend (server)

```bash
cd server
cp .env.example .env      # then edit .env with your database credentials
npm install
npm run dev               # starts the API (default http://localhost:5000)
```

### 2. Frontend (client)

```bash
cd client
cp .env.example .env      # then edit VITE_API_URL if needed
npm install
npm run dev               # starts the app (default http://localhost:5173)
```

## Branching workflow

- `main` — stable, graded state. Never commit here directly.
- `develop` — integration branch. All feature branches merge here.
- `feature/NN-short-name` — one task per branch, opened as a PR into `develop`.

## Modules

Built MVP-first, then extended:

1. User registration & authentication
2. Registration approval (admin)
3. Membership categories
4. Referral management
5. Payment management
6. Membership status monitoring
7. Facility allocation
8. Reward points
9. Point withdrawal
10. Transactions
11. Reports
12. Notifications
