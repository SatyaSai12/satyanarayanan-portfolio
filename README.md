# Satyanarayanan Rajasekaran — Portfolio & Projects

A recruiter-focused, responsive React portfolio showcasing experience in business analysis, project controls, technology transformation, and project delivery.

**Portfolio:** https://satyanarayanan-portfolio.vercel.app

---

## Featured Project: IntakeHub

**Enterprise Intake & Workflow Automation Platform**

A full-stack application independently designed and developed to demonstrate enterprise request intake, workflow automation, approval governance, API development, and database integration.

- **Live application:** https://satyanarayanan-portfolio.vercel.app/intakehub
- **Backend API:** https://intakehub-api.onrender.com
- **API health check:** https://intakehub-api.onrender.com/api/health
- **Repository:** https://github.com/SatyaSai12/satyanarayanan-portfolio

### Project Overview

IntakeHub demonstrates how enterprise teams can centralise business and technology requests through a structured intake and workflow management platform.

The application combines business process design with full-stack development to support request classification, automated assignment, approval workflows, lifecycle tracking, and audit history.

The project was independently developed as a portfolio demonstration, inspired by enterprise intake and project coordination challenges.

**Note:** IntakeHub is an independent portfolio prototype. It is not an RBC application, does not integrate with RBC systems, and uses fictional demonstration data.

### Key Features

- Centralised request intake with structured validation.
- Rule-based request classification and risk assessment.
- Automated team routing and workload-aware assignment.
- Approval workflows for configured high-priority and security-related requests.
- Request lifecycle and status management.
- PostgreSQL persistence for submitted requests.
- Audit history recording previous values, updated values, timestamps, and change attribution.
- Notifications and simulated email delivery records.
- Analytics dashboards for request volumes, priorities, statuses, and workstream performance.

### Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite |
| Backend | Node.js, Express.js |
| Database | PostgreSQL |
| Database hosting | Neon |
| Frontend deployment | Vercel |
| Backend deployment | Render |
| Version control | Git, GitHub |

### System Architecture

```text
             User
              |
              v
       React + Vite
          Vercel
              |
         REST API
              |
              v
      Node.js + Express
           Render
              |
              v
        PostgreSQL
            Neon
              |
       +------+------+
       |             |
       v             v
    Requests     Audit History
```

### Request Workflow

1. User submits a structured business or technology request.
2. Application validates the submitted information.
3. Triage engine evaluates classification and risk attributes.
4. Assignment engine routes the request to an appropriate team and available member.
5. Requests meeting configured criteria enter the approval process.
6. Users can update request ownership and lifecycle status.
7. Request changes are persisted in PostgreSQL and recorded in audit history.
8. Notifications and simulated email records are generated for relevant events.

### Database Design

The application uses two primary PostgreSQL tables:

**`requests`**
- Request information and business justification.
- Workstream, priority, and target date.
- Assignment and ownership details.
- Approval decisions and workflow status.
- Classification and risk attributes.
- Creation and update timestamps.

**`request_audit_history`**
- Request ID and updated field.
- Previous and new values.
- Change attribution.
- Change timestamp.

Request updates and corresponding audit records are handled within a database transaction to maintain consistency.

### REST API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | API health check |
| GET | `/api/db-test` | Database connectivity check |
| POST | `/api/requests` | Submit a new request |
| GET | `/api/requests` | Retrieve all requests |
| GET | `/api/requests/:id` | Retrieve an individual request |
| PUT | `/api/requests/:id` | Update a request and record changes |
| GET | `/api/audit-history` | Retrieve audit history |
| GET | `/api/audit-history?requestId=ID` | Retrieve history for a specific request |

### Engineering Highlights

- REST API development using Express.js.
- PostgreSQL database integration.
- Environment-based configuration.
- Frontend and backend integration.
- Database transactions and rollback handling.
- Audit logging and change tracking.
- Rule-based workflow automation.
- Automated assignment and approval logic.
- Separate frontend and backend deployments.

### Prototype Limitations

- Email delivery is simulated; no real emails are sent.
- Supporting document handling records selected file names; persistent document storage is not implemented.
- Demonstration users and organisational roles are fictional.
- Production-grade authentication and enterprise identity integration are not implemented.
- No real enterprise system integrations are configured.

---

## Portfolio Website

### Included

- Responsive home, about, experience, projects, skills, and contact sections.
- Interactive project case-study panels.
- Resume PDF linked from the site (`public/resume.pdf`).
- Mobile navigation and responsive layout.
- Portfolio content focused on business analysis, project controls, and technology project delivery.

### Portfolio Technology Stack

React · Vite · CSS · Lucide icons

---

## Run Locally

### Requirements

- Node.js LTS
- npm
- PostgreSQL

### Clone the repository

```bash
git clone https://github.com/SatyaSai12/satyanarayanan-portfolio.git
cd satyanarayanan-portfolio
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file in the project root:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=intakehub
DB_USER=postgres
DB_PASSWORD=your_local_database_password
PORT=5000
```

For a hosted PostgreSQL database, configure `DATABASE_URL` instead of the local database connection settings.

Configure the frontend API URL in `.env.local`:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Never commit database credentials or environment files to GitHub.

### Start the backend

```bash
npm run server
```

Open a second terminal and start the frontend:

```bash
npm run dev
```

Open the local Vite URL and navigate to `/intakehub`.

### Build the production version

```bash
npm run build
npm run preview
```

Vite outputs the production site to `dist/`.

---

## Deployment

### Frontend — Vercel

- Connected to the GitHub repository.
- Build command: `npm run build`.
- Output directory: `dist`.
- Production API configuration: `VITE_API_BASE_URL=https://intakehub-api.onrender.com`.

### Backend — Render

- Node.js web service.
- Start command: `npm run server`.
- Production environment uses `DATABASE_URL` to connect to Neon PostgreSQL.
- The backend exposes REST API endpoints on its deployed service URL.

### Database — Neon

- Hosted PostgreSQL database.
- Stores request records and audit history.
- Uses a production database connection string configured through environment variables.

---

## Publish Changes to GitHub

After making changes:

```bash
git add README.md
git commit -m "Consolidate portfolio and IntakeHub README"
git push origin main
```

If Vercel and Render are connected to the repository, their configured deployments can be triggered by changes pushed to the connected branch.

---

## Personalisation and Security Notes

- Review every achievement and metric for accuracy and be prepared to explain how each was measured.
- Portfolio project summaries intentionally avoid confidential RBC system details, sensitive information, screenshots, and proprietary artefacts.
- Replace `public/resume.pdf` whenever your resume is updated.
- Confirm email and LinkedIn URLs in `src/App.jsx`.
- Only publish project links and code that you are comfortable sharing publicly.
- Never commit `.env` files, passwords, database connection strings, or other credentials.

---

## About

**Satyanarayanan Rajasekaran**

Business Analysis · Project Controls · Technology Project Delivery · Workflow Automation

This portfolio brings together professional experience, project management knowledge, and independently developed technical projects to demonstrate the ability to translate business requirements into practical solutions.