# 02_EXPLORE.md

# Jejak Puncak — Explore Product Specification

**Version:** 1.0  
**Status:** Production Ready

> Referensi:
> - 00_GLOBAL.md
> - 01_PRD.md
> - 03_VISUAL_DIRECTION.md
> - 04_DESIGN_SYSTEM.md

---

# 1. Business Goal

Halaman Explore membantu pengguna menemukan gunung yang paling sesuai melalui pencarian, filter, dan eksplorasi visual.

---

# 2. User Goal

Pengguna dapat:

- menemukan gunung sesuai preferensi;
- membandingkan beberapa opsi;
- membuka halaman detail dengan percaya diri.

---

# 3. Success Metrics

Primary

- Mountain Detail Click Rate
- Filter Usage Rate

Secondary

- Search Usage
- Compare Click
- Wishlist Add

---

# 4. Entry Points

- Homepage
- Search Engine
- Jejak Finder
- Shared Link
- Navigation

---

# 5. Exit Points

- Mountain Detail
- Compare
- Wishlist
- Passport

---

# 6. Information Hierarchy

1. Search
2. Filter
3. Result Count
4. Mountain Grid
5. Pagination / Infinite Scroll

---

# 7. Layout Blueprint

Desktop

```
Header

Search Bar

Filter Sidebar | Mountain Grid

Footer
```

Mobile

```
Header

Search

Filter Button

Mountain Grid

Bottom Navigation
```

---

# 8. Section Specifications

## Search Bar

### Purpose

Memungkinkan pencarian cepat berdasarkan nama gunung.

### Components

- Search Input
- Clear Button
- Search Icon

### UX Rules

- Debounce 300 ms
- Pencarian tidak case-sensitive
- Hasil diperbarui tanpa reload

### Analytics

- search_started
- search_completed

---

## Filter Sidebar

### Purpose

Menyaring gunung sesuai preferensi.

### Components

- Province
- Island
- Difficulty
- Duration
- Elevation
- Beginner Friendly
- Camping
- Sunrise
- Clear All

### UX Rules

- Multi-select
- URL menyimpan state filter
- Filter aktif selalu terlihat

### Responsive

Desktop:
Sidebar tetap.

Mobile:
Bottom Sheet.

### Analytics

- filter_open
- filter_apply
- filter_reset

---

## Sort

Pilihan:

- Recommended
- Highest Elevation
- Lowest Elevation
- Beginner Friendly
- Popular

Default:
Recommended

---

## Result Summary

Menampilkan:

- jumlah hasil
- filter aktif
- tombol reset

---

## Mountain Grid

### Purpose

Menampilkan daftar gunung.

### Component

MountainCard

Isi kartu:

- Hero Image
- Name
- Province
- Elevation
- Difficulty
- Duration
- Beginner Badge
- Wishlist
- Compare
- CTA Detail

### Rules

- Maksimal 3 badge
- Foto sebagai fokus utama
- Tinggi kartu konsisten

### Motion

- Lift
- Image Zoom
- Soft Shadow

### Analytics

- mountain_card_click
- wishlist_click
- compare_click

---

## Pagination

Gunakan infinite scroll dengan lazy loading.

Sediakan tombol "Kembali ke Atas".

---

# 9. Component Tree

ExplorePage
├── Header
├── SearchBar
├── FilterSidebar
├── SortDropdown
├── ResultSummary
├── MountainGrid
│   └── MountainCard
├── InfiniteLoader
└── Footer

---

# 10. UX Rules

- Pengguna tidak kehilangan konteks saat memfilter.
- Search selalu berada di bagian atas.
- Perubahan filter terasa instan.
- Card mudah dipindai dalam beberapa detik.

---

# 11. Motion

- Filter sheet slide-up
- Card hover
- Skeleton fade
- Smooth list transition

---

# 12. Responsive Behavior

Mobile

- Single column
- Bottom Sheet filter

Tablet

- Dua kolom

Desktop

- Tiga hingga empat kolom
- Sidebar filter

---

# 13. AI Behavior

AI tidak memberikan rekomendasi baru di halaman Explore.

AI hanya dapat membantu:

- menjelaskan alasan label "Recommended";
- menampilkan ringkasan singkat bila pengguna berasal dari Jejak Finder.

AI tidak boleh mengubah urutan hasil tanpa aturan pada PRD.

---

# 14. SEO

Title:
Jelajahi Gunung Indonesia | Jejak Puncak

Meta Description:
Temukan gunung berdasarkan lokasi, tingkat kesulitan, durasi, dan preferensi pendakian.

Schema:

- CollectionPage
- ItemList

---

# 15. Analytics Events

- explore_view
- search_started
- search_completed
- filter_apply
- filter_reset
- sort_changed
- mountain_card_click
- wishlist_click
- compare_click
- infinite_scroll_load

---

# 16. Empty States

## Tidak Ada Hasil

Tampilkan:

- ilustrasi
- pesan yang jelas
- tombol "Reset Filter"

---

# 17. Loading States

- Skeleton Mountain Card
- Progressive Image
- Infinite Loading Indicator

---

# 18. Error States

Pesan:

"Gagal memuat daftar gunung."

CTA:

- Coba Lagi

---

# 19. Accessibility

- Seluruh filter dapat diakses keyboard
- Search memiliki label
- Badge tidak hanya dibedakan oleh warna
- Focus state terlihat jelas

---

# 20. Acceptance Criteria

Halaman Explore dianggap selesai jika:

- pencarian responsif;
- filter bekerja tanpa reload;
- URL menyimpan state filter;
- Mountain Card mengikuti Design System;
- mobile-first;
- analytics aktif;
- memenuhi aturan pada 00_GLOBAL.md.
