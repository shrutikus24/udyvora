# Udyvora

**Discover startups. Find opportunities. Build your future.**

Udyvora is an India-first startup discovery and career platform designed to connect students, freshers, developers, designers, and aspiring professionals with emerging startups and career opportunities.

The platform aims to bring startup discovery, job and internship opportunities, skill-based matching, and professional networking together in one place.

> **Project Status:** In Development

## Vision

Finding opportunities at early-stage startups can be difficult. Udyvora aims to make this easier by creating a centralized platform where people can discover startups, explore relevant opportunities, and connect with the startup ecosystem.

## Key Features

### Implemented
- Premium, responsive landing page.
- Udyvora branding and navigation.
- User registration and login.
- Supabase authentication integration.
- Email verification flow.
- User synchronization between Supabase Auth and PostgreSQL.
- Prisma ORM integration.
- Initial candidate dashboard UI.

### Planned
- Candidate profiles and skill management.
- Startup discovery and startup profiles.
- Job and internship marketplace.
- Skill-based job recommendations.
- Job search and filtering.
- Save jobs and track applications.
- Employer dashboard and startup registration.
- Job posting and applicant management.
- Admin dashboard for startup and job verification.
- External job listing integrations.
- Notifications and application updates.

## Tech Stack

| Category | Technologies |
|---|---|
| Frontend | Next.js, React, TypeScript |
| Styling | Tailwind CSS v4 |
| Backend | Next.js API Routes |
| Authentication | Supabase Auth |
| Database | PostgreSQL |
| ORM | Prisma |
| Deployment | Vercel (planned) |
| Version Control | Git & GitHub |

## Project Structure

```text
launchloop/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── callback/
│   │       └── sync/
│   ├── dashboard/
│   ├── login/
│   ├── signup/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   ├── prisma.ts
│   └── supabase/
│       ├── client.ts
│       └── server.ts
├── prisma/
│   └── schema.prisma
├── proxy.ts
├── public/
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- npm
- PostgreSQL database
- Supabase project

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd launchloop
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="your_database_connection_string"
DIRECT_URL="your_direct_database_connection_string"

NEXT_PUBLIC_SUPABASE_URL="your_supabase_project_url"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="your_supabase_publishable_key"
```

Never commit environment files or expose database credentials and secret keys.

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development Progress

- [x] Project setup and configuration
- [x] Landing page and branding
- [x] Login and signup interfaces
- [x] Supabase authentication
- [x] Email verification flow
- [x] User synchronization with PostgreSQL
- [x] Initial Prisma database schema
- [x] Initial candidate dashboard UI
- [x] Production build verification
- [ ] Candidate profile management
- [ ] Startup discovery
- [ ] Job and internship marketplace
- [ ] Skill-based recommendations
- [ ] Application tracking
- [ ] Employer portal
- [ ] Admin portal
- [ ] External job integrations
- [ ] Testing and deployment

## Project Philosophy

Udyvora is being developed with a focus on:

- Accessibility of startup opportunities.
- A clean and intuitive user experience.
- Reliable authentication and data management.
- Meaningful connections between talent and startups.
- A scalable foundation for future features.

## Disclaimer

Udyvora is an independent project currently under development. Features, integrations, and data sources may change as development progresses.

---

**Built with ambition, curiosity, and code.**  
*Udyvora — Where talent meets opportunity.*