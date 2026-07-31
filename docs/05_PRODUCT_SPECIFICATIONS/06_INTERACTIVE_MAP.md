# 06_INTERACTIVE_MAP.md

# Jejak Puncak — Interactive Map Product Specification

**Version:** 1.0  
**Status:** Production Ready

> Referensi:
> - 00_GLOBAL.md
> - 01_PRD.md
> - 03_VISUAL_DIRECTION.md
> - 04_DESIGN_SYSTEM.md

---

# 1. Business Goal

Menyediakan cara eksplorasi visual berbasis peta sehingga pengguna dapat menemukan gunung berdasarkan wilayah geografis, bukan hanya melalui pencarian atau filter.

---

# 2. User Goal

Pengguna dapat:

- melihat persebaran gunung di Indonesia;
- menemukan gunung di wilayah tertentu;
- membuka detail gunung langsung dari peta.

---

# 3. Success Metrics

Primary

- Map Interaction Rate
- Mountain Detail Click Rate

Secondary

- Marker Click Rate
- Region Filter Usage
- Wishlist Add Rate

---

# 4. Entry Points

- Homepage
- Explore
- Navigation
- Shared Link

---

# 5. Exit Points

- Mountain Detail
- Wishlist
- Compare
- Explore

---

# 6. User Flow

Open Map

↓

Pan / Zoom

↓

Select Marker

↓

Preview Card

↓

Mountain Detail

---

# 7. Layout Blueprint

## Desktop

```
Header

Map (70%)

Sidebar (30%)

Footer
```

Sidebar berisi preview gunung yang dipilih.

## Mobile

```
Header

Full Screen Map

Bottom Sheet Preview

Sticky Bottom Navigation
```

---

# 8. Section Specifications

## Interactive Map

### Purpose

Menampilkan seluruh gunung dalam bentuk marker.

### Components

- Map
- Zoom Controls
- Region Filter
- Reset View
- User Location (Future)
- Legend

### UX Rules

- Marker mudah diklik.
- Zoom tidak menghilangkan konteks.
- Peta menjadi fokus utama.

---

## Region Filter

### Components

- Island
- Province

Filter memperbarui marker tanpa reload.

---

## Marker

### Components

- Marker Icon
- Hover State (Desktop)
- Active State

Click marker membuka Preview Card.

---

## Preview Card

### Components

- Hero Image
- Mountain Name
- Province
- Elevation
- Difficulty
- Match Badge (jika berasal dari Finder)
- CTA Detail
- CTA Wishlist

Desktop:
Sidebar.

Mobile:
Bottom Sheet.

---

## Legend

Menjelaskan arti warna atau ikon marker bila digunakan.

---

# 9. Component Tree

InteractiveMapPage
├── Header
├── MapContainer
├── RegionFilter
├── MarkerLayer
├── PreviewCard
├── Legend
└── Footer

---

# 10. UX Rules

- Peta selalu responsif.
- Preview tidak menutupi area penting.
- Marker aktif terlihat jelas.
- Perubahan filter berlangsung instan.

---

# 11. Motion

- Marker pop animation
- Bottom sheet slide-up
- Sidebar fade
- Smooth map transition

---

# 12. Responsive Behavior

## Mobile

- Full-screen map
- Bottom sheet
- Gesture-friendly

## Tablet

- Map dominan
- Floating preview

## Desktop

- Split layout
- Sidebar tetap

---

# 13. AI Behavior

Halaman ini tidak menggunakan AI sebagai fitur utama.

Jika pengguna datang dari Jejak Finder, sistem hanya menampilkan badge atau konteks rekomendasi tanpa mengubah isi peta.

---

# 14. SEO

Title

Peta Gunung Indonesia | Jejak Puncak

Meta Description

Jelajahi gunung di Indonesia melalui peta interaktif dan temukan tujuan pendakian berikutnya.

Schema

- WebPage

---

# 15. Analytics

- map_view
- marker_click
- preview_open
- detail_click
- wishlist_click
- filter_region
- reset_map

---

# 16. Empty States

Tidak ada marker:

- tampilkan pesan
- tombol Reset Filter

---

# 17. Loading States

- Skeleton sidebar
- Progressive marker loading
- Map loading indicator

---

# 18. Error States

Pesan:

"Peta tidak dapat dimuat."

CTA

- Coba Lagi
- Kembali ke Explore

---

# 19. Accessibility

- Seluruh kontrol dapat diakses keyboard.
- Marker memiliki label untuk screen reader.
- Preview card memiliki heading yang benar.
- Kontras mengikuti WCAG AA.

---

# 20. Acceptance Criteria

Halaman dianggap selesai jika:

- marker tampil akurat;
- filter bekerja tanpa reload;
- preview card membuka detail dengan benar;
- responsif di mobile, tablet, dan desktop;
- memenuhi aturan pada 00_GLOBAL.md.
