# 04_DESIGN_SYSTEM.md

# Jejak Puncak — Design System

**Version:** 1.0  
**Status:** Locked  
**Purpose:** Menjadi standar visual dan UI untuk seluruh produk Jejak Puncak.

> Dokumen ini harus dibaca bersama `03_VISUAL_DIRECTION.md`. Visual Direction menentukan arah visual, sedangkan Design System menentukan aturan implementasinya.

---

# 1. Design Principles

1. Decision First — setiap komponen membantu pengguna mengambil keputusan.
2. Photography Leads — foto menjadi elemen visual utama.
3. Calm Interface — minim distraksi, banyak whitespace.
4. Mobile First — seluruh komponen dirancang dari ukuran mobile.
5. Consistency Over Creativity — konsisten lebih penting daripada variasi.

---

# 2. Color System

## Brand Palette

| Token | Purpose |
|--------|---------|
| Primary | Aksi utama & CTA |
| Secondary | Aksi pendukung |
| Accent | Highlight rekomendasi |
| Success | Feedback berhasil |
| Warning | Informasi penting |
| Danger | Error |

## Neutral Palette

- Background
- Surface
- Surface Elevated
- Border
- Divider
- Text Primary
- Text Secondary
- Text Muted

> Gunakan semantic color token. Jangan gunakan hex langsung di komponen.

---

# 3. Typography

## Heading

- H1 — Hero
- H2 — Section
- H3 — Card Title
- H4 — Subsection

## Body

- Large
- Default
- Small

## Caption

- Metadata
- Badge
- Label

Rules:

- Maksimal dua font family.
- Gunakan skala tipografi yang konsisten.
- Hindari ALL CAPS untuk paragraf.

---

# 4. Spacing System

Gunakan skala 4pt.

```
4
8
12
16
24
32
40
48
64
80
96
```

Semua margin dan padding harus mengikuti skala ini.

---

# 5. Grid System

## Mobile

- 4 columns

## Tablet

- 8 columns

## Desktop

- 12 columns

Content width harus nyaman dibaca dan tidak memenuhi seluruh layar.

---

# 6. Border Radius

Gunakan radius konsisten:

- Small
- Medium
- Large
- Full

Jangan mencampur radius ekstrem dalam satu halaman.

---

# 7. Elevation & Shadow

Level:

- Flat
- Surface
- Hover
- Floating

Shadow harus lembut dan natural.

---

# 8. Iconography

- Outline style
- Konsisten
- Satu ukuran dasar
- Digunakan untuk memperjelas, bukan menghias

---

# 9. Photography

- Rasio konsisten
- Hero image berkualitas tinggi
- Human presence lebih disukai
- Alt text wajib

---

# 10. Illustration

Gunakan:

- contour line
- elevation chart
- route diagram
- minimal map

Hindari ilustrasi kartun.

---

# 11. Motion System

Hover:

- lift ringan
- image zoom

Transition:

- fade
- slide ringan

Success:

- progress
- counter
- confetti hanya milestone besar

Hormati preferensi reduced motion.

---

# 12. Button System

## Primary

Aksi utama halaman.

## Secondary

Aksi alternatif.

## Ghost

Navigasi ringan.

## Icon Button

Untuk aksi cepat.

Rules:

- Maksimal satu Primary CTA dominan per viewport.
- Disabled state harus jelas.
- Loading state wajib.

---

# 13. Card System

Jenis card:

- Mountain Card
- Collection Card
- Passport Card
- Statistic Card
- Finder Result Card

Semua card memiliki:

- visual utama
- judul
- metadata
- CTA

---

# 14. Form System

Komponen:

- Text Field
- Select
- Radio
- Checkbox
- Slider
- Stepper

Rules:

- Label selalu terlihat.
- Error spesifik.
- Hint opsional.

---

# 15. Navigation

Desktop:

- Top Navigation

Mobile:

- Bottom Navigation

Primary CTA Finder mudah dijangkau.

---

# 16. Empty State

Harus berisi:

- ilustrasi ringan
- penjelasan
- CTA

Tidak boleh halaman kosong.

---

# 17. Loading State

Gunakan:

- Skeleton
- Progressive image

Hindari spinner penuh layar kecuali benar-benar diperlukan.

---

# 18. Error State

Selalu tampilkan:

- penyebab singkat
- tindakan yang bisa dilakukan
- tombol retry bila relevan

---

# 19. Feedback

Success:

- toast
- inline confirmation
- subtle animation

Warning:

- informatif
- tidak mengganggu

---

# 20. Responsive Rules

Semua komponen wajib mendukung:

- Mobile
- Tablet
- Desktop

Konten tidak boleh hanya disembunyikan tanpa alasan UX.

---

# 21. Accessibility

- WCAG AA oriented
- Keyboard accessible
- Focus state jelas
- Kontras memadai
- Semantic HTML

---

# 22. Design Tokens

Gunakan token, bukan nilai langsung.

```
color.primary
color.surface
color.text.primary

space.md

radius.lg

shadow.md

font.heading

motion.fast
```

---

# 23. Component Naming

Gunakan nama domain.

Contoh:

```
MountainCard
FinderResultCard
PassportSummary
CompareTable
ProgressMap
```

Hindari nama generik seperti Card1 atau CustomCard.

---

# 24. AI Design Rules

AI wajib:

- mengikuti Visual Direction
- memakai semantic tokens
- menggunakan komponen yang sudah ada
- menjaga konsistensi spacing
- memprioritaskan mobile

AI dilarang:

- membuat gaya baru tanpa alasan
- mencampur beberapa style UI
- mengubah identitas visual
- menambahkan dekorasi berlebihan

---

# 25. Definition of Done

Design System dianggap selesai jika:

- seluruh halaman menggunakan token yang sama;
- tidak ada hardcoded color;
- seluruh komponen reusable;
- tampilan konsisten di mobile dan desktop;
- AI dapat membangun halaman baru hanya dengan merujuk dokumen ini.
