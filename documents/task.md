# StockUp — Project Tasks & Schedule

**Owner Key:** Syarif (Backend/Database) | Raifa (Frontend) | Syarif & Raifa (Testing)

---

## Phase 1: Project Foundation (Week 1)

### Objective
Membangun fondasi proyek monorepo, infrastruktur database MySQL, dan kerangka utama backend NestJS serta frontend React/Vite. Phase ini mencakup setup awal yang diperlukan agar tim dapat memulai pengembangan fitur secara paralel.

**FR Coverage:** — (infrastruktur, tidak terkait FR langsung)

### Implementation Tasks

| # | Task | Owner |
|:-:|------|-------|
| 1.1 | Setup monorepo (npm workspaces, tsconfig.base.json) | Syarif |
| 1.2 | Setup NestJS backend project with modular structure | Syarif |
| 1.3 | Setup React/Vite frontend project with routing | Raifa |
| 1.4 | Setup shared package (`@stockup/shared`) — enums, types, constants | Syarif |
| 1.5 | Setup Docker Compose (MySQL 8.0) | Syarif |
| 1.6 | Setup Prisma schema — User, BuyerProfile, SupplierProfile, Category, SupplierCategory, Rfq, Quotation, Badge, SupplierBadge, Notification, AuditLog, SupplierVerification | Syarif |
| 1.7 | Create database seeder (admin account, 15 F&B categories, 4 badges) | Syarif |
| 1.8 | Setup environment configuration module (`@nestjs/config`) | Syarif |
| 1.9 | Setup global exception filter, validation pipe, response interceptor | Syarif |

### Acceptance Criteria
- Monorepo with 3 packages (`backend`, `frontend`, `shared`) installs without error
- Backend starts on port 3001 and responds to requests
- Frontend starts on port 5173 and displays landing page
- Docker Compose starts MySQL 8.0, Prisma connects and migrates successfully
- Database seeder creates: admin user, 15 F&B categories (Biji Kopi, Susu & Dairy, Tepung & Baking, dll), 4 badges (VERIFIED_SUPPLIER, VERIFIED_PRO, TRUSTED_SUPPLIER, RESPONSIVE_SUPPLIER)
- Shared package exports enums (`UserRole`, `AccountStatus`, `RfqStatus`, `QuotationStatus`, etc.), types, and validation constants consumed by backend and frontend
- Prisma schema covers all 12 entities defined in PRD §7.1

### Verification Steps
1. `npm install` completes without errors
2. `docker compose up -d` starts MySQL container, `docker ps` shows `stockup-mysql` running
3. `npm run db:migrate` creates all tables
4. `npm run db:seed` inserts seed data without errors
5. `npm run dev:backend` starts and `curl http://localhost:3001/api/categories` returns 200 with category list
6. `npm run dev:frontend` starts and browser loads http://localhost:5173
7. `npm run typecheck` passes for all packages
8. Prisma schema matches entity list in PRD §7.1

### Dependencies
- Node.js 20+, Docker Desktop, Git terinstal di lingkungan development
- `docker compose` CLI tersedia

---

## Phase 2: Authentication & Authorization (Week 2)

### Objective
Mengimplementasikan sistem autentikasi JWT dual-token (access + refresh) dan RBAC untuk tiga role (Buyer, Supplier, Admin). Phase ini mencakup registrasi, login, logout, token refresh, serta perlindungan route di frontend.

**FR Coverage:** FR-001, FR-002, FR-003, FR-029, FR-030, FR-031, FR-056

### Implementation Tasks

| # | Task | Owner |
|:-:|------|-------|
| 2.1 | Implement User model + PrismaService (global module) | Syarif |
| 2.2 | Implement JWT authentication (access token 15m + refresh token 7d) | Syarif |
| 2.3 | Implement Passport strategies (JwtStrategy, JwtRefreshStrategy) | Syarif |
| 2.4 | Implement RBAC guards (`RolesGuard`) + decorators (`@Roles`, `@Public`, `@CurrentUser`) | Syarif |
| 2.5 | Implement register buyer (FR-001) & supplier (FR-029) with email verification token generation | Syarif |
| 2.6 | Implement login (FR-002, FR-030, FR-056) — email/password with bcrypt verification | Syarif |
| 2.7 | Implement logout (FR-003, FR-031) — invalidate refresh token | Syarif |
| 2.8 | Implement token refresh + rotation (hash refresh token in DB) | Syarif |
| 2.9 | Frontend: Login page with form validation | Raifa |
| 2.10 | Frontend: Registration pages (buyer + supplier with role-specific fields) | Raifa |
| 2.11 | Frontend: Auth context + protected route wrappers | Raifa |
| 2.12 | Frontend: Axios interceptor (auto-attach token + refresh on 401) | Raifa |

