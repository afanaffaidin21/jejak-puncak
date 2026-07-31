# 00_GLOBAL.md

# Jejak Puncak — Global Product Specifications

**Version:** 1.0  
**Status:** Locked  
**Purpose:** Menjadi aturan global yang berlaku untuk seluruh halaman pada Jejak Puncak.

> Dokumen ini adalah referensi utama sebelum membaca spesifikasi halaman individual.

---

# 1. Global Objectives

Semua halaman harus membantu pengguna:

- Menemukan gunung yang sesuai.
- Mengambil keputusan dengan percaya diri.
- Menyimpan progres pendakian.
- Kembali menggunakan produk.

---

# 2. Design Principles

- Decision First
- Mobile First
- Photography First
- Progressive Disclosure
- Calm Interface
- Accessibility by Default

---

# 3. Layout Rules

## Grid

- Mobile: 4 kolom
- Tablet: 8 kolom
- Desktop: 12 kolom

## Section

Setiap section mengikuti pola:

1. Headline
2. Supporting Copy (opsional)
3. Content
4. CTA (opsional)

Gunakan whitespace yang lega. Hindari section yang terlalu padat.

---

# 4. Navigation Rules

## Header

Selalu menampilkan:

- Logo
- Explore
- Map
- Compare
- Finder
- Passport
- Login / Profile

Header menjadi sticky setelah pengguna mulai melakukan scroll.

## Footer

Selalu berisi:

- Navigasi sekunder
- Copyright
- Social Media
- Privacy
- Terms

---

# 5. CTA Rules

Setiap viewport maksimal memiliki:

- 1 Primary CTA
- 1 Secondary CTA
- Unlimited Text Links

CTA utama menggunakan semantic primary color.

---

# 6. Card Rules

Semua card mengikuti urutan:

- Visual
- Title
- Metadata
- Action

Card wajib:

- mudah dipindai;
- memiliki hover state (desktop);
- memiliki focus state (keyboard).

---

# 7. Forms

Semua form wajib memiliki:

- Label
- Placeholder bila diperlukan
- Validation
- Error Message
- Success Feedback

Jangan hanya menggunakan placeholder sebagai label.

---

# 8. Shared States

## Loading

- Skeleton
- Progressive Image

## Empty

- Illustration ringan
- Penjelasan singkat
- CTA

## Error

- Pesan ramah
- Retry
- Fallback bila memungkinkan

---

# 9. Motion Rules

Hover:
- 150–200 ms

Transition:
- 250–300 ms

Modal:
- 300 ms

Hormati preferensi **prefers-reduced-motion**.

---

# 10. Responsive Rules

Mobile adalah prioritas.

Aturan umum:

- Hindari horizontal scroll.
- Sidebar berubah menjadi bottom sheet pada mobile.
- CTA utama selalu mudah dijangkau ibu jari.

---

# 11. Accessibility

Semua halaman wajib:

- Semantic HTML
- Keyboard accessible
- Visible focus state
- Alt text untuk gambar
- WCAG AA oriented

---

# 12. SEO Rules

Setiap halaman publik wajib memiliki:

- Unique title
- Meta description
- Open Graph
- Canonical URL
- Structured data bila relevan

---

# 13. Analytics Rules

Minimal event yang harus tersedia:

- page_view
- cta_click
- search
- filter
- wishlist_add
- compare
- finder_start
- finder_complete
- passport_view

Penamaan event menggunakan snake_case.

---

# 14. AI Rules

AI wajib:

- Mengikuti PRD.
- Mengikuti Visual Direction.
- Mengikuti Design System.
- Menggunakan reusable component.
- Menggunakan semantic design tokens.
- Menjaga konsistensi layout.

AI tidak boleh:

- Mengubah struktur navigasi.
- Membuat komponen baru tanpa kebutuhan yang jelas.
- Menggunakan warna di luar Design System.
- Mengubah business flow.
- Mengurangi accessibility.

---

# 15. Component Reuse Policy

Prioritas penggunaan:

1. Reuse component yang sudah ada.
2. Extend component bila diperlukan.
3. Buat component baru hanya jika benar-benar tidak dapat direuse.

---

# 16. Performance Targets

- LCP < 2.5 detik
- CLS < 0.1
- INP < 200 ms

Optimalkan:

- gambar;
- lazy loading;
- font;
- bundle size.

---

# 17. Security Rules

- Validasi input di client dan server.
- Jangan mengekspos secret.
- Gunakan Row Level Security untuk data pengguna.
- Escape seluruh input yang ditampilkan kembali.

---

# 18. Definition of Done

Sebuah halaman dianggap selesai jika:

- Mengikuti PRD.
- Mengikuti Visual Direction.
- Mengikuti Design System.
- Responsif.
- Accessible.
- Menggunakan reusable component.
- Memiliki Loading, Empty, dan Error State.
- Memiliki analytics event.
- Memenuhi target performa.
- Tidak menyimpang dari aturan global pada dokumen ini.
