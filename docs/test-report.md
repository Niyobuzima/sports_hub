# Test Cases and Test Report

We tested each feature by hand (using the API and the browser) as we built it.
Below are the main test cases and their results.

| # | Test case | Steps | Expected | Result |
|---|---|---|---|---|
| 1 | Register customer | Submit register form | Account created as "pending" | Pass |
| 2 | Login before approval | Login as pending user | Sent to "waiting for approval" page | Pass |
| 3 | Wrong password | Login with bad password | Error "Invalid email or password" | Pass |
| 4 | Admin approve | Approve a pending user | User can now log in | Pass |
| 5 | Suspend member | Suspend an active user | User blocked, sees suspended page | Pass |
| 6 | Add category | Admin creates a category | Appears in list | Pass |
| 7 | Delete used category | Delete a category in use | Friendly error, not deleted | Pass |
| 8 | Pay 3 months | Pay monthly x3 | Expiry = today + 3 months | Pass |
| 9 | Renew | Pay again | Expiry extended from current expiry | Pass |
| 10 | Membership status | View dashboard | Shows Active / Expiring Soon / Expired correctly | Pass |
| 11 | Referral bonus | Referred member pays | Referrer earns bonus + 100 points | Pass |
| 12 | Reward points | Register + pay | Points added correctly (with multiplier) | Pass |
| 13 | Withdraw below minimum | Withdraw under category limit | Rejected with message | Pass |
| 14 | Withdraw valid | Withdraw allowed amount | Points deducted, recorded | Pass |
| 15 | Facility access | Book a not-included facility | Rejected (403) | Pass |
| 16 | Book allowed facility | Book an included facility | Booked, +10 points | Pass |
| 17 | Reports | Open reports as admin | Correct totals shown | Pass |
| 18 | Non-admin blocked | Open admin API as member | 403 Forbidden | Pass |
| 19 | Notifications | Approve / pay | Notifications appear | Pass |

## Summary

All main test cases passed. Testing was manual (curl + browser). Automated tests
were not added because of time, but could be added later with a tool like Jest.
