# 05_PAGE_SPECIFICATIONS_V2.md

# Jejak Puncak — Page Specifications (V2)

**Version:** 2.0  
**Status:** Production Ready  
**Purpose:** Menjadi blueprint implementasi setiap halaman. Dokumen ini ditujukan untuk designer, developer, dan AI coding assistant.

> Catatan: V2 bersifat living document. Setiap halaman dapat dikembangkan tanpa mengubah struktur global.

---

# Struktur Standar Halaman

Setiap halaman wajib memiliki struktur berikut:

1. Objective
2. Target User
3. Entry Points
4. Exit Points
5. Information Hierarchy
6. Section Specifications
7. Component Tree
8. UX Rules
9. Responsive Behavior
10. Animation Rules
11. Empty / Loading / Error State
12. SEO Requirements
13. Analytics Events
14. Acceptance Criteria

====================================================================
HOMEPAGE
====================================================================

# Objective

Mengubah pengunjung menjadi pengguna yang mencoba Jejak Finder atau mulai menjelajah gunung.

# Target User

- First-time visitor
- Beginner hiker
- Returning user

# Entry Points

- Google Search
- Social Media
- Shared Link
- Direct URL

# Exit Points

- Explore
- Finder
- Detail Mountain
- Login

# Information Hierarchy

1. Hero
2. Finder CTA
3. Popular Mountains
4. Trust
5. Explore
6. Footer

# Section Specifications

## Header

Purpose:
- Navigasi sederhana.

Components:
- Logo
- Explore
- Map
- Compare
- Finder
- Passport
- Login

Sticky setelah scroll.

---

## Hero

Purpose:
Memberikan inspirasi dan CTA.

Components:
- Cinematic photo
- Headline
- Short description
- Primary CTA
- Secondary CTA

UX Rules:
- Headline ≤ 2 baris
- Satu CTA utama
- Hero memenuhi tinggi layar awal

---

## Why Jejak Puncak

Menjelaskan value proposition dalam 3–4 poin.

---

## Finder Highlight

Menjelaskan proses rekomendasi dalam tiga langkah:

Answer → AI Analysis → Recommendation

CTA:
"Coba Jejak Finder"

---

## Popular Mountains

Grid 3–6 kartu.

Setiap kartu:

- Hero image
- Nama
- Lokasi
- Elevasi
- Difficulty
- CTA

---

## Interactive Map Preview

Preview sederhana dengan CTA ke halaman Map.

---

## Passport Preview

Preview statistik dan progres.

CTA:
"Lihat Passport"

---

## FAQ

Accordion.

---

## Footer

Navigasi tambahan.

# Component Tree

HomePage
 ├── Header
 ├── HeroSection
 ├── FinderHighlight
 ├── MountainGrid
 ├── MapPreview
 ├── PassportPreview
 ├── FAQ
 └── Footer

# UX Rules

- Maksimal satu CTA dominan per viewport.
- Gunakan whitespace besar.
- Hindari teks panjang.

# Responsive

Mobile:
- Hero stack
- Grid 1 kolom

Tablet:
- Grid 2 kolom

Desktop:
- Grid 3–4 kolom

# Animation

- Hero fade
- Card hover
- Image zoom
- Counter animation

# States

Loading:
- Skeleton

Empty:
- Hidden section bila tidak ada data

Error:
- Retry

# SEO

Title unik.
Meta description.
Open Graph.
Schema.org bila relevan.

# Analytics

- homepage_view
- hero_cta_click
- finder_cta_click
- mountain_card_click

# Acceptance Criteria

- CTA terlihat tanpa scroll
- CLS rendah
- LCP < 2.5 detik
- Mobile-first

====================================================================
EXPLORE
====================================================================

# Objective

Memudahkan pengguna menemukan gunung yang sesuai.

## Sections

- Search
- Filters
- Sort
- Result Count
- Mountain Grid
- Pagination / Infinite Scroll

## UX Rules

- Filter tidak menghilangkan konteks.
- Search realtime (debounce).
- Hasil selalu menampilkan jumlah item.

## Analytics

- filter_used
- search_used
- mountain_opened

====================================================================
MOUNTAIN DETAIL
====================================================================

# Objective

Memberikan seluruh informasi untuk membantu keputusan.

## Sections

1. Hero
2. Quick Facts
3. AI Mountain Fit
4. Overview
5. Route
6. Facilities
7. Best Season
8. Gallery
9. Similar Mountains
10. FAQ

## AI Behavior

AI hanya menjelaskan kecocokan berdasarkan data terstruktur.

Tidak boleh:

- mengubah skor
- mengarang fakta

Analytics:
- wishlist_click
- compare_click

====================================================================
JEJAK FINDER
====================================================================

# Objective

Menghasilkan rekomendasi personal.

## Flow

Welcome

↓

Question

↓

Processing

↓

Result

## Question Rules

Satu pertanyaan per layar.

Progress selalu terlihat.

Back button tersedia.

## Result

Untuk setiap rekomendasi tampilkan:

- Match Score
- AI Explanation
- Key Reasons
- Trade-offs
- Difficulty
- Duration
- CTA Detail
- Wishlist

Analytics:

- finder_started
- finder_completed
- recommendation_clicked

====================================================================
COMPARE
====================================================================

# Objective

Membandingkan hingga tiga gunung.

## Sections

- Selection
- Comparison Table
- AI Summary
- CTA

Analytics:
- compare_started
- compare_completed

====================================================================
INTERACTIVE MAP
====================================================================

# Objective

Eksplorasi berdasarkan lokasi.

## Sections

- Map
- Marker
- Preview
- Detail

UX

Marker harus mudah disentuh di mobile.

====================================================================
PASSPORT
====================================================================

# Objective

Membangun rasa pencapaian.

## Sections

- Profile
- Statistics
- Completed
- Wishlist
- Progress Map

Analytics

- passport_view
- completed_added

====================================================================
PROFILE
====================================================================

Sections

- Personal
- Preferences
- Account

====================================================================
LOGIN
====================================================================

Google Sign In.

Future:
Magic Link.

====================================================================
GLOBAL ACCEPTANCE
====================================================================

Semua halaman wajib:

- Mengikuti Visual Direction.
- Menggunakan Design System.
- Memiliki Empty, Loading, Error State.
- Mobile-first.
- Keyboard accessible.
- Semantic HTML.
- Menggunakan reusable component.
