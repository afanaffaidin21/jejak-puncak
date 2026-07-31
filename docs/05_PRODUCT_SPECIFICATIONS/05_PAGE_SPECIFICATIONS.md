# 05_PAGE_SPECIFICATIONS.md

# Jejak Puncak — Page Specifications

**Version:** 1.0  
**Status:** Locked  
**Purpose:** Mendefinisikan spesifikasi setiap halaman MVP agar implementasi UI dan engineering konsisten.

> Dokumen ini harus digunakan bersama:
>
> - 01_PRD.md
> - 03_VISUAL_DIRECTION.md
> - 04_DESIGN_SYSTEM.md

---

# Global Rules

Semua halaman wajib memiliki:

- Page Goal
- Primary CTA
- Secondary CTA (jika relevan)
- Empty State
- Loading State
- Error State
- Responsive Layout
- Accessibility

---

# 1. Homepage

## Goal

Memperkenalkan Jejak Puncak dan mendorong user mencoba Jejak Finder.

## Sections

1. Header
2. Hero
3. Why Jejak Puncak
4. Jejak Finder Highlight
5. Popular Mountains
6. Interactive Map Preview
7. Beginner Collections
8. Compare Feature Preview
9. Passport Preview
10. FAQ
11. Footer

## Primary CTA

Temukan Gunung yang Cocok

## Secondary CTA

Jelajahi Gunung

---

# 2. Explore

## Goal

Membantu user menemukan gunung.

## Layout

Left:
- Filter (desktop)

Top:
- Search
- Sort

Main:
- Mountain Grid

## Filters

- Province
- Difficulty
- Duration
- Elevation
- Beginner Friendly
- Camping
- Sunrise

## Card Actions

- Detail
- Compare
- Save

---

# 3. Mountain Detail

## Goal

Membantu user memutuskan apakah gunung sesuai.

## Sections

1. Hero Image
2. Quick Facts
3. AI Mountain Fit
4. Overview
5. Route Information
6. Facilities
7. Best Season
8. Gallery
9. Similar Mountains
10. FAQ

## Primary CTA

Simpan ke Wishlist

## Secondary CTA

Bandingkan

---

# 4. Jejak Finder

## Goal

Memberikan rekomendasi gunung personal.

## Flow

Welcome

↓

Quiz

↓

Processing

↓

Recommendation

## Quiz

Step 1
- Experience

Step 2
- Fitness

Step 3
- Available Days

Step 4
- Region

Step 5
- Goal

Step 6
- Budget

## Result Page

Menampilkan maksimal 3 rekomendasi.

Setiap hasil wajib memiliki:

- Match Score
- AI Recommendation Explanation
- Key Reasons
- Trade-offs
- Difficulty
- Duration
- CTA Detail
- CTA Wishlist

---

# 5. Compare

## Goal

Membandingkan maksimal tiga gunung.

## Layout

Comparison Table

↓

AI Comparison Summary

↓

Recommendation

↓

CTA Detail

---

# 6. Interactive Map

## Goal

Eksplorasi gunung berdasarkan wilayah.

## Layout

Map

+

Bottom Sheet (mobile)

Side Panel (desktop)

## Marker

Click

↓

Preview

↓

Detail

---

# 7. Passport

## Goal

Menampilkan progres pendakian.

## Sections

Profile Summary

Statistics

Completed Mountains

Wishlist

Progress Map

---

# 8. Profile

Sections

- Personal Info
- Hiking Preference
- Account

---

# 9. Login

Simple login.

Provider:

- Google

Future:

- Magic Link

---

# Shared Components

Homepage

- Hero
- MountainCard
- SectionTitle

Explore

- FilterSidebar
- SearchBar
- MountainGrid

Finder

- QuizStepper
- ResultCard

Detail

- QuickFactCard
- AIRecommendationCard

Compare

- CompareTable
- CompareSummaryCard

Passport

- StatisticCard
- ProgressMap

---

# Shared States

Loading

- Skeleton

Empty

- Illustration
- CTA

Error

- Friendly Message
- Retry Button

---

# Mobile Rules

Prioritaskan thumb-friendly interaction.

Bottom Navigation aktif.

Filter menggunakan Bottom Sheet.

---

# Desktop Rules

Gunakan grid 12 kolom.

Sidebar hanya jika meningkatkan efisiensi.

---

# Accessibility

Semua CTA dapat diakses keyboard.

Semua gambar memiliki alt text.

Semua form memiliki label.

---

# Definition of Done

Setiap halaman dianggap selesai bila:

- mengikuti Visual Direction;
- menggunakan Design System;
- memiliki semua state;
- memiliki CTA jelas;
- responsif;
- memenuhi accessibility dasar;
- tidak menyimpang dari PRD.
