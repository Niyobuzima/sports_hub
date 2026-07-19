# Software Requirements Specification (SRS)

Project: Sports HUB Management System
Group: BBICT Group Four

## 1. Introduction

This is a web app for a sports club. It helps the club manage members,
payments, referrals, reward points, facilities and reports in one place
instead of doing it by hand.

## 2. Purpose

- Let customers and instructors register online.
- Let an admin approve members and manage the system.
- Track subscriptions, payments and membership status.
- Handle referrals, reward points and point withdrawals.
- Control facility access by membership category.
- Show reports to the admin.

## 3. Scope

The system has two sides:
- **Members** (customer/instructor) — register, pay, see their status, book
  facilities, earn and withdraw points.
- **Admin** — approve/suspend members, manage categories, view reports.

## 4. Users (Actors)

- Customer
- Instructor
- Administrator

## 5. Functional requirements

1. Register and log in (JWT + password hashing).
2. Admin approves, rejects or suspends registrations.
3. Admin manages membership categories (Bronze…VIP).
4. Members pay registration and monthly fees (1/3/6/12 months).
5. System shows membership status (Active, Expiring Soon, Expired, Suspended).
6. Each member gets a referral code; referrers earn a bonus.
7. Members earn reward points and can withdraw them (category limits).
8. Facilities are booked based on the membership category.
9. Admin views reports (members, revenue, points, facility use).
10. Members get notifications for approval, payment, referral and withdrawal.

## 6. Non-functional requirements

- Responsive design (works on phone and computer).
- Secure login with hashed passwords and role-based access.
- Fast responses for normal use.
- Runs on modern browsers.
- Data stored in a PostgreSQL database.

## 7. Tools used

React (Vite), Node.js + Express, PostgreSQL, JWT, Git/GitHub, Vercel + Render.
