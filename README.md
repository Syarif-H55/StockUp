# StockUp

**Smarter Sourcing Discovery Platform for Food Businesses & Beverage**

StockUp is a B2B platform that connects Food & Beverage businesses (coffee shops, restaurants, catering, culinary SMEs) with verified suppliers through a structured RFQ (Request for Quotation) workflow. Buyers can discover suppliers, send RFQs, compare quotations, and select the best supplier — all in one place.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Monorepo** | npm workspaces |
| **Backend** | NestJS 10.4 (Express), TypeScript |
| **Frontend** | React 18, Vite, TypeScript |
| **Database** | MySQL 8.0 (via Docker) |
| **ORM** | Prisma 5.18 |
| **Auth** | JWT dual-token (access + refresh), bcrypt |
| **Validation** | class-validator + class-transformer (backend), Zod + react-hook-form (frontend) |
| **Real-time** | Socket.IO (WebSocket) |
| **Email** | Resend |
| **File Upload** | Cloudinary |
| **Shared** | `@stockup/shared` (enums, types, constants) |

---

## Project Structure

```
StockUp/
├── apps/
│   ├── backend/          # NestJS REST API
│   │   ├── prisma/       # Schema & migrations
│   │   ├── src/
│   │   │   ├── common/        # Guards, decorators, filters, interceptors
│   │   │   ├── core/          # Database module (Prisma)
│   │   │   └── modules/       # Feature modules (13 modules)
│   │   └── test/              # E2E tests
│   └── frontend/         # React + Vite SPA
│       └── src/          # Components, pages, hooks, utils
├── packages/
│   └── shared/           # Shared enums, types, constants
├── documents/            # PRD, implementation docs
├── docker-compose.yml    # MySQL 8.0 container
└── tsconfig.base.json    # Shared TypeScript config
```

---

## Prerequisites

- **Node.js** 20+
- **npm** 10+
- **Docker Desktop** (for MySQL database)
- **Git**

---

## Getting Started

### 1. Clone Repository

```bash
git clone <repo-url>
cd StockUp
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Copy the example environment file and configure as needed:

```bash
cp .env.example apps/backend/.env
```

Default values in `.env` work for local development. Update Cloudinary and Resend API keys if you need file uploads or email functionality.

### 4. Start Database

```bash
docker compose up -d
```

This starts a MySQL 8.0 container on port 3306 with:
- Database: `stockup_dev`
- User: `stockup_user`
- Password: `stockup_pass`

### 5. Run Database Migrations

```bash
npm run db:migrate
```

### 6. Seed Database

```bash
npm run db:seed
```

This creates:
- Admin account (default: `admin@stockup.id` / `StockUp@Admin2026`)
- 15 F&B supplier categories
- 4 badge definitions (Verified Supplier, Verified Pro, Trusted Supplier, Responsive Supplier)

### 7. Start Development Servers

In two separate terminals:

```bash
# Terminal 1 - Backend (port 3001)
npm run dev:backend

# Terminal 2 - Frontend (port 5173)
npm run dev:frontend
```

### 8. Open Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3001/api

---

## Available Scripts

### Root

| Script | Description |
|--------|-------------|
| `npm run dev:backend` | Start backend in watch mode |
| `npm run dev:frontend` | Start frontend dev server |
| `npm run build` | Build all packages (shared → backend → frontend) |
| `npm run typecheck` | Type-check all packages |
| `npm run lint` | Lint all packages |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:seed` | Seed database |
| `npm run db:studio` | Open Prisma Studio |

### Backend (`apps/backend`)

| Script | Description |
|--------|-------------|
| `npm run build -w apps/backend` | Build backend |
| `npm run test:e2e -w apps/backend` | Run E2E tests |
| `npm run db:generate -w apps/backend` | Generate Prisma client |
| `npm run db:reset -w apps/backend` | Reset database |

### Frontend (`apps/frontend`)

| Script | Description |
|--------|-------------|
| `npm run build -w apps/frontend` | Build frontend for production |
| `npm run preview -w apps/frontend` | Preview production build |

---

## API Overview

The backend exposes **54 REST endpoints** + **1 WebSocket namespace** across 13 modules.

### Authentication Flow

1. Register as **Buyer** or **Supplier** (email verification token generated)
2. Login receives **access token** (15min) in response body + **refresh token** (7d) in HttpOnly cookie
3. All authenticated requests use `Authorization: Bearer <access_token>`
4. When access token expires, call `POST /api/auth/refresh` to get a new one

### Role-Based Access

| Role | Prefix | Access |
|------|--------|--------|
| `BUYER` | `/api/buyers/*`, `/api/rfq` (create/my), `/api/quotations/*/select/*` | Create RFQs, manage quotations |
| `SUPPLIER` | `/api/suppliers/profile`, `/api/rfq/available`, `/api/quotations/my`, `/api/verification` | Receive RFQs, send quotations |
| `ADMIN` | `/api/admin/*`, `/api/verification/pending`, `/api/categories` (CRUD), `/api/badges` (CRUD) | Manage platform |

### WebSocket

Connect to `ws://localhost:3001/notifications?userId=<user_id>` to receive real-time push notifications.

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | `mysql://stockup_user:stockup_pass@localhost:3306/stockup_dev` | MySQL connection string |
| `JWT_ACCESS_SECRET` | — | Secret for signing access tokens |
| `JWT_REFRESH_SECRET` | — | Secret for signing refresh tokens |
| `JWT_ACCESS_EXPIRATION` | `15m` | Access token expiry |
| `JWT_REFRESH_EXPIRATION` | `7d` | Refresh token expiry |
| `PORT` | `3001` | Backend server port |
| `FRONTEND_URL` | `http://localhost:5173` | Allowed CORS origin |
| `CLOUDINARY_*` | — | Cloudinary credentials (optional) |
| `RESEND_API_KEY` | — | Resend API key for emails (optional) |
| `ADMIN_EMAIL` | `admin@stockup.id` | Seed admin email |
| `ADMIN_PASSWORD` | `StockUp@Admin2026` | Seed admin password |

---

## Database

### Models (13)

User → BuyerProfile / SupplierProfile → RFQ → Quotation, Category, Badge, Notification, AuditLog

### Key Constraints

- One supplier = one quotation per RFQ (`@@unique([rfqId, supplierId])`)
- Supplier must be VERIFIED to receive/respond to RFQ
- RFQ statuses: `OPEN` → `CLOSED` (by buyer) or `COMPLETED` (when supplier selected)
- Email verification token generated at registration

---

## Documentation

- `documents/StockUp - PRD.docx.md` — Product Requirements Document v1.3
- `documents/MVP-Backend-Implementation.md` — Backend implementation details & API reference

---

## License

StockUp © 2026 — Private project of TrustEd Company.
