# Final Project Report

Project: Sports HUB Management System
Group: BBICT Group Four

## Group members

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
