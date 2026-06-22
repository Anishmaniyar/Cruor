# VitalDrops Frontend Structure (MVP)

## What is VitalDrops?

VitalDrops is a blood donation and hospital blood inventory management platform.

The platform connects:

* Donors
* Hospitals

and helps manage:

* Appointments
* Blood Donation Campaigns
* Donations
* Blood Inventory
* Blood Unit Tracking
* Blood Requests
* Blood Transfers

---

# Public Pages

## Landing Page

Route

```text
/
```

Purpose

```text
Introduce VitalDrops
Explain platform
Allow login/signup
```

APIs

```text
None
```

---

## Login Page

Route

```text
/auth/login
```

APIs

```text
POST /api/auth/login
```

---

## Register Page

Route

```text
/auth/register
```

APIs

```text
POST /api/auth/register
```

---

# Donor Portal

Base Route

```text
/portal
```

---

## Dashboard

Route

```text
/portal/dashboard
```

Purpose

```text
Overview of donor activity
```

Show

```text
Total Donations

Last Donation

Upcoming Appointment

Upcoming Campaign

Notifications
```

APIs

```text
GET /api/users/me

GET /api/donations/my

GET /api/appointments/my

GET /api/notifications
```

---

## My Profile

Route

```text
/portal/profile
```

APIs

```text
GET /api/users/me

PATCH /api/users/me

PATCH /api/users/change-password
```

---

# Appointment Module

## My Appointments

Route

```text
/portal/appointments
```

APIs

```text
GET /api/appointments/my
```

---

## Appointment Details

Route

```text
/portal/appointments/[id]
```

APIs

```text
GET /api/appointments/:id

PATCH /api/appointments/:id/cancel
```

---

## Book Appointment

Route

```text
/portal/appointments/book
```

APIs

```text
POST /api/appointments
```

---

# Campaign Module

## Campaign Listing

Route

```text
/portal/campaigns
```

APIs

```text
GET /api/campaigns
```

---

## Campaign Details

Route

```text
/portal/campaigns/[id]
```

APIs

```text
GET /api/campaigns/:id

POST /api/campaigns/:id/register
```

---

## My Campaign Registrations

Route

```text
/portal/my-registrations
```

APIs

```text
GET /api/campaigns/my-registrations
```

---

# Donation Module

## My Donations

Route

```text
/portal/donations
```

APIs

```text
GET /api/donations/my

GET /api/donations/history
```

---

## Donation Details

Route

```text
/portal/donations/[id]
```

APIs

```text
GET /api/donations/:id
```

---

## Download Certificate

Route

```text
/portal/donations/[id]/certificate
```

APIs

```text
GET /api/donations/:id/certificate
```

---

# Notifications

## Notifications Page

Route

```text
/portal/notifications
```

APIs

```text
GET /api/notifications

PATCH /api/notifications/:id/read

PATCH /api/notifications/read-all
```

---

# Hospital Portal

Base Route

```text
/hospital
```

---

## Hospital Dashboard

Route

```text
/hospital/dashboard
```

Show

```text
Total Blood Units

Pending Requests

Active Campaigns

Low Stock Alerts

Recent Transfers
```

APIs

```text
GET /api/inventory

GET /api/requests/open

GET /api/reports/inventory
```

---

## Hospital Profile

Route

```text
/hospital/profile
```

APIs

```text
GET /api/hospitals/me

PATCH /api/hospitals/me

PATCH /api/hospitals/change-password
```

---

# Appointment Management

## View Appointments

Route

```text
/hospital/appointments
```

APIs

```text
GET /api/hospital/appointments
```

---

## Appointment Details

Route

```text
/hospital/appointments/[id]
```

APIs

```text
GET /api/appointments/:id

PATCH /api/appointments/:id/confirm

PATCH /api/appointments/:id/reject

PATCH /api/appointments/:id/complete
```

---

# Campaign Management

## Campaign List

Route

```text
/hospital/campaigns
```

APIs

```text
GET /api/campaigns
```

---

## Create Campaign

Route

```text
/hospital/campaigns/create
```

APIs

```text
POST /api/campaigns
```

---

## Campaign Details

Route

```text
/hospital/campaigns/[id]
```

APIs

```text
GET /api/campaigns/:id

PATCH /api/campaigns/:id

PATCH /api/campaigns/:id/cancel

PATCH /api/campaigns/:id/complete
```

---

## Campaign Registrations

Route

```text
/hospital/campaigns/[id]/registrations
```

APIs

```text
GET /api/campaigns/:id/registrations
```

---

# Donation Management

## Donations

Route

```text
/hospital/donations
```

APIs

```text
GET /api/hospital/donations
```

---

## Donation Details

Route

```text
/hospital/donations/[id]
```

APIs

```text
GET /api/donations/:id

PATCH /api/donations/:id/reject

PATCH /api/donations/:id/complete
```

---

# Blood Unit Management

## Blood Units

Route

```text
/hospital/blood-units
```

APIs

```text
GET /api/blood-units
```

---

## Blood Unit Details

Route

```text
/hospital/blood-units/[id]
```

APIs

```text
GET /api/blood-units/:id
```

---

## Verification

Route

```text
/hospital/blood-units/[id]/verify
```

APIs

```text
PATCH /api/blood-units/:id/verify

GET /api/blood-units/:id/verifications
```

---

## Tracking

Route

```text
/hospital/blood-units/[id]/tracking
```

APIs

```text
GET /api/blood-units/:id/journey

GET /api/blood-units/:id/events
```

---

# Inventory

## Inventory Dashboard

Route

```text
/hospital/inventory
```

APIs

```text
GET /api/inventory

GET /api/inventory/low-stock

GET /api/inventory/expiring

GET /api/inventory/blood-groups

GET /api/inventory/components
```

---

# Blood Requests

## Requests

Route

```text
/hospital/requests
```

APIs

```text
GET /api/requests/open

GET /api/requests/my
```

---

## Create Request

Route

```text
/hospital/requests/create
```

APIs

```text
POST /api/requests
```

---

## Request Details

Route

```text
/hospital/requests/[id]
```

APIs

```text
GET /api/requests/:id

PATCH /api/requests/:id/accept

PATCH /api/requests/:id/reject

PATCH /api/requests/:id/cancel
```

---

# Blood Transfers

## Transfers

Route

```text
/hospital/transfers
```

APIs

```text
GET /api/transfers/history
```

---

## Transfer Details

Route

```text
/hospital/transfers/[id]
```

APIs

```text
GET /api/transfers/:id

PATCH /api/transfers/:id/approve

PATCH /api/transfers/:id/in-transit

PATCH /api/transfers/:id/delivered
```

---

# Reports

## Reports Dashboard

Route

```text
/hospital/reports
```

APIs

```text
GET /api/reports/donations

GET /api/reports/campaigns

GET /api/reports/inventory

GET /api/reports/requests

GET /api/reports/transfers
```
