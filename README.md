# GLOBAL VENTURES — Financial Advisory & Business Transaction Brokerage

> **"Where Capital Meets Opportunity."**  
> *Clarity in Finance. Confidence in Every Transaction.*

[![Next.js](https://img.shields.io/badge/Next.js-15.1.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Node.js Tests](https://img.shields.io/badge/Node%20Test%20Runner-11%20Passed-success?style=for-the-badge&logo=node.js)](https://nodejs.org/api/test.html)

A bespoke, production-ready corporate digital platform for **Global Ventures**, an international financial consultancy and business brokerage operating across corporate finance, mergers & acquisitions (M&A), business valuation, and discreet transaction advisory.

---

## Brand Architecture & Visual System

* **Midnight Navy (`#0B1C30` / `#060F1A`):** Dominant ground evoking institutional permanence and fiduciary authority.
* **Champagne Gold (`#C7AA78` / `#E6D7BD`):** Restrained metallic accents reserved for key interaction moments and editorial highlights.
* **Warm Ivory (`#F5F2EC`):** Soft, high-readability background for long-form editorial and financial disclosures.
* **Slate Blue (`#405268`):** Structural borders, card outlines, and secondary metrics.
* **Editorial Typography:** *Cormorant Garamond* (headlines) paired with *Manrope* (technical copy and data metrics).

---

## Core Capabilities & Modules

1. **Transaction & Corporate Advisory Architecture:**
   * **Mergers & Acquisitions:** Buyside/sellside advisory, carve-outs, leveraged buyouts, cross-border structuring.
   * **Corporate Finance:** Debt advisory, capital raising, recapitalizations, financial restructuring.
   * **Defensible Business Valuation:** Discounted Cash Flow (DCF), Guideline Public Company (GPC), Guideline Transaction (GTM), and Asset-Based appraisals adhering to International Valuation Standards (IVS 105).
   * **Transaction Brokerage:** Confidential seller representation, acquisition search, clean exit packaging.

2. **Interactive Valuation Intelligence:**
   * Real-time scenario modeler computing indicative Enterprise Value (EV) and multiple ranges across Technology/SaaS, Healthcare, Manufacturing, E-Commerce, Logistics, and Professional Services.
   * Built-in bridge modeling **Enterprise Value (EV) vs. Equity Value (Net Shareholder Proceeds)** accounting for debt, excess cash, and normalized working capital.

3. **Confidential Mandates Portal:**
   * Dynamic opportunity directory with multi-tier filtering (Sector, Transaction Size, Deal Type, Geography).
   * Detailed transaction profiles with bilateral non-disclosure agreement (NDA) request workflows.

4. **Secure Corporate Lead Architecture:**
   * Five-flow consultation API (`/api/enquiry`) that stores enquiries in PostgreSQL (Prisma Postgres on Vercel).
   * Strict server-side validation, same-origin and content-type checks, and a real 16 KB body limit.
   * Idempotent submissions (`Idempotency-Key` header) so retries and double clicks never create duplicates.
   * Shared Postgres-backed rate limiting (5 per IP per 10 min, 3 per email per hour) with hashed keys.
   * Honeypot and minimum-fill-time bot checks; unique references (`GV-[FLOW]-[10HEX]`).

### Enquiry database

* Schema: `db/migrations/*.sql`, applied in order by `npm run db:migrate` (uses `DATABASE_URL`).
* On Vercel, `vercel-build` runs the migrations before `next build`. Migrations must stay additive.
* At runtime the API uses `DATABASE_URL_POOLED` when present, otherwise `DATABASE_URL`.
* No IP address or user agent is stored with an enquiry.

---

## Tech Stack

* **Framework:** [Next.js 15.1.0](https://nextjs.org/) (App Router, Server Components)
* **Language:** [TypeScript 5](https://www.typescriptlang.org/) (Strict type checking)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) with custom tokens
* **Animations:** [Framer Motion](https://www.framer.com/motion/) with reduced-motion support
* **Icons:** [Lucide React](https://lucide.dev/)
* **Testing:** Native Node.js Test Runner (`node --test`)

---

## Getting Started

### Prerequisites

* Node.js 22+ (LTS), 24, or 26
* npm, pnpm, or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/hameezcam/global-ventures.git
cd global-ventures

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## Quality & Verification Commands

```bash
# Run unit tests (enquiry validation, valuation formulas)
npm test

# Run API integration tests against a DISPOSABLE local Postgres (refuses non-local hosts;
# the tests truncate the enquiry tables)
DATABASE_URL=postgres://user@127.0.0.1:5432/gv_test npm run test:integration

# Run TypeScript compilation check
npx tsc --noEmit

# Run ESLint check
npm run lint

# Build optimized production bundle
npm run build

# Start production server
npm run start
```

---

## Project Structure

```text
global-ventures/
├── db/migrations/              # PostgreSQL schema migrations
├── scripts/                    # migrate.mjs, test-integration.sh
├── src/
│   ├── app/                    # Next.js App Router (28 routes)
│   │   ├── api/enquiry/        # Secure lead submission API
│   │   ├── opportunities/      # Confidential listings directory
│   │   ├── services/           # Service practice areas
│   │   ├── insights/           # Thought leadership & research
│   │   └── ...
│   ├── components/             # Modular React components
│   │   ├── brand/              # GV Logo & Monogram SVGs
│   │   ├── forms/              # Consultation & NDA forms
│   │   ├── home/               # Hero, Corporate Intro, Mandates, Testimonials
│   │   ├── layout/             # Responsive Navbar, Mega-Menu, Footer
│   │   └── shared/             # ValuationCalculator, PageHeader, Cards
│   ├── data/                   # Structured mock data & practice mandates
│   └── lib/                    # db pool, rate limiter, enquiry schema & service
├── tests/                      # Automated test suite (11 unit/integration tests)
└── .env.example                # Documented environment configuration
```

---

## License

Private corporate repository. All rights reserved &copy; Global Ventures Advisory Group.
