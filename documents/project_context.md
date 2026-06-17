# STOCKUP PROJECT CONTEXT

## Project Overview

StockUp adalah platform B2B Supplier Discovery dan RFQ (Request for Quotation) Management yang membantu bisnis Food & Beverage menemukan supplier yang relevan, membandingkan penawaran, dan membangun hubungan bisnis dengan supplier terpercaya.

Tagline:

Smarter Sourcing Discovery Platform for Food Businesses & Beverage.

StockUp bukan marketplace.

StockUp tidak memproses transaksi pembayaran antara buyer dan supplier.

StockUp berfokus pada:

* Supplier Discovery
* Supplier Verification
* RFQ Management
* Quotation Comparison
* Supplier Reputation
* Procurement Intelligence

Target validasi awal adalah wilayah Yogyakarta dengan desain sistem yang siap diperluas ke seluruh Indonesia.

---

# Product Vision

Menjadi platform utama supplier discovery dan procurement intelligence bagi bisnis Food & Beverage di Indonesia.

---

# Product Mission

Membantu bisnis F&B menemukan supplier yang tepat lebih cepat, lebih transparan, dan lebih efisien dibanding metode tradisional seperti WhatsApp, grup komunitas, atau rekomendasi personal.

---

# Primary User Roles

## Buyer

Pemilik atau pengelola bisnis F&B yang mencari supplier.

Kemampuan utama:

* Registrasi akun
* Membuat RFQ
* Mengelola RFQ
* Melihat quotation
* Membandingkan quotation
* Mengakses supplier directory

---

## Supplier

Pelaku usaha yang menawarkan produk atau layanan kepada buyer.

Kemampuan utama:

* Registrasi supplier
* Pengajuan verifikasi
* Mengelola profil supplier
* Menerima RFQ berdasarkan kategori
* Mengirim quotation

---

## Administrator

Pengelola platform.

Kemampuan utama:

* Verifikasi supplier
* Manajemen kategori supplier
* Monitoring RFQ
* Monitoring aktivitas sistem

---

# Access Control

Sistem menggunakan RBAC (Role-Based Access Control).

Role:

* Buyer
* Supplier
* Admin

Permission harus dibangun berdasarkan role.

Tidak ada role Super Admin pada versi saat ini.

Satu akun hanya boleh memiliki satu role (Single Role System).

Multi-role tidak diperbolehkan.

---

# Core Business Rules

## RFQ Distribution

Supplier hanya dapat menerima RFQ yang sesuai dengan kategori supplier yang dimiliki.

Contoh:

Supplier kategori:

* Biji Kopi
* Susu

Maka supplier hanya menerima RFQ yang terkait kategori tersebut.

RFQ dari kategori lain tidak boleh ditampilkan.

---

## Supplier Verification

Supplier harus melalui proses verifikasi sebelum dapat mengakses fitur tertentu yang memerlukan status supplier aktif.

Status verifikasi:

* Pending
* Verified
* Rejected

---

## Quotation Rules

Untuk MVP:

* Satu supplier hanya boleh mengirim satu quotation untuk satu RFQ.
* Quotation yang sudah dikirim tidak dapat diubah.
* Buyer dapat membandingkan quotation.
* Sistem tidak memilih supplier secara otomatis.

Keputusan tetap berada pada buyer.

---

# Business Model

## Supplier Free

* Registrasi Supplier
* Profil Supplier
* Menerima RFQ
* Mengirim Quotation terbatas
* Tampil pada Direktori Supplier

---

## Supplier Pro

* Verified Pro Badge
* Prioritas tampil di hasil pencarian
* Unlimited RFQ Participation
* Dashboard Procurement Analytics Premium
* Dashboard Statistik Penjualan Premium

---

## Buyer Free

* Registrasi Buyer
* Supplier Discovery
* RFQ Terbatas per Hari
* Perbandingan Quotation

---

## Buyer Pro

* Unlimited RFQ
* RFQ Priority Placement
* Procurement Intelligence
* Analytics Premium