### Acceptance Criteria
- Buyer dapat registrasi dengan email, password, fullName, businessName, phoneNumber, address
- Supplier dapat registrasi dengan data tambahan businessAddress
- Email yang sudah terdaftar ditolak dengan pesan kesalahan (PRD §6.1 Edge Case)
- Login dengan kredensial valid mengembalikan access token (body) + refresh token (HttpOnly cookie)
- Login dengan akun SUSPENDED ditolak (PRD §6.1 Edge Case)
- Akses endpoint tanpa token → 401 Unauthorized
- Akses endpoint dengan role tidak sesuai → 403 Forbidden
- Refresh token yang valid menghasilkan access token baru
- Refresh token hanya dapat digunakan sekali (rotation)
- Frontend: redirect ke halaman masing-masing setelah login sesuai role

### Verification Steps
1. `POST /api/auth/register/buyer` with valid data → 201 + `{ user, accessToken }`
2. `POST /api/auth/register/buyer` with same email → 409 Conflict
3. `POST /api/auth/register/supplier` with valid data → 201
4. `POST /api/auth/login` with valid credentials → 200 + `Set-Cookie: refresh_token=...`
5. `POST /api/auth/login` with wrong password → 401
6. `GET /api/auth/me` with valid Bearer token → 200 with user + profile
7. `GET /api/auth/me` without token → 401
8. `POST /api/auth/refresh` with valid cookie → 200 + new access token
9. `POST /api/auth/refresh` with same cookie twice → second call fails (rotation)
10. Frontend: complete register → login → redirect to dashboard flow

### Dependencies
- **Phase 1** — database schema, Prisma, shared enums

---

## Phase 3: Buyer Module (Week 3)

### Objective
Mengimplementasikan fitur buyer: manajemen profil, pembuatan dan pengelolaan RFQ (Request for Quotation), serta halaman publik utama platform (landing page). Buyer adalah primary user group (PRD §1.3).

**FR Coverage:** FR-004, FR-005, FR-006, FR-007, FR-008, FR-009, FR-010, FR-011, FR-012, FR-013, FR-014

### Implementation Tasks

| # | Task | Owner |
|:-:|------|-------|
| 3.1 | Buyer profile CRUD — GET/PATCH profile (FR-004) | Syarif |
| 3.2 | RFQ create — title, description, categoryId (required, FR-006), quantity, unit, budget, deadlineAt (FR-005, FR-007) | Syarif |
| 3.3 | RFQ distribution logic — filter verified suppliers by category (FR-008) | Syarif |
| 3.4 | RFQ list (buyer) — pagination, filter by status/category (FR-009) | Syarif |
| 3.5 | RFQ detail — include quotations with supplier info (FR-010, FR-013, FR-014) | Syarif |
| 3.6 | RFQ edit — only OPEN status (FR-011) | Syarif |
| 3.7 | RFQ close — change status to CLOSED (FR-012) | Syarif |
| 3.8 | RFQ deadline cron job — auto-close expired RFQs | Syarif |
| 3.9 | RFQ distribution info endpoint — eligible supplier count (FR-039) | Syarif |
| 3.10 | Frontend: Landing page (public, no login required) — hero, features, CTA | Raifa |
| 3.11 | Frontend: Buyer dashboard — overview, recent RFQs, quick actions | Raifa |
| 3.12 | Frontend: Buyer profile page — view/edit form | Raifa |
| 3.13 | Frontend: Create RFQ form — category selector, deadline presets | Raifa |
| 3.14 | Frontend: RFQ list + detail page — status badges, quotation counter | Raifa |

