# 03_MOUNTAIN_DETAIL.md

# Jejak Puncak — Mountain Detail Product Specification

**Version:** 1.0  
**Status:** Production Ready

> Referensi:
> - 00_GLOBAL.md
> - 01_PRD.md
> - 03_VISUAL_DIRECTION.md
> - 04_DESIGN_SYSTEM.md

---

# 1. Business Goal

Memberikan seluruh informasi yang dibutuhkan pengguna agar dapat memutuskan apakah suatu gunung cocok untuk didaki.

---

# 2. User Goal

Setelah membuka halaman ini, pengguna dapat:

- memahami karakteristik gunung;
- mengetahui tingkat kesulitan;
- memilih jalur pendakian;
- memutuskan untuk menyimpan ke Wishlist atau membandingkan dengan gunung lain.

---

# 3. Success Metrics

Primary

- Wishlist Add Rate
- Compare Click Rate

Secondary

- Route Section View
- Similar Mountain Click
- Finder Entry Click

---

# 4. Entry Points

- Explore
- Jejak Finder
- Compare
- Interactive Map
- Search Engine
- Shared Link

---

# 5. Exit Points

- Wishlist
- Compare
- Explore
- Similar Mountain
- Passport (setelah login)

---

# 6. Information Hierarchy

1. Hero
2. Quick Facts
3. AI Mountain Fit
4. Overview
5. Routes
6. Facilities
7. Best Season
8. Gallery
9. Similar Mountains
10. FAQ

---

# 7. Layout Blueprint

Desktop

```
Header

Hero

Quick Facts

Main Content
├── Overview
├── Routes
├── Facilities
├── Gallery
└── FAQ

Sidebar
├── Wishlist
├── Compare
└── Quick Summary

Footer
```

Mobile

```
Header
Hero
Quick Facts
Content
Sticky Bottom CTA
```

---

# 8. Section Specifications

## Hero

### Purpose

Memberikan kesan pertama yang kuat.

### Components

- Hero Image
- Mountain Name
- Province
- Elevation
- Difficulty Badge
- Primary CTA
- Secondary CTA

### UX Rules

- Hero image menjadi fokus visual.
- Informasi utama terlihat tanpa scroll.

---

## Quick Facts

### Components

- Elevation
- Duration
- Difficulty
- Best Season
- Beginner Friendly
- Camping Availability

Gunakan card ringkas yang mudah dipindai.

---

## AI Mountain Fit

### Purpose

Menjelaskan kecocokan gunung berdasarkan data.

### Components

- Match Summary
- Strengths
- Trade-offs
- CTA ke Jejak Finder

### AI Rules

AI:

- hanya menjelaskan data terstruktur;
- tidak mengubah skor;
- tidak menambahkan fakta baru.

---

## Overview

Berisi:

- deskripsi gunung;
- karakter pendakian;
- highlight unik.

---

## Routes

Untuk setiap jalur tampilkan:

- Nama Jalur
- Estimasi Waktu
- Jarak
- Elevation Gain
- Tingkat Kesulitan
- Starting Point
- Fasilitas

---

## Facilities

Contoh:

- Camping Area
- Water Source
- Toilet
- Parking
- Basecamp

---

## Best Season

Menampilkan:

- periode terbaik;
- catatan singkat;
- kondisi umum.

---

## Gallery

Grid foto.

Klik gambar membuka lightbox.

---

## Similar Mountains

Menampilkan maksimal 4 rekomendasi.

Setiap card:

- Image
- Name
- Province
- Difficulty
- CTA

---

## FAQ

Accordion.

Pertanyaan umum mengenai gunung.

---

# 9. Component Tree

MountainDetailPage
├── Header
├── Hero
├── QuickFacts
├── AIMountainFitCard
├── Overview
├── RouteSection
├── Facilities
├── BestSeason
├── Gallery
├── SimilarMountainGrid
├── FAQ
└── Footer

---

# 10. UX Rules

- CTA Wishlist selalu mudah ditemukan.
- Informasi penting berada di atas fold.
- Hindari paragraf terlalu panjang.
- Gunakan visual sebagai pendukung keputusan.

---

# 11. Motion

- Hero image fade
- Gallery zoom
- Card hover
- Accordion transition

---

# 12. Responsive Behavior

Mobile

- Sticky Bottom CTA
- Single-column layout
- Gallery swipe

Tablet

- Dua kolom terbatas

Desktop

- Sidebar ringkas
- Konten utama lebih lebar

---

# 13. AI Behavior

AI digunakan hanya pada section "Mountain Fit".

Output wajib mencakup:

- Ringkasan kecocokan
- Alasan utama
- Trade-offs

AI dilarang:

- memberikan skor baru;
- mengubah data gunung;
- memberikan jaminan keselamatan.

---

# 14. SEO

Title

{Nama Gunung} | Jejak Puncak

Meta Description

Ringkasan gunung, jalur pendakian, tingkat kesulitan, dan informasi penting.

Schema

- TouristAttraction
- FAQPage
- BreadcrumbList

---

# 15. Analytics

- mountain_detail_view
- wishlist_click
- compare_click
- route_expand
- gallery_open
- similar_mountain_click
- finder_cta_click

---

# 16. Empty States

Gallery

- Placeholder image

Routes

- Informasi belum tersedia

Similar Mountains

- Sembunyikan section bila kosong

---

# 17. Loading States

- Skeleton Hero
- Skeleton Facts
- Skeleton Gallery

---

# 18. Error States

Pesan:

"Informasi gunung tidak dapat dimuat."

CTA

- Coba Lagi
- Kembali ke Explore

---

# 19. Accessibility

- Semua gambar memiliki alt text.
- Accordion dapat diakses keyboard.
- CTA memiliki focus state.
- Heading hierarchy benar.

---

# 20. Acceptance Criteria

Halaman dianggap selesai jika:

- seluruh informasi utama tersedia;
- AI Mountain Fit mengikuti AI Specification;
- Wishlist dan Compare berfungsi;
- responsif di semua ukuran layar;
- memenuhi aturan pada 00_GLOBAL.md.
