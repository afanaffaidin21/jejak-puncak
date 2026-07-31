# 05_COMPARE.md

# Jejak Puncak — Compare Product Specification

**Version:** 1.0  
**Status:** Production Ready

> Referensi:
> - 00_GLOBAL.md
> - 01_PRD.md
> - 03_VISUAL_DIRECTION.md
> - 04_DESIGN_SYSTEM.md
> - 08_AI_SPECIFICATION.md

---

# 1. Business Goal

Membantu pengguna membandingkan beberapa gunung secara objektif sehingga lebih mudah menentukan tujuan pendakian.

---

# 2. User Goal

Pengguna dapat:

- melihat perbedaan antar gunung dalam satu layar;
- memahami kelebihan dan trade-off masing-masing;
- memilih gunung yang paling sesuai.

---

# 3. Success Metrics

Primary

- Compare Completion Rate
- Mountain Detail Click Rate

Secondary

- Wishlist Add Rate
- Finder Click Rate

---

# 4. Entry Points

- Explore
- Mountain Detail
- Wishlist
- Jejak Finder

---

# 5. Exit Points

- Mountain Detail
- Wishlist
- Jejak Finder
- Explore

---

# 6. User Flow

Pilih Gunung

↓

Tambah hingga 3 Gunung

↓

Comparison Table

↓

AI Comparison Summary

↓

Pilih Gunung

↓

Mountain Detail / Wishlist

---

# 7. Layout Blueprint

Desktop

```
Header

Selection Bar

Comparison Table

AI Summary

Recommendation CTA

Footer
```

Mobile

```
Header

Selected Mountains

Horizontal Comparison

AI Summary

Sticky CTA
```

---

# 8. Section Specifications

## Selection Bar

### Purpose

Menampilkan gunung yang sedang dibandingkan.

### Components

- Selected Mountain Chips
- Add Mountain
- Remove Mountain
- Clear All

Rules

- Minimal 2 gunung
- Maksimal 3 gunung

---

## Comparison Table

### Purpose

Membandingkan atribut utama secara berdampingan.

### Comparison Attributes

- Hero Image
- Mountain Name
- Province
- Elevation
- Difficulty
- Duration
- Beginner Friendly
- Camping
- Water Source
- Best Season
- Popularity
- Sunrise Rating

Rules

- Gunakan ikon bila membantu pemindaian.
- Highlight nilai terbaik tanpa mengubah fakta.

---

## AI Comparison Summary

### Purpose

Membantu pengguna memahami perbedaan utama.

### Output

- Ringkasan singkat
- Kelebihan masing-masing gunung
- Trade-offs
- Saran berdasarkan karakter pengguna

AI hanya menjelaskan hasil perbandingan yang sudah tersedia.

---

## Recommendation CTA

CTA:

- Lihat Detail
- Simpan ke Wishlist
- Coba Jejak Finder

---

# 9. Component Tree

ComparePage
├── Header
├── SelectionBar
├── ComparisonTable
├── AIComparisonCard
├── ActionSection
└── Footer

---

# 10. UX Rules

- Perbedaan harus mudah dipindai.
- Jangan tampilkan informasi yang sama berulang.
- Atribut terpenting berada di bagian atas.
- Pengguna dapat menghapus atau mengganti gunung tanpa keluar halaman.

---

# 11. Motion

- Smooth table transition
- Card hover
- AI summary fade-in
- Sticky CTA transition

---

# 12. Responsive Behavior

## Mobile

- Horizontal scroll untuk tabel
- Sticky comparison header
- Sticky bottom CTA

## Tablet

- Scrollable comparison table

## Desktop

- Full comparison table
- AI Summary di bawah tabel

---

# 13. AI Behavior

AI digunakan hanya untuk menjelaskan hasil perbandingan.

AI wajib:

- membandingkan berdasarkan data terstruktur;
- menjelaskan kelebihan setiap gunung;
- menyebutkan trade-off;
- tetap netral.

AI tidak boleh:

- mengubah data;
- mengubah ranking;
- mengarang informasi.

---

# 14. SEO

Title

Bandingkan Gunung | Jejak Puncak

Meta Description

Bandingkan beberapa gunung berdasarkan elevasi, durasi, tingkat kesulitan, fasilitas, dan karakteristik pendakian.

Schema

- WebPage

---

# 15. Analytics

- compare_view
- mountain_added
- mountain_removed
- compare_completed
- ai_summary_view
- detail_click
- wishlist_click
- finder_click

---

# 16. Empty States

Belum ada gunung dipilih.

Tampilkan:

- ilustrasi
- penjelasan
- CTA ke Explore

---

# 17. Loading States

- Skeleton comparison table
- Skeleton AI summary
- Progressive image loading

---

# 18. Error States

Pesan:

"Perbandingan tidak dapat dimuat."

CTA:

- Coba Lagi
- Kembali ke Explore

---

# 19. Accessibility

- Seluruh tabel dapat dinavigasi menggunakan keyboard.
- Sticky header tidak menutupi fokus.
- Kontras memenuhi WCAG AA.
- Screen reader dapat membaca setiap kolom dengan jelas.

---

# 20. Acceptance Criteria

Halaman Compare dianggap selesai jika:

- pengguna dapat membandingkan 2–3 gunung;
- seluruh atribut tampil konsisten;
- AI Comparison Summary mengikuti AI Specification;
- semua CTA berfungsi;
- responsif di seluruh ukuran layar;
- memenuhi aturan pada 00_GLOBAL.md.
