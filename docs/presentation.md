# Oral Presentation and Demonstration

A simple slide outline and a demo script for the presentation.

## Slide outline

1. **Title** — Sports HUB Management System, BBICT Group Three, member names.
2. **Problem** — clubs manage members by hand; it's slow and error-prone.
3. **Solution** — a web app for members, payments, referrals, points, facilities.
4. **Users** — Customer, Instructor, Admin.
5. **Main features** — registration + approval, payments + status, referrals,
   rewards + withdrawals, facilities, reports, notifications.
6. **Technology** — React, Express, PostgreSQL, hosted on Vercel + Render.
7. **Architecture** — show the architecture diagram (client → API → database).
8. **Database** — show the ERD.
9. **Live demo** — see script below.
10. **Challenges & lessons** — expiry dates, facility access bug, deployment.
11. **Future work** — email/SMS, online payment, automated tests.
12. **Thank you / questions.**

## Demo script (about 5 minutes)

1. Register a new customer → show "waiting for approval".
2. Log in as admin → approve the new customer.
3. Log in as the customer → show the dashboard.
4. Make a payment (3 months) → show the expiry date update.
5. Book a facility → show points earned.
6. Open Rewards → withdraw points.
7. Log in as admin again → open Reports → export a report.

## Tips

- Have the app already running before you start.
- Keep the admin login ready: `admin@sportshub.local` / `admin123`.
- Each member can talk about one part they worked on.