### Acceptance Criteria
- Buyer dapat melihat dan memperbarui profil (businessName, phoneNumber, address)
- Buyer dapat membuat RFQ dengan title, description, categoryId, quantity, unit, budget, deadlineAt
- Setiap RFQ **wajib** memiliki satu kategori (FR-006) — validasi backend
- RFQ terdistribusi ke supplier terverifikasi yang memiliki kategori sesuai (FR-008)
- RFQ yang dibuat tanpa supplier pada kategori tetap tersimpan dengan status OPEN (PRD §6.2 Edge Case)
- Buyer dapat melihat daftar RFQ miliknya (paginated, filterable by status/category)
- Buyer dapat melihat detail RFQ termasuk quotation yang diterima
- Buyer dapat mengedit RFQ yang masih OPEN — RFQ CLOSED/COMPLETED ditolak
- Buyer dapat menutup RFQ → status CLOSED, tidak menerima quotation baru (PRD §6.2 Edge Case)
- RFQ yang melewati deadline otomatis berubah CLOSED via cron job
- Landing page publik dapat diakses tanpa login

### Verification Steps
1. `GET /api/buyers/profile` → buyer profile data
2. `PATCH /api/buyers/profile` with updated fields → profile berubah
3. `POST /api/rfq` with valid data + categoryId → 201, status OPEN
4. `POST /api/rfq` without categoryId → 400 validation error (FR-006)
5. `GET /api/rfq/my` → list RFQ milik buyer
6. `GET /api/rfq/:id` → RFQ detail with category, quotations
7. `PATCH /api/rfq/:id` with updated fields on OPEN RFQ → 200 updated
8. `PATCH /api/rfq/:id` on CLOSED RFQ → 400 error
9. `PATCH /api/rfq/:id/close` → status becomes CLOSED, closedAt set
10. `GET /api/rfq/:id/distribution` → eligibleSupplierCount
11. Frontend: buyer dapat membuat RFQ → melihat di list → mengedit → menutup

### Dependencies
- **Phase 2** — authentication dan role buyer harus sudah berfungsi
- **Phase 1** — database schema dengan model Rfq, BuyerProfile, Category

---

## Phase 4: Supplier Module (Week 4)

### Objective
Mengimplementasikan fitur supplier: manajemen profil, alur verifikasi, integrasi upload dokumen, direktori supplier publik, dan kemampuan melihat RFQ yang sesuai kategori. Supplier adalah secondary user group (PRD §1.3).

**FR Coverage:** FR-021, FR-022, FR-023, FR-024, FR-032, FR-033, FR-034, FR-035, FR-036, FR-037, FR-038, FR-040, FR-041, FR-048, FR-051

### Implementation Tasks

| # | Task | Owner |
|:-:|------|-------|
| 4.1 | Supplier profile CRUD — GET/PATCH profile, businessName, address, phone, description (FR-032) | Syarif |
| 4.2 | Supplier categories — add/remove (FR-036) | Syarif |
| 4.3 | Supplier verification submission — POST with documentUrl (FR-033) | Syarif |
| 4.4 | Supplier verification status — GET my-status (FR-034, FR-035) | Syarif |
| 4.5 | Cloudinary upload integration — document (5MB) & image (2MB) endpoints | Syarif |
| 4.6 | Supplier directory (public) — paginated, search by name/description, filter by category slug (FR-021, FR-022) | Syarif |
| 4.7 | Supplier public profile — include categories, badges, joined date (FR-023, FR-024) | Syarif |
| 4.8 | Available RFQ list for supplier — filter by supplier categories, only OPEN, exclude past deadline (FR-037) | Syarif |
| 4.9 | Available RFQ detail — hide other supplier identities (FR-040, FR-041) | Syarif |
| 4.10 | Supplier dashboard stats — totalQuotations, quotationsThisMonth, selectedQuotations, verificationStatus, badges (FR-051) | Syarif |
| 4.11 | Frontend: Supplier dashboard — stats cards, recent activity | Raifa |
| 4.12 | Frontend: Supplier profile page — view/edit with category selector | Raifa |
| 4.13 | Frontend: Verification form — upload document, show status with timeline | Raifa |
| 4.14 | Frontend: Available RFQ list + detail — show matching category | Raifa |
| 4.15 | Frontend: Supplier directory (public) — search bar, category filter | Raifa |
| 4.16 | Frontend: Supplier public profile — display badges (FR-024, FR-048) | Raifa |

