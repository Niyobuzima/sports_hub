# Final Project Report

Project: Sports HUB Management System
Group: BBICT Group Three

## 1. Introduction

A sports club needed a system to manage members and payments online instead of
using paper and spreadsheets. We built a web application to do this.

## 2. Objectives

- Register customers and instructors.
- Let an admin approve members.
- Manage membership categories and subscriptions.
- Handle referrals, reward points and withdrawals.
- Control facility access and produce reports.

## 3. What we built

A full web app with:
- A **React** frontend (pages for login, dashboard, payments, facilities,
  rewards, referrals, admin, reports).
- An **Express** REST API with role-based access.
- A **PostgreSQL** database with 12 tables.

All 12 modules in the assignment were implemented (registration, approval,
categories, referrals, payments, status, facilities, rewards, withdrawals,
transactions, reports, notifications).

## 4. Tools

React (Vite), Node.js + Express, PostgreSQL, JWT, bcrypt, Git/GitHub,
Vercel (hosting) and Render (database).

## 5. How we worked

We used Git with a `develop` branch and one branch + pull request per task,
testing each feature before merging.

## 6. Challenges

- Getting subscription expiry dates to calculate correctly.
- Fixing facility access (the word "Football" accidentally matched "all").
- Setting up deployment on Vercel with the database on Render.

We solved each of these and tested again.

## 7. Conclusion

The system works and meets the requirements. In the future we could add email
notifications, online payment, and automated tests.