---

# Notification System

Gunakan dua jenis notifikasi:

## In-App Notification

Digunakan untuk:

* RFQ baru
* Quotation baru
* Status verifikasi supplier
* Aktivitas sistem penting

## Email Notification

Digunakan untuk:

* Registrasi akun
* Verifikasi supplier
* RFQ baru
* Quotation baru
* Aktivitas penting lainnya

---

# Technical Architecture

## Architecture Style

Modular Monolith

Frontend dan backend dipisahkan.

Komunikasi menggunakan REST API.

---

## Frontend Stack

* React.js
* TypeScript
* React Router
* Axios
* Modern Component Architecture

---

## Backend Stack

* Node.js
* NestJS
* TypeScript
* REST API Architecture

---

## Database

* MySQL
* Prisma ORM

---

## Authentication

Gunakan:

* JWT Access Token
* Refresh Token

Jangan menggunakan Session-Based Authentication.

---

## File Storage

Gunakan cloud storage yang memiliki free tier dan cocok untuk startup awal.

Rekomendasi:

* Cloudinary

Digunakan untuk:

* Dokumen verifikasi supplier
* Logo supplier
* Foto profil supplier

---

## Email Service

Gunakan:

* Resend

Jangan menggunakan SMTP tradisional kecuali ada kebutuhan khusus.

---

## Deployment

Frontend:

* Vercel

Backend:

* VPS
* Docker

Database:

* MySQL pada VPS

---

# Audit Log Requirements

Aktivitas berikut wajib dicatat:

* Login Admin
* Verifikasi Supplier
* Penolakan Supplier
* Pembuatan RFQ
* Pengiriman Quotation
* Perubahan Subscription
* Aktivitas Administratif Penting

Audit log harus dapat ditelusuri oleh administrator.

---

# Development Principles

1. Prioritaskan maintainability dibanding optimisasi prematur.

2. Ikuti prinsip Clean Architecture dan Separation of Concerns.

3. Hindari over-engineering.

4. Selalu desain dengan mempertimbangkan roadmap versi berikutnya.

5. Semua keputusan arsitektur harus mempertimbangkan skalabilitas menuju produk startup nyata.

6. Selalu gunakan pendekatan production-ready meskipun fitur masih MVP.

---

# Documentation Rules For Claude

Saat membantu pengembangan proyek ini:

1. Selalu jelaskan alasan teknis di balik rekomendasi yang diberikan.

2. Selalu mempertimbangkan dampak perubahan terhadap roadmap versi berikutnya.

3. Selalu memberikan struktur folder dan arsitektur yang konsisten dengan Modular Monolith.

4. Selalu menyebutkan trade-off jika terdapat lebih dari satu pendekatan implementasi.

5. Jangan membuat asumsi bisnis baru tanpa menjelaskan dan meminta validasi terlebih dahulu.

---

# Code Generation Rules For Claude

Saat menghasilkan kode:

1. Gunakan TypeScript.

2. Gunakan praktik terbaik NestJS.

3. Gunakan praktik terbaik React.

4. Gunakan Prisma ORM.

5. Berikan komentar kode yang jelas menggunakan Bahasa Indonesia.

6. Fokus pada readability dan maintainability.

7. Hindari magic number dan hardcoded value.

8. Pisahkan business logic dari controller dan UI layer.

9. Tulis kode seolah akan dipelihara oleh tim lain di masa depan.

---

# Development Reporting Rules For Claude

Setelah menyelesaikan suatu task development, Claude wajib memberikan ringkasan pekerjaan yang telah dilakukan.

Format laporan:

## Ringkasan Pekerjaan

### Yang Dibuat

* ...

### Yang Diubah

* ...

### Dampak Ke Sistem

* ...

### Catatan Teknis

* ...

### Langkah Selanjutnya yang Direkomendasikan

* ...

Tujuan laporan ini adalah menjaga dokumentasi perkembangan proyek dan mempermudah kolaborasi tim.