### Acceptance Criteria
- Supplier dapat melihat dan memperbarui profil (businessName, address, phone, description)
- Supplier dapat menambah/menghapus kategori usaha — banyak kategori diperbolehkan
- Supplier dapat mengirim pengajuan verifikasi dengan dokumen yang diupload ke Cloudinary
- Supplier dapat melihat status verifikasi (PENDING/VERIFIED/REJECTED) di dashboard
- Supplier yang sudah memiliki pengajuan PENDING tidak dapat mengirim ulang
- Supplier **terverifikasi** dapat melihat RFQ yang sesuai kategorinya (FR-037, FR-038)
- Supplier **belum terverifikasi** mendapat 403 saat mengakses RFQ (FR-038)
- Supplier hanya melihat RFQ dengan status OPEN dan deadline belum lewat
- Supplier tidak melihat identitas supplier lain pada RFQ yang sama (FR-040)
- Publik dapat mencari supplier (by name/description) dan memfilter by kategori
- Publik dapat melihat profil supplier termasuk badges yang dimiliki (FR-024)
- Supplier dashboard menampilkan: total quotations, quotations (30 hari), selected count, badges, verification status

### Verification Steps
1. `GET /api/suppliers/profile/me` → full profile with categories, badges
2. `PATCH /api/suppliers/profile` → profile berubah
3. `POST /api/suppliers/categories` with categoryIds → categories tersimpan
4. `DELETE /api/suppliers/categories/:catId` → category dihapus
5. `POST /api/verification` with documentUrl → verification PENDING
6. `GET /api/verification/my-status` → status + history
7. `POST /api/verification` again while PENDING → 400 error
8. `POST /api/upload/document` with file → Cloudinary URL returned
9. `GET /api/suppliers/directory?search=kopi&categorySlug=biji-kopi&page=1` → filtered results
10. `GET /api/suppliers/:id` → public profile with badges
11. `GET /api/rfq/available` as VERIFIED supplier → list of OPEN RFQs matching supplier categories
12. `GET /api/rfq/available` as non-VERIFIED supplier → 403 Forbidden
13. `GET /api/rfq/:id` as supplier → detail without other supplier identities
14. `GET /api/suppliers/dashboard` → stats returned
15. Frontend: supplier dapat melalui flow registrasi → pilih kategori → upload dokumen → verifikasi → lihat RFQ

### Dependencies
- **Phase 2** — authentication dan role supplier harus sudah berfungsi
- **Phase 3** — RFQ CRUD harus sudah ada agar supplier bisa melihat RFQ
- **Phase 1** — database schema dengan model SupplierProfile, SupplierVerification, SupplierCategory, Category

---

## Phase 5: Admin Module (Week 5)

### Objective
Mengimplementasikan dashboard dan fitur administratif: verifikasi supplier, manajemen kategori, monitoring RFQ, manajemen akun supplier, audit log, dan infrastruktur badge. Administrator menjaga kualitas data dan kredibilitas platform (PRD §1.3).

**FR Coverage:** FR-057, FR-058, FR-059, FR-060, FR-061, FR-063, FR-064, FR-065, FR-066, FR-067, FR-068, FR-069, FR-070, FR-071, FR-072, FR-073, FR-074, FR-075

### Implementation Tasks

| # | Task | Owner |
|:-:|------|-------|
| 5.1 | Admin verification management — list pending, detail with document, approve/reject with reason (FR-057, FR-058, FR-059, FR-060, FR-061) | Syarif |
| 5.2 | Admin dashboard stats — total users, buyers, suppliers, verifications, RFQs, quotations (FR-074) | Syarif |
| 5.3 | Supplier management — list all, detail with activity, suspend (FR-065), reactivate (FR-066) (FR-063, FR-064) | Syarif |
| 5.4 | Buyer management — list all with RFQ count | Syarif |
| 5.5 | RFQ monitoring — list all RFQs with buyer info, status, quotation count (FR-070, FR-071, FR-072) | Syarif |
| 5.6 | Quotation activity monitoring — quotation list with supplier info (FR-073) | Syarif |
| 5.7 | Category CRUD — create (FR-067), update (FR-068), deactivate (FR-069), activate | Syarif |
| 5.8 | Audit log service — record actions, query by user/entity, list recent (NFR-09) | Syarif |
| 5.9 | Badge infrastructure — create badge, list all, assign to supplier (FR-075) | Syarif |
| 5.10 | Frontend: Admin dashboard — stats cards, pending verifications alert | Raifa |
| 5.11 | Frontend: Verification management — list pending, approve/reject modal with reason | Raifa |
| 5.12 | Frontend: Category management — CRUD table with activate/deactivate toggle | Raifa |
| 5.13 | Frontend: RFQ monitoring — data table with search, status filter, detail view | Raifa |
| 5.14 | Frontend: Supplier management — list, detail, suspend/reactivate with confirmation | Raifa |
| 5.15 | Frontend: Audit log viewer — filterable table with user, action, timestamp | Raifa |
| 5.16 | Frontend: Badge management — create badge form, assign badge to supplier | Raifa |

