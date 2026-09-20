# Cruor

Cruor is a blood donation and hospital coordination platform. It connects donors with hospitals and donation campaigns, and gives hospitals workflows for appointments, donations, blood-unit inventory, and inter-hospital blood requests.

> **Status: V1.** Cruor is a functional, modular monolithic application implementing the core domain workflows. It is **not** a production-hardened or distributed system yet. See [Current Implementation Status](#3-current-implementation-status) and [Current Limitations](#25-current-limitations) below.

## Table of Contents

1. [What is Cruor?](#1-what-is-cruor)
2. [Problem](#2-problem)
3. [Current Implementation Status](#3-current-implementation-status)
4. [Core Features](#4-core-features)
5. [System Actors](#5-system-actors)
6. [High-Level Architecture](#6-high-level-architecture)
7. [Request / Backend Flow](#7-request--backend-flow)
8. [Domain Model](#8-domain-model)
9. [Database Schema](#9-database-schema)
10. [Authentication](#10-authentication)
11. [Appointment Workflow](#11-appointment-workflow)
12. [Campaign Workflow](#12-campaign-workflow)
13. [Donation Workflow](#13-donation-workflow)
14. [Blood Inventory](#14-blood-inventory)
15. [Hospital Blood Requests](#15-hospital-blood-requests)
16. [Concurrency and Consistency](#16-concurrency-and-consistency)
17. [API Reference](#17-api-reference)
18. [Backend Engineering Decisions](#18-backend-engineering-decisions)
19. [Security](#19-security)
20. [Validation and Error Handling](#20-validation-and-error-handling)
21. [Testing](#21-testing)
22. [Infrastructure and Observability](#22-infrastructure-and-observability)
23. [Project Structure](#23-project-structure)
24. [Running Locally](#24-running-locally)
25. [Current Limitations](#25-current-limitations)
26. [Future Roadmap](#26-future-roadmap)
27. [Closing](#27-closing)

---

## 1. What is Cruor?

Cruor models the full lifecycle of a blood donation, end to end:

```
Donor → Appointment / Campaign → Donation → Blood Unit → Hospital Inventory → Blood Request → Inter-Hospital Transfer
```

A donor registers and either books a donation appointment directly with a hospital or joins a hospital's donation campaign. Once a donation is recorded, it produces a blood unit that enters that hospital's inventory. From there, hospitals can request blood from one another, and other hospitals can independently respond to that request.

This is the backbone of the system: **a relational backend that models the complete lifecycle from donor → appointment/campaign → donation → blood unit → hospital inventory → inter-hospital blood request and allocation.**

## 2. Problem

Blood donation workflows are naturally fragmented: donor scheduling, campaign management, donation records, unit-level inventory, and cross-hospital blood requests are all related but easy to end up as disconnected processes.

<img width="1942" height="809" alt="image" src="https://github.com/user-attachments/assets/edd9e39e-8498-455a-ac9e-0212d87ad532" />


Cruor brings these steps into a single relational system so that a donation is always traceable back to the appointment or campaign registration that produced it, and a unit of blood in inventory is always traceable back to the donation that created it.

## 3. Current Implementation Status

| Area                       | Status                 |
| --------------------------- | ----------------------- |
| Authentication (donor)      | Implemented             |
| Authentication (hospital)   | Implemented             |
| Donor management            | Implemented             |
| Hospital management         | Implemented             |
| Appointments                | Implemented             |
| Campaigns                   | Implemented             |
| Campaign registrations      | Implemented             |
| Donations                   | Implemented             |
| Blood-unit inventory        | Implemented             |
| Hospital-to-hospital blood requests | Implemented      |
| Inter-hospital allocation   | Basic implementation    |
| Redis / caching             | Not implemented         |
| Background workers          | Not implemented         |
| Notifications                | Not implemented         |
| Advanced observability      | Not implemented         |
| Automated testing            | Not fully implemented   |
| Docker / CI/CD               | Unclear                 |
| Production deployment        | Not completed           |
| AI features                  | Planned                 |

This table is the single source of truth for project maturity — every other section in this document defers to it.

## 4. Core Features

Grouped by actor. Only functionality that is actually implemented is listed here.

### Donor

- Register and authenticate
- Manage blood group and profile
- Book donation appointments with a hospital
- View and cancel appointments
- Discover and register for donation campaigns
- Cancel a campaign registration
- View donation history

### Hospital

- Register and authenticate
- View and manage incoming appointments
- Confirm appointments, mark no-shows, record completed donations
- Create and update donation campaigns
- View campaign registrations
- View donors
- View and manage blood-unit inventory
- Create hospital-to-hospital blood requests
- Respond to (accept/reject) blood requests from other hospitals

## 5. System Actors

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/0ccc9bd1-df03-40fd-9855-0273bb4da8f8" />


Cruor has two authenticated actor types — **donors** and **hospitals** — with distinct permissions and workflows. Blood inventory and blood requests are hospital-owned resources that donors do not interact with directly.

## 6. High-Level Architecture

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/8ee4d42d-fb5b-42f3-a40e-a9b4b3a63e9d" />


Cruor currently follows a **modular monolithic architecture**. The backend is organized into domain-specific modules — authentication, appointments, campaigns, donations, blood units, and blood requests — that all run in a single deployable service and share one PostgreSQL database through Prisma.

This is a deliberate stage-appropriate choice, not a placeholder for something else: the current version is not described as microservices, is not distributed, and does not claim horizontal scalability.

## 7. Request / Backend Flow

```
Client
  │
  ▼
HTTP request
  │
  ▼
Route
  │
  ▼
Controller
  │
  ▼
Service / business logic
  │
  ▼
Prisma
  │
  ▼
PostgreSQL
  │
  ▼
Response
```

A request enters through a route, is handled by a controller, and business logic (validation, state transitions, multi-record writes) lives in a service layer that talks to PostgreSQL through Prisma. Where a workflow touches more than one table — recording a donation and creating its blood unit, for example — the service layer wraps those writes in a single database transaction rather than issuing them as separate, independently-failable calls.

## 8. Domain Model

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/5d89e8d1-c610-4e25-91ab-e983d6e14c30" />


## 9. Database Schema

Cruor uses **PostgreSQL** as the system of record and **Prisma** for schema management and type-safe database access.

```
User
 ├── id
 ├── name
 ├── email
 ├── password
 ├── bloodGroup
 ├── phone
 ├── gender
 └── dateOfBirth

Hospital
 ├── id
 ├── name
 ├── email
 ├── password
 ├── phone
 └── registrationId

Appointment
 ├── id
 ├── userId ────────────► User
 ├── hospitalId ────────► Hospital
 ├── appointmentDate
 └── status

Campaign
 ├── id
 ├── hospitalId ────────► Hospital
 ├── name
 ├── description
 ├── address
 ├── date
 ├── startTime
 ├── endTime
 ├── targetDonors
 └── status

CampaignRegistration
 ├── id
 ├── campaignId ────────► Campaign
 ├── userId ────────────► User
 └── status

Donation
 ├── id
 ├── userId ────────────► User
 ├── hospitalId ────────► Hospital
 ├── appointmentId / registrationId
 ├── donationDate
 └── status

BloodUnit
 ├── id
 ├── hospitalId ────────► Hospital
 ├── donationId ────────► Donation
 ├── bloodGroup
 ├── collectionDate
 ├── expirationDate
 ├── volume
 ├── storageLocation
 └── status

BloodRequest
 ├── id
 ├── requestingHospitalId ► Hospital
 ├── bloodGroup
 ├── quantity
 └── status

BloodRequestResponse
 ├── id
 ├── requestId ─────────► BloodRequest
 ├── hospitalId ────────► Hospital
 └── status
```

> This reflects the current conceptual schema described for the project. Before merging, replace this block with the exact contents of `prisma/schema.prisma` so the README never drifts from the actual database.

### Why `CampaignRegistration` exists

A campaign itself is not a donor participation record — it's the drive. `CampaignRegistration` represents `User + Campaign + registration state`, so a donation resulting from a campaign can reference the specific donor-campaign relationship rather than the campaign in the abstract.

### Why `BloodUnit` is separate from `Donation`

`Donation` represents the donation event. `BloodUnit` represents the physical inventory created from that event. Keeping them separate lets inventory have its own lifecycle (reserved, used, expired, transferred) independent of the donation record that produced it.

### Why `BloodRequestResponse` is separate from `BloodRequest`

A blood request can be visible to multiple hospitals, and each hospital can independently accept or reject it. Storing one shared status on the request itself couldn't represent that, so each hospital's response is its own record tied to the request.

## 10. Authentication

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/91f13a61-0f98-4cd1-b06f-a128100c60f5" />


Donors and hospitals are two separate authenticated actor types with their own register/login/me routes. Login validates credentials, verifies the password, and issues an access token and a refresh token, delivered as HTTP-only cookies. Authenticated requests are identified from these tokens; a refresh route allows renewing an access token without re-entering credentials, and a logout route clears them. Password change and password reset flows exist for account recovery.

Only the mechanisms described above should be treated as implemented — anything beyond this (e.g. multi-factor auth, session revocation lists) is not part of the current version.

## 11. Appointment Workflow

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/f39d43c7-634a-4977-b428-cec4b3aa522d" />


1. A donor books an appointment with a hospital.
2. The hospital confirms the appointment.
3. On the day of the appointment, the hospital either marks the donor a no-show or the donation occurs.
4. Recording the donation is what drives the appointment into its completed state — there is no separate, redundant "complete appointment" step independent of recording the donation itself.
5. An appointment can be cancelled while it is still `BOOKED` or `CONFIRMED`.

## 12. Campaign Workflow

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/e2ce5586-40f6-4d77-b703-f250424257eb" />


The donation endpoint for a campaign takes a **campaign registration ID**, not just a campaign ID. The registration identifies the specific donor's participation in that campaign, so the donation workflow always operates against a concrete donor-campaign relationship rather than the campaign in general.

## 13. Donation Workflow

Donations can be created from two sources: an appointment, or a campaign registration.

<img width="1774" height="887" alt="image" src="https://github.com/user-attachments/assets/b5387676-efe1-48c4-a2f6-470ceae258c9" />


Recording a donation creates the donation record, creates the corresponding blood unit, and updates the source appointment or campaign registration's state. These writes are performed inside a single database transaction, so the workflow cannot leave a donation persisted without its blood unit (or vice versa) if any step fails.

## 14. Blood Inventory

`BloodUnit` is the inventory record. A hospital's "inventory view" is derived by filtering/grouping blood units that belong to that hospital, rather than being stored as a separate aggregate.

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/669701dd-315d-4a9b-9ea2-74c7fb15c88f" />


Each blood unit tracks: owning hospital, source donation, blood group, collection date, expiration date, volume, storage location, and status. Only these fields should be assumed to exist — replace this list with the actual Prisma model if it differs.

## 15. Hospital Blood Requests

This is the most involved workflow in the system — deliberately not modeled as a simple one-to-one "Hospital A asks Hospital B" exchange.

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/61ea874b-de9b-479f-a6b8-7302ce82c51f" />


1. A hospital creates a general `BloodRequest` for a blood group and quantity — it is not addressed to a single hospital.
2. Other hospitals can independently view the request and respond, each producing their own `BloodRequestResponse`.
3. A response of `ACCEPT` acts as an offer; a response of `REJECT` closes that hospital's participation.
4. The requesting hospital chooses one accepted offer.
5. The selected offer leads to inventory allocation / transfer.

Because multiple hospitals can accept the same request independently, the backend has to treat the final allocation as a state transition on the request (moving it out of an open state once an offer is selected) rather than a plain field update — see [Concurrency and Consistency](#16-concurrency-and-consistency).

## 16. Concurrency and Consistency

```
Hospital B ── Accept ──┐
                        │
                        ├──► Same Blood Request
                        │
Hospital C ── Accept ──┘
```

Because a blood request is visible to and can be accepted by multiple hospitals at once, the backend needs to make sure that once the requesting hospital selects one offer, the request cannot also be fulfilled by a second, independently-accepted offer, and that the same inventory isn't allocated twice.

**Current V1 handles the basic accept/select/transfer workflow.** Stronger concurrency guarantees — for example, row-level locking, optimistic concurrency checks, or a formal reservation step at accept-time — are part of future production hardening rather than the current implementation. Cruor does not use distributed locks, Redis-based locking, or any queue-based allocation mechanism at this stage.

## 17. API Reference

| Module | Responsibility |
| --- | --- |
| Auth | Donor/hospital authentication |
| Appointments | Donation appointment lifecycle |
| Campaigns | Hospital campaigns and donor registration |
| Donations | Recording donations |
| Blood Units | Inventory and unit lifecycle |
| Blood Requests | Inter-hospital blood allocation |

### Authentication

```http
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/refresh
POST /api/v1/auth/logout
GET  /api/v1/auth/me
```

Hospital authentication:

```http
POST /api/v1/auth/hospital/register
POST /api/v1/auth/hospital/login
GET  /api/v1/auth/hospital/me
```

### Appointments

```http
POST  /api/v1/appointments
GET   /api/v1/appointments/user
GET   /api/v1/appointments/hospital
GET   /api/v1/appointments/:id

PATCH /api/v1/appointments/:id/cancel
PATCH /api/v1/appointments/:id/confirm
PATCH /api/v1/appointments/:id/no-show
PATCH /api/v1/appointments/:id/complete
```

### Campaigns

```http
POST  /api/v1/campaigns
PATCH /api/v1/campaigns/:id
GET   /api/v1/campaigns
GET   /api/v1/campaigns/:id

POST  /api/v1/campaigns/register
GET   /api/v1/campaigns/registered
PATCH /api/v1/campaigns/registration/:id/cancel
```

### Donations

```http
POST /api/v1/donations/appointment/:appointmentId
POST /api/v1/donations/campaigns/:registrationId

GET  /api/v1/donations/user
GET  /api/v1/donations/:id
GET  /api/v1/donations/hospital
```

### Blood Units

```http
GET   /api/v1/blood-units/hospital
GET   /api/v1/blood-units/inventory
GET   /api/v1/blood-units/:id
PATCH /api/v1/blood-units/:id/status
```

### Blood Requests

> Route names for this module should be filled in from the actual implementation rather than guessed — see the codebase for the current, authoritative set of endpoints.

## 18. Backend Engineering Decisions

| Decision | Reason |
| --- | --- |
| PostgreSQL | Relational domain with strongly connected entities |
| Prisma | Type-safe database access and schema management |
| REST APIs | Clear, resource-oriented backend interface |
| Separate donor/hospital roles | Different capabilities and workflows per actor |
| Appointment state machine | Prevents invalid donation lifecycle transitions |
| `CampaignRegistration` entity | Represents a specific donor's participation independently of the campaign |
| `BloodUnit` as inventory record | Lets inventory be tracked and transitioned independently from the donation event |
| Request/Offer model for blood requests | Allows multiple hospitals to respond to one request instead of a fixed 1:1 exchange |
| Database transactions for the donation workflow | Prevents partial persistence across donation + blood unit + appointment/registration updates |
| API versioning (`/api/v1`) | Gives a boundary for future API evolution |

## 19. Security

| Mechanism | Status |
| --- | --- |
| Password hashing | Implemented |
| Access / refresh token authentication | Implemented |
| HTTP-only cookies | Implemented |
| Password change | Implemented |
| Password reset | Implemented |
| Authorization (donor vs hospital resource ownership) | Implemented |
| Input validation | Implemented (see [Validation and Error Handling](#20-validation-and-error-handling)) |
| Rate limiting | Not implemented |
| CORS / secure headers hardening | Unclear |
| File upload validation | Not implemented |

Only claim beyond this table what the code actually enforces — this section should be updated whenever auth or authorization logic changes.

## 20. Validation and Error Handling

Document the actual mechanism the codebase uses here, for example:

- Whether there is a centralized error-handling middleware
- Whether custom error classes map to HTTP status codes
- Which validation library (if any) validates request bodies
- Whether error responses follow a consistent shape

If any of the above isn't in place yet, state that directly rather than describing an idealized error architecture.

## 21. Testing

Automated testing is **not fully implemented** in the current version. Document any tests that do exist (unit, integration, or end-to-end) here, including how to run them; otherwise this section should stay honest about the gap rather than claim coverage that doesn't exist.

## 22. Infrastructure and Observability

| Component | Status |
| --- | --- |
| PostgreSQL | Implemented |
| Prisma | Implemented |
| Redis | Not implemented |
| Background worker | Not implemented |
| Queue | Not implemented |
| Structured logging | Unclear |
| Metrics | Not implemented |
| Distributed tracing | Not implemented |
| Docker | Unclear |
| CI/CD | Unclear |

## 23. Project Structure

```
cruor/
│
├── client/
│   ├── src/
│   ├── components/
│   └── pages/
│
├── server/
│   └── src/
│       ├── controllers/
│       ├── services/
│       ├── routes/
│       ├── middleware/
│       └── validators/
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── package.json
└── README.md
```

> Replace this tree with the real repository layout before publishing — it should reflect the actual folders in the project, not an idealized structure.

## 24. Running Locally

```bash
git clone <repository-url>
cd cruor

npm install

# configure environment
cp .env.example .env

# run database migrations
npx prisma migrate dev

# start development server
npm run dev
```

> Replace these with the actual scripts defined in `package.json` if they differ.

## 25. Current Limitations

### Current limitations

- Inter-hospital allocation handles the basic accept/select/transfer path, without stronger concurrency guarantees yet.
- No caching layer, background job processing, or notification system.
- Automated test coverage is incomplete.
- Observability (structured logging, metrics, tracing) is not in place.

### Planned improvements

See [Future Roadmap](#26-future-roadmap).

### Not currently required

These are intentionally out of scope for the current stage, not gaps:

- Microservices
- Kubernetes
- Kafka / message brokers
- Service mesh
- Database sharding

## 26. Future Roadmap

### Infrastructure (Planned)

- Redis caching
- Background workers
- Notification service (email / SMS / push)
- Automated expiry processing for blood units
- Advanced observability (logging, metrics, tracing)
- Comprehensive automated testing
- Docker / CI/CD
- Production deployment hardening

### AI (Planned)

- AI blood-demand forecasting
- AI emergency donor matching
- AI donor eligibility assistant
- AI hospital knowledge assistant
- AI inventory optimization

None of the items above are implemented in the current version. They are listed here to describe direction, not current capability.

## 27. Closing

Cruor is being developed as a backend-focused blood donation platform. The current version is centered on building and correctly modeling the core domain workflows — donor and hospital authentication, appointments, campaigns, donations, blood-unit inventory, and inter-hospital blood requests — before layering on additional infrastructure and AI capabilities.

The project is intentionally evolving from a functional modular monolith toward a more production-oriented architecture, with PostgreSQL, transactional workflows, unit-level inventory management, and multi-hospital allocation forming its foundation.
