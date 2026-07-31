# 07_PASSPORT.md

# Jejak Puncak — Passport Product Specification

**Version:** 1.0  
**Status:** Production Ready

> Referensi:
> - 00_GLOBAL.md
> - 01_PRD.md
> - 03_VISUAL_DIRECTION.md
> - 04_DESIGN_SYSTEM.md

---

# 1. Business Goal

Meningkatkan retensi dengan memberikan visualisasi progres pendakian yang memotivasi pengguna untuk kembali menggunakan Jejak Puncak.

---

# 2. User Goal

Pengguna dapat:

- melihat riwayat pendakian;
- memantau progres eksplorasi;
- melihat wishlist;
- merasa bangga terhadap pencapaiannya.

---

# 3. Success Metrics

Primary

- Passport View Rate
- Completed Mountain Rate

Secondary

- Wishlist Revisit Rate
- Return User Rate

---

# 4. Entry Points

- Navigation
- Homepage Preview
- Setelah Login
- Setelah Menandai Pendakian Selesai

---

# 5. Exit Points

- Mountain Detail
- Explore
- Jejak Finder

---

# 6. User Flow

Open Passport

↓

Overview

↓

Statistics

↓

Completed Mountains

↓

Wishlist

↓

Mountain Detail

---

# 7. Layout Blueprint

## Desktop

```
Header

Profile Summary

Statistics

Progress Map

Completed Mountains

Wishlist

Footer
```

## Mobile

```
Header

Profile Summary

Statistics

Progress Map

Tabs
├── Completed
└── Wishlist

Bottom Navigation
```

---

# 8. Section Specifications

## Profile Summary

### Purpose

Menampilkan identitas singkat pengguna.

### Components

- Avatar
- Display Name
- Explorer Level (Future)
- Join Date
- Total Mountains

---

## Statistics

### Components

- Completed Mountains
- Wishlist Count
- Highest Elevation
- Total Estimated Hiking Days

Rules

- Gunakan card ringkas.
- Angka menjadi fokus utama.

---

## Progress Map

### Purpose

Menampilkan persebaran gunung yang telah diselesaikan.

### Components

- Indonesia Map
- Completed Markers
- Progress Summary

Rules

- Marker berbeda dengan marker Explore.
- Fokus pada pencapaian pengguna.

---

## Completed Mountains

### Components

- Mountain Card
- Completed Date
- Elevation
- Province
- CTA Detail

Sort Default

- Terbaru

---

## Wishlist

### Components

- Mountain Card
- Difficulty
- Duration
- Remove Wishlist
- CTA Detail

---

# 9. Component Tree

PassportPage
├── Header
├── ProfileSummary
├── StatisticCards
├── ProgressMap
├── CompletedMountainGrid
├── WishlistGrid
└── Footer

---

# 10. UX Rules

- Statistik langsung terlihat di atas fold.
- Progress Map mudah dipahami.
- Completed dan Wishlist mudah berpindah.
- Tidak ada informasi yang berulang.

---

# 11. Motion

- Counter animation
- Progress reveal
- Card hover
- Tab transition

---

# 12. Responsive Behavior

## Mobile

- Statistik 2 kolom
- Tabs untuk Completed & Wishlist
- Sticky Bottom Navigation

## Tablet

- Statistik 4 kolom
- Grid 2 kolom

## Desktop

- Statistik 4 kartu sejajar
- Grid 3 kolom

---

# 13. AI Behavior

MVP tidak menggunakan AI pada Passport.

Di fase berikutnya AI dapat memberikan:

- Journey Summary
- Next Mountain Recommendation

Tanpa mengubah data progres pengguna.

---

# 14. SEO

Passport memerlukan autentikasi dan tidak diindeks oleh mesin pencari.

---

# 15. Analytics

- passport_view
- completed_tab_view
- wishlist_tab_view
- mountain_detail_click
- wishlist_remove
- progress_map_interaction

---

# 16. Empty States

## Completed

Belum ada gunung yang diselesaikan.

CTA

- Jelajahi Gunung

## Wishlist

Wishlist masih kosong.

CTA

- Coba Jejak Finder

---

# 17. Loading States

- Skeleton statistic card
- Skeleton mountain card
- Skeleton progress map

---

# 18. Error States

Pesan

"Data Passport tidak dapat dimuat."

CTA

- Coba Lagi

---

# 19. Accessibility

- Statistik memiliki label yang jelas.
- Tab dapat diakses keyboard.
- Progress Map memiliki alternatif teks.
- Seluruh CTA memiliki focus state.

---

# 20. Acceptance Criteria

Passport dianggap selesai jika:

- statistik tampil akurat;
- Completed dan Wishlist tersinkronisasi dengan database;
- Progress Map menampilkan data pengguna;
- responsif pada seluruh ukuran layar;
- memenuhi aturan pada 00_GLOBAL.md.