### Acceptance Criteria
- Admin dapat melihat daftar pengajuan verifikasi dengan status PENDING (FR-057)
- Admin dapat melihat detail verifikasi — data supplier + dokumen (FR-058)
- Admin dapat menyetujui verifikasi → status supplier menjadi VERIFIED (FR-059, FR-061)
- Admin dapat menolak verifikasi dengan alasan opsional → status supplier REJECTED (FR-060, FR-061)
- Admin dapat melihat daftar semua supplier dengan informasi lengkap (FR-063, FR-064)
- Admin dapat menonaktifkan akun supplier (FR-065) dan mengaktifkan kembali (FR-066)
- Admin dapat melihat daftar semua buyer dengan jumlah RFQ
- Admin dapat melihat daftar semua RFQ dengan status, buyer info, quotation count (FR-070, FR-071, FR-072)
- Admin dapat melihat aktivitas quotation (FR-073)
- Admin dapat membuat kategori baru (FR-067), mengupdate (FR-068), menonaktifkan (FR-069)
- Admin dapat melihat statistik dashboard (total users, RFQs, quotations, dll) (FR-074)
- Admin dapat membuat badge dan menetapkannya ke supplier (FR-075)
- Audit log mencatat: login admin, verifikasi, suspend/reactivate, perubahan kategori

### Verification Steps
1. `GET /api/verification/pending` as ADMIN → list pending verifications
2. `GET /api/verification/:id` as ADMIN → detail with supplier info + document
3. `PATCH /api/verification/:id/review` with status APPROVED → supplier profile verificationStatus becomes VERIFIED
4. `PATCH /api/verification/:id/review` with status REJECTED + rejectionReason → supplier becomes REJECTED
5. `GET /api/admin/suppliers` → paginated list with verification status
6. `GET /api/admin/suppliers/:id` → detail with categories, verifications, badges
7. `PATCH /api/admin/suppliers/:id/suspend` → user accountStatus becomes SUSPENDED
8. `PATCH /api/admin/suppliers/:id/reactivate` → user accountStatus becomes ACTIVE
9. `GET /api/admin/rfqs` → list with buyer info, quotation count
10. `GET /api/admin/buyers` → list with RFQ count
11. `POST /api/categories` as ADMIN → category created
12. `PATCH /api/categories/:id/deactivate` → category isActive becomes false
13. `GET /api/admin/dashboard` → all stats returned
14. `POST /api/badges` → badge created
15. `POST /api/badges/assign` with supplierId + badgeId → badge assigned
16. `GET /api/audit-logs` → list with user, action, timestamp

### Dependencies
- **Phase 2** — authentication dan role admin harus sudah berfungsi
- **Phase 4** — supplier verification submission harus sudah ada agar admin bisa mereview
- **Phase 3** — RFQ harus sudah ada agar admin bisa monitoring
- **Phase 1** — database schema dengan model SupplierVerification, AuditLog, Badge, SupplierBadge

---

## Phase 6: RFQ & Quotation Integration (Week 6)

### Objective
Mengimplementasikan alur quotation end-to-end: supplier mengirim penawaran, buyer membandingkan dan memilih supplier, serta sistem notifikasi terpadu (in-app, email, WebSocket). Phase ini juga mencakup kalkulasi badge otomatis, dashboard statistik supplier, dan verifikasi email.

**FR Coverage:** FR-015, FR-016, FR-017, FR-018, FR-019, FR-020, FR-042, FR-043, FR-044, FR-045, FR-046, FR-047, FR-049, FR-050, FR-062, FR-076, FR-077

