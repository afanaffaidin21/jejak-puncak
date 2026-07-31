# 04_JEJAK_FINDER.md

# Jejak Puncak — Jejak Finder Product Specification

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

Membantu pengguna menemukan gunung yang paling sesuai berdasarkan preferensi dan meningkatkan konversi ke halaman detail, wishlist, dan akun.

---

# 2. User Goal

Pengguna dapat:

- mendapatkan rekomendasi personal;
- memahami alasan rekomendasi;
- mengambil keputusan dengan cepat.

---

# 3. Success Metrics

Primary

- Finder Completion Rate
- Recommendation Click Rate

Secondary

- Wishlist Add Rate
- Account Sign Up
- Detail View Rate

---

# 4. Entry Points

- Homepage
- Navigation
- Mountain Detail CTA
- Empty Wishlist

---

# 5. Exit Points

- Mountain Detail
- Wishlist
- Compare
- Explore

---

# 6. User Flow

Welcome

↓

Question 1–6

↓

Processing

↓

Recommendation

↓

Mountain Detail / Wishlist

---

# 7. Layout Blueprint

## Welcome

- Headline
- Short description
- Illustration / Photo
- Primary CTA

## Quiz

- Progress Bar
- Question
- Answer Options
- Back
- Next

## Processing

- Loading Animation
- Friendly Message

## Result

- Match Summary
- Top 3 Recommendations
- AI Recommendation Explanation
- Actions

---

# 8. Question Specifications

## Question 1

Experience

- Beginner
- Intermediate
- Advanced

## Question 2

Fitness

- Low
- Moderate
- High

## Question 3

Available Time

- 1 Day
- 2 Days
- 3+ Days

## Question 4

Preferred Region

- Jawa
- Sumatera
- Bali & Nusa Tenggara
- Kalimantan
- Sulawesi
- Bebas

## Question 5

Main Goal

- Sunrise
- First Summit
- Challenge
- Photography
- Nature

## Question 6

Budget

- Low
- Medium
- Flexible

---

# 9. Result Page

## Match Summary

Menampilkan:

- Top Recommendation
- Match Score
- Difficulty
- Duration

## AI Recommendation Explanation

AI menjelaskan:

- Mengapa gunung ini cocok
- Faktor yang paling berpengaruh
- Trade-offs yang perlu diketahui

## Recommendation Cards

Maksimal 3 kartu.

Setiap kartu berisi:

- Image
- Name
- Province
- Elevation
- Difficulty
- Match Score
- Detail CTA
- Wishlist CTA

---

# 10. Component Tree

FinderPage
├── Welcome
├── QuizStepper
├── QuestionCard
├── ProgressBar
├── Processing
├── MatchSummary
├── AIRecommendationCard
├── RecommendationGrid
└── RecommendationCard

---

# 11. UX Rules

- Satu pertanyaan per layar.
- Progress selalu terlihat.
- Jawaban mudah dipilih dengan satu sentuhan.
- Pengguna dapat kembali ke pertanyaan sebelumnya.
- Waktu penyelesaian ideal kurang dari 2 menit.

---

# 12. Motion

- Smooth page transition
- Progress animation
- Result reveal
- Card hover
- Count-up untuk Match Score

---

# 13. Responsive Behavior

## Mobile

- Full-width question card
- Bottom action buttons
- Swipe-friendly spacing

## Tablet

- Centered layout

## Desktop

- Fixed content width
- Illustration di samping pertanyaan

---

# 14. AI Behavior

AI digunakan hanya setelah proses scoring selesai.

AI wajib:

- menjelaskan hasil berdasarkan data terstruktur;
- menjelaskan alasan utama rekomendasi;
- menyebutkan minimal satu trade-off.

AI tidak boleh:

- mengubah urutan rekomendasi;
- membuat gunung baru;
- mengarang fakta;
- memberikan jaminan keselamatan atau keberhasilan pendakian.

---

# 15. SEO

Halaman dapat diindeks.

Title

Jejak Finder | Temukan Gunung yang Cocok

Meta Description

Temukan rekomendasi gunung berdasarkan pengalaman, tujuan, dan preferensi pendakian.

---

# 16. Analytics

- finder_view
- finder_started
- question_answered
- finder_completed
- recommendation_clicked
- wishlist_clicked
- restart_finder

---

# 17. Empty States

Tidak digunakan pada flow utama.

Jika rekomendasi tidak tersedia:

- tampilkan pesan;
- arahkan ke Explore.

---

# 18. Loading States

Processing Screen:

- Progress indicator
- Friendly loading message
- Skeleton recommendation card (opsional)

---

# 19. Error States

Pesan:

"Rekomendasi tidak dapat diproses."

CTA:

- Coba Lagi
- Kembali ke Explore

---

# 20. Accessibility

- Semua pilihan dapat dipilih menggunakan keyboard.
- Progress memiliki label yang dapat dibaca screen reader.
- Kontras memenuhi WCAG AA.

---

# 21. Acceptance Criteria

Jejak Finder dianggap selesai jika:

- seluruh pertanyaan berjalan berurutan;
- progress tersimpan selama sesi;
- rekomendasi mengikuti hasil scoring pada PRD;
- AI Recommendation Explanation mengikuti AI Specification;
- seluruh CTA berfungsi;
- responsif di mobile, tablet, dan desktop.
