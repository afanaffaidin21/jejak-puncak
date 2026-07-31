# 01_HOMEPAGE.md

# Jejak Puncak — Homepage Product Specification

**Version:** 1.0  
**Status:** Production Ready

> Referensi:
> - 00_GLOBAL.md
> - 01_PRD.md
> - 03_VISUAL_DIRECTION.md
> - 04_DESIGN_SYSTEM.md

---

# 1. Business Goal

Homepage adalah halaman dengan traffic terbesar dan bertugas mengubah pengunjung menjadi pengguna yang:

- mencoba Jejak Finder;
- menjelajahi gunung;
- membuat akun.

Homepage **bukan** katalog seluruh fitur.

---

# 2. User Goal

Setelah 10–15 detik pertama, pengguna harus memahami:

- apa itu Jejak Puncak;
- manfaatnya;
- tindakan pertama yang harus dilakukan.

---

# 3. Success Metrics

Primary:
- Hero CTA Click Rate
- Finder Start Rate

Secondary:
- Explore Click
- Scroll Depth
- Account Sign Up

---

# 4. Entry Points

- Google Search
- Social Media
- Direct URL
- Shared Link

---

# 5. Exit Points

- Jejak Finder
- Explore
- Mountain Detail
- Login

---

# 6. Information Hierarchy

1. Hero
2. Jejak Finder
3. Popular Mountains
4. Interactive Map
5. Passport
6. FAQ
7. Footer

---

# 7. Scroll Flow

Header
↓
Hero
↓
Value Proposition
↓
Finder Highlight
↓
Popular Mountains
↓
Map Preview
↓
Collections / Beginner Picks
↓
Passport Preview
↓
FAQ
↓
Footer

---

# 8. Layout Blueprint

## Header

Components:
- Logo
- Explore
- Map
- Compare
- Finder
- Passport
- Login/Profile

Rules:
- Sticky after scroll
- Transparent over hero
- Solid background after scroll

---

## Hero

### Purpose

Membangun rasa ingin menjelajah sekaligus mengarahkan pengguna ke Jejak Finder.

### Layout

Left:
- Eyebrow
- Headline
- Supporting Copy
- Primary CTA
- Secondary CTA

Right:
- Cinematic mountain photography

### Content Rules

Headline maksimal 2 baris.

Supporting copy maksimal 3 baris.

Primary CTA:
**Temukan Gunung yang Cocok**

Secondary CTA:
**Jelajahi Gunung**

### Visual Rules

- Full-width hero
- Large immersive image
- Natural gradient overlay
- Visible CTA without scrolling

---

## Value Proposition

3–4 benefit cards.

Contoh:

- Rekomendasi Personal
- Data Pendakian Terpercaya
- Bandingkan Gunung
- Passport Pendakian

---

## Jejak Finder Highlight

### Purpose

Menjelaskan cara kerja Finder.

Flow:

Jawab Pertanyaan
↓

Analisis
↓

Rekomendasi

CTA:
"Coba Jejak Finder"

---

## Popular Mountains

Grid kartu.

Mountain Card berisi:

- Hero Image
- Nama
- Lokasi
- Elevasi
- Difficulty
- Beginner Badge
- CTA

Maksimal 6 kartu.

---

## Interactive Map Preview

Preview sederhana.

CTA:
Buka Peta

---

## Collections

Kategori cepat:

- Beginner Friendly
- Weekend Hiking
- Sunrise
- Jawa
- Sumatera

---

## Passport Preview

Preview:

- Total gunung
- Completed
- Wishlist

CTA:
Lihat Passport

---

## FAQ

Accordion.

5–8 pertanyaan.

---

## Footer

- Navigasi
- Sosial
- Copyright
- Privacy
- Terms

---

# 9. Component Tree

HomePage
├── Header
├── HeroSection
├── ValueCards
├── FinderHighlight
├── MountainGrid
├── MapPreview
├── CollectionSection
├── PassportPreview
├── FAQ
└── Footer

---

# 10. UX Rules

- Satu primary CTA dominan.
- Hindari paragraf panjang.
- Visual lebih dominan daripada teks.
- Semua section memiliki tujuan jelas.

---

# 11. Motion

Hero:
- Fade-in
- Image parallax ringan

Cards:
- Lift
- Scale 1.02
- Image zoom

Counters:
- Count-up

---

# 12. Responsive Behavior

## Mobile

- Hero stack
- Single-column cards
- Bottom navigation

## Tablet

- Dua kolom

## Desktop

- Tiga hingga empat kolom

---

# 13. AI Behavior

AI tidak menghasilkan konten baru di Homepage.

AI hanya membantu menampilkan preview hasil Finder bila diperlukan di masa depan.

---

# 14. SEO

Title:
Jejak Puncak — Temukan Gunung yang Tepat untuk Pendakian Berikutnya

Meta Description:
Platform untuk menemukan gunung yang sesuai berdasarkan pengalaman, tujuan, dan preferensi pendakian.

Schema:
- Organization
- WebSite

---

# 15. Analytics

Events:

- homepage_view
- hero_primary_cta_click
- hero_secondary_cta_click
- finder_highlight_click
- mountain_card_click
- map_preview_click
- passport_preview_click
- faq_expand

---

# 16. Empty States

Popular Mountains:
Tampilkan placeholder + CTA Explore.

Collections:
Sembunyikan section bila belum ada data.

---

# 17. Loading States

- Skeleton cards
- Progressive hero image
- Lazy loading di bawah fold

---

# 18. Error States

Gunakan pesan yang ramah.

Sediakan tombol:
"Coba Lagi"

---

# 19. Accessibility

- Heading hierarchy benar
- Keyboard navigation
- Alt text pada seluruh gambar
- Focus state jelas

---

# 20. Acceptance Criteria

Homepage dianggap selesai jika:

- Value proposition dipahami dalam <15 detik.
- CTA utama terlihat tanpa scroll.
- LCP < 2.5 detik.
- Mobile-first.
- Mengikuti Visual Direction dan Design System.
- Semua analytics event aktif.