### Implementation Tasks

| # | Task | Owner |
|:-:|------|-------|
| 6.1 | Quotation submission — price, MOQ, estimatedDeliveryTime, unit, notes (FR-042, FR-043) | Syarif |
| 6.2 | Duplicate quotation prevention — unique (rfqId, supplierId) constraint + check (FR-044) | Syarif |
| 6.3 | Quotation listing (supplier) — paginated, filter by status (FR-045, FR-046) | Syarif |
| 6.4 | Quotation listing (by RFQ) — include supplier profile + badges (FR-013, FR-014, FR-016) | Syarif |
| 6.5 | Quotation comparison — structured view with price range (FR-015) | Syarif |
| 6.6 | Select supplier — update RFQ to COMPLETED, mark selected quotation, mark others NOT_SELECTED (FR-017, FR-018) | Syarif |
| 6.7 | Prevent double selection — if supplier already selected, reject (PRD §6.3 Edge Case) | Syarif |
| 6.8 | Reject quotations after RFQ closed — only OPEN RFQ accepts quotations (PRD §6.3, §7.2.6) | Syarif |
| 6.9 | Event-driven notification wiring — emit events from quotation, RFQ, verification services | Syarif |
| 6.10 | In-app notifications — create notification records for quotation.submitted, rfq.created, verification.approved/rejected (FR-020, FR-047, FR-062) | Syarif |
| 6.11 | Email notifications via Resend — verification result, quotation alert, RFQ alert (FR-062) | Syarif |
| 6.12 | Email verification — POST /api/auth/verify-email endpoint + token generation on registration | Syarif |
| 6.13 | WebSocket gateway — Socket.IO at `/notifications` namespace, room-based push (FR-019) | Syarif |
| 6.14 | Automated badge calculation — cron job (daily) + on-demand (FR-049, FR-050, FR-076, FR-077) | Syarif |
| 6.15 | Badge rules: TRUSTED_SUPPLIER (verified ≥14 days), RESPONSIVE_SUPPLIER (avg response ≤24hr, ≥3 quotations in 30 days) | Syarif |
| 6.16 | Audit log integration — record quotation submission and RFQ completion events | Syarif |
| 6.17 | Frontend: Submit quotation form — price, MOQ, delivery time, notes | Raifa |
| 6.18 | Frontend: Quotation comparison view — side-by-side cards with supplier info, badges | Raifa |
| 6.19 | Frontend: Select supplier flow — confirmation dialog, success feedback | Raifa |
| 6.20 | Frontend: Notification bell + dropdown list — mark read, unread count badge | Raifa |
| 6.21 | Frontend: Sent quotations history (supplier) — table with RFQ title, status, date | Raifa |
| 6.22 | Frontend: WebSocket connection — receive real-time notification push | Raifa |

### Acceptance Criteria
- Supplier **terverifikasi** dapat mengirim quotation untuk RFQ yang OPEN (FR-042)
- Quotation menyimpan: priceOffer (required), unit, minimumOrderQuantity, estimatedDeliveryTime, notes, status (FR-043)
- Supplier **tidak dapat** mengirim lebih dari satu quotation per RFQ → 409 Conflict (FR-044)
- Supplier **tidak dapat** mengirim quotation ke RFQ CLOSED/COMPLETED → 400 (PRD §7.2.6)
- Supplier **tidak dapat** mengirim quotation ke RFQ yang deadline-nya sudah lewat
- Supplier **tidak dapat** mengirim quotation ke RFQ yang kategorinya tidak sesuai dengan kategori supplier
- Supplier dapat melihat riwayat quotation yang dikirim (FR-045) dengan status (FR-046)
- Buyer dapat melihat semua quotation untuk RFQ-nya — include supplier info + badges (FR-013, FR-014, FR-016)
- Buyer dapat membandingkan quotation dalam satu tampilan — price range, supplier side-by-side (FR-015)
- Buyer dapat memilih satu quotation → RFQ status COMPLETED, selectedSupplierId set, quotation SELECTED, others NOT_SELECTED (FR-017, FR-018)
- Buyer memilih supplier dua kali → mempertahankan pilihan pertama (PRD §6.3 Edge Case)
- **Notifikasi:** Buyer mendapat notifikasi + email saat quotation baru (FR-020)
- **Notifikasi:** Supplier mendapat notifikasi + email saat RFQ baru (FR-047)
- **Notifikasi:** Supplier mendapat notifikasi + email saat verifikasi disetujui/ditolak (FR-062)
- **Real-time:** WebSocket mengirim notifikasi ke user yang terhubung (FR-019)
- **Badge Trusted Supplier:** otomatis diberikan ke supplier verified ≥14 hari (FR-050, FR-076)
- **Badge Responsive Supplier:** otomatis diberikan jika rata-rata respon ≤24 jam dan ≥3 quotation dalam 30 hari (FR-049, FR-077)
- **Email verifikasi:** token dikirim saat registrasi, endpoint verifikasi memproses token
- Audit log mencatat: pembuatan quotation, pemilihan supplier

### Verification Steps
1. `POST /api/quotations/rfq/:rfqId` as verified supplier with matching category → 201, quotation created
2. `POST /api/quotations/rfq/:rfqId` by same supplier for same RFQ → 409 Conflict (FR-044)
3. `POST /api/quotations/rfq/:rfqId` for CLOSED RFQ → 400 Bad Request
4. `POST /api/quotations/rfq/:rfqId` for expired deadline → 400 Bad Request
5. `POST /api/quotations/rfq/:rfqId` as non-verified supplier → 403 Forbidden
6. `GET /api/quotations/my` as supplier → paginated list with status
7. `GET /api/quotations/rfq/:rfqId` as buyer → list with supplier info + badges
8. `GET /api/quotations/rfq/:rfqId/comparison` → structured data with price range
9. `POST /api/quotations/rfq/:rfqId/select/:quotationId` as buyer → RFQ COMPLETED
10. Check Notification table: buyer has QUOTATION notification, supplier has RFQ/VERIFICATION notifications
11. Check Email: verification result email sent (check console log if Resend not configured)
12. `POST /api/auth/verify-email` with valid token → emailVerifiedAt set
13. WebSocket: connect to `ws://localhost:3001/notifications?userId=xxx` → receive event on trigger
14. Run `BadgeEvaluatorService.evaluateAllBadges()` → TRUSTED_SUPPLIER and RESPONSIVE_SUPPLIER badges assigned
15. `GET /api/suppliers/dashboard` → stats include badge count

### Dependencies
- **Phase 3** — RFQ CRUD harus sudah ada (buyer membuat RFQ, quotation melekat pada RFQ)
- **Phase 4** — supplier profile + verification harus sudah ada (quotation dikirim oleh supplier terverifikasi)
- **Phase 5** — badge definitions dari seed, audit log service
- **Phase 1** — database schema dengan model Quotation, Notification, SupplierBadge

---

## Phase 7: Testing, Polish & Deployment (Week 7)

### Objective
Memastikan kualitas platform melalui pengujian otomatis, memperbaiki bug, mengoptimalkan performa, konfigurasi keamanan, dan melakukan deployment ke production (Vercel untuk frontend, VPS untuk backend + MySQL).

**FR Coverage:** NFR-01 s.d. NFR-25 (Non-Functional Requirements)

### Implementation Tasks

| # | Task | Owner |
|:-:|------|-------|
| 7.1 | Unit tests — service layer (authentication, RFQ rules, quotation rules, badge evaluation) | Syarif & Raifa |
| 7.2 | E2E tests — register → create RFQ → submit quotation → select supplier (complete workflow) | Syarif & Raifa |
| 7.3 | E2E tests — admin approve verification → supplier sees RFQ | Syarif & Raifa |
| 7.4 | E2E tests — edge cases (duplicate quotation, expired RFQ, suspended account) | Syarif & Raifa |
| 7.5 | Responsive design testing — mobile (360px), tablet, desktop (NFR-18, DR-06) | Raifa |
| 7.6 | Security review — password bcrypt (NFR-06), RBAC enforcement (NFR-07), HTTPS (NFR-05) | Syarif |
| 7.7 | Performance optimization — database indexes, Prisma query optimization (NFR-01, NFR-02) | Syarif |
| 7.8 | Production Docker build — multi-stage for smaller image size | Syarif |
| 7.9 | Vercel deployment (frontend) — connect repo, configure domain, environment variables | Raifa |
| 7.10 | VPS deployment (backend) — Docker, reverse proxy (Nginx/Caddy), PM2 or Docker restart policy | Syarif |
| 7.11 | SSL/TLS configuration — Let's Encrypt, auto-renewal (NFR-05) | Syarif |
| 7.12 | Database backup automation — daily cron, cloud storage upload (NFR-11) | Syarif |
| 7.13 | Monitoring & logging setup — error tracking, uptime monitoring (NFR-10) | Syarif |
| 7.14 | Environment variable audit — ensure no secrets in code, .env in production | Syarif |
| 7.15 | Final QA — regression test all workflows, user acceptance testing | Syarif & Raifa |
| 7.16 | Go-live — DNS configuration, production smoke test, rollback plan | Syarif & Raifa |

### Acceptance Criteria
- Unit tests mencapai minimal 70% coverage untuk service layer (backend)
- E2E tests mencakup 3 workflow utama: Buyer Flow (register → RFQ → compare → select), Supplier Flow (register → verify → quotation), Admin Flow (verify supplier → monitor)
- Semua halaman berfungsi pada lebar layar minimal 360px (DR-06)
- Responsive workflow terverifikasi untuk: registrasi, login, pencarian supplier, pembuatan RFQ, pengiriman quotation, verifikasi supplier (DR-07)
- Password tersimpan dengan bcrypt (cost factor ≥ 12) — tidak ada plaintext di database (NFR-06)
- Hanya pengguna dengan role sesuai yang dapat mengakses endpoint tertentu (NFR-07)
- Dokumen verifikasi supplier hanya dapat diakses oleh admin (NFR-08)
- Semua aktivitas administratif tercatat di audit log (NFR-09)
- HTTPS dengan TLS 1.2+ aktif di production (NFR-05)
- Database backup otomatis berjalan setiap hari (NFR-11)
- Platform memiliki uptime ≥ 99% per bulan (NFR-10)
- Production Docker image dapat dibuild dan dijalankan
- Frontend terdeploy di Vercel dengan domain production
- Backend terdeploy di VPS dengan reverse proxy + SSL

### Verification Steps
1. `npm test` — all unit tests pass
2. `npm run test:e2e` — all E2E tests pass
3. Test manually on mobile viewport (360px) — all 6 workflows from DR-07 function
4. Code review: `SELECT password FROM users` — returns bcrypt hash, not plaintext
5. `GET /api/admin/dashboard` as buyer → 403 Forbidden
6. Access backend via `https://api.stockup.id` → valid SSL certificate
7. `docker build -t stockup-backend .` — image builds successfully
8. Frontend `https://stockup.id` loads and API calls succeed
9. Verify backup file exists in cloud storage
10. Application logs show successful requests and any errors

### Dependencies
- **Phase 1–6** — semua fitur harus sudah selesai dan terintegrasi
- **External:** Domain name, VPS server, Vercel account, Cloudinary account, Resend API key

---

## FR Coverage Summary

| Phase | FR IDs Covered | Count |
|:-----:|---------------|:-----:|
| Phase 1 | — (infrastruktur) | — |
| Phase 2 | FR-001, FR-002, FR-003, FR-029, FR-030, FR-031, FR-056 | 7 |
| Phase 3 | FR-004, FR-005, FR-006, FR-007, FR-008, FR-009, FR-010, FR-011, FR-012, FR-013, FR-014, FR-039 | 12 |
| Phase 4 | FR-021, FR-022, FR-023, FR-024, FR-032, FR-033, FR-034, FR-035, FR-036, FR-037, FR-038, FR-040, FR-041, FR-048, FR-051 | 15 |
| Phase 5 | FR-057, FR-058, FR-059, FR-060, FR-061, FR-063, FR-064, FR-065, FR-066, FR-067, FR-068, FR-069, FR-070, FR-071, FR-072, FR-073, FR-074, FR-075 | 18 |
| Phase 6 | FR-015, FR-016, FR-017, FR-018, FR-019, FR-020, FR-042, FR-043, FR-044, FR-045, FR-046, FR-047, FR-049, FR-050, FR-062, FR-076, FR-077 | 17 |
| Phase 7 | NFR-01 s.d. NFR-25 (Non-Functional) | 25 |
| **Total** | **57 FR + 25 NFR** | **82** |
