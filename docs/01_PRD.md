# JEJAK PUNCAK — PRODUCT REQUIREMENTS DOCUMENT

**Version:** 1.0  
**Status:** Ready for Development  
**Product Type:** Responsive Web Application  
**Primary Market:** Indonesia  
**Primary Language:** Bahasa Indonesia  
**Development Approach:** AI-assisted / Vibe Coding

---

## 1. Product Overview

Jejak Puncak adalah platform digital untuk membantu pengguna menemukan, membandingkan, dan melacak perjalanan mendaki gunung populer di Indonesia.

Produk ini tidak diposisikan sebagai ensiklopedia gunung biasa.

Jejak Puncak adalah experience platform yang membantu pengguna:

1. menemukan gunung yang sesuai dengan kemampuan dan preferensi;
2. memahami karakteristik setiap gunung;
3. membandingkan beberapa pilihan;
4. menyimpan gunung yang ingin didaki;
5. mencatat gunung yang telah diselesaikan;
6. melihat progres perjalanan mendaki secara visual.

---

## 2. Product Vision

Menjadi platform digital yang membantu masyarakat Indonesia memulai dan mengembangkan perjalanan mendaki mereka dengan lebih terarah, personal, dan menyenangkan.

---

## 3. Product Positioning

### Bukan

- portal berita pendakian;
- blog perjalanan;
- direktori gunung statis;
- marketplace perlengkapan;
- aplikasi navigasi GPS;
- forum komunitas.

### Melainkan

> Platform untuk menemukan, membandingkan, dan mencatat perjalanan mendaki gunung di Indonesia.

---

## 4. Problem Statement

Pendaki pemula dan calon pendaki menghadapi beberapa masalah utama:

1. Tidak tahu gunung mana yang sesuai untuk pendakian pertama.
2. Informasi gunung tersebar di berbagai website, video, media sosial, dan forum.
3. Sulit membandingkan tingkat kesulitan, durasi, ketinggian, fasilitas, dan karakter setiap gunung.
4. Informasi yang tersedia sering terlalu teknis atau tidak ramah bagi pemula.
5. Belum banyak platform yang memberikan rekomendasi personal berdasarkan kondisi pengguna.
6. Pendaki tidak memiliki tempat yang menarik untuk mencatat dan memamerkan progres pendakian mereka.

---

## 5. Target Users

### 5.1 Primary User — First Hiker

**Karakteristik:**

- belum pernah mendaki atau baru sekali mendaki;
- berusia sekitar 18–35 tahun;
- lebih sering menggunakan smartphone;
- bingung memilih gunung pertama;
- membutuhkan informasi sederhana dan jelas;
- khawatir terhadap stamina, waktu, biaya, dan tingkat kesulitan.

**Tujuan utama:**

> Menemukan gunung pertama yang realistis dan sesuai dengan kondisi mereka.

### 5.2 Secondary User — Weekend Hiker

**Karakteristik:**

- sudah mendaki beberapa gunung;
- memiliki waktu terbatas;
- mencari destinasi baru;
- ingin membandingkan beberapa gunung;
- tertarik melihat rekomendasi berdasarkan wilayah dan waktu libur.

**Tujuan utama:**

> Menemukan destinasi pendakian berikutnya secara cepat.

### 5.3 Tertiary User — Mountain Collector

**Karakteristik:**

- sudah sering mendaki;
- senang mencatat pencapaian;
- menyukai badge, statistik, dan koleksi;
- aktif membagikan perjalanan ke media sosial.

**Tujuan utama:**

> Mendokumentasikan dan memamerkan progres pendakian.

---

## 6. Core Value Proposition

Jejak Puncak membantu pengguna menjawab tiga pertanyaan utama:

1. Gunung apa yang cocok untuk saya?
2. Apa perbedaan gunung yang sedang saya pertimbangkan?
3. Sejauh apa perjalanan mendaki yang sudah saya selesaikan?

---

## 7. Product Principles

### 7.1 Decision First

Produk harus membantu pengguna mengambil keputusan, bukan hanya menampilkan data.

### 7.2 Beginner Friendly

Informasi harus mudah dipahami oleh orang yang belum familiar dengan istilah pendakian.

### 7.3 Visual First

Informasi penting ditampilkan melalui visual, indikator, peta, kartu, grafik, dan progress.

### 7.4 Mobile First

Semua halaman dan interaction flow harus dirancang mulai dari layar mobile.

### 7.5 Always One Next Step

Setiap halaman harus memiliki tindakan lanjutan yang jelas.

### 7.6 Progress Must Be Visible

Aktivitas pengguna harus menghasilkan perubahan visual pada wishlist, Passport, statistik, atau peta progres.

### 7.7 AI Must Be Explainable

Setiap rekomendasi harus memiliki alasan dan trade-off yang dapat dipahami.

### 7.8 Delight Without Noise

Animasi digunakan untuk memperkuat feedback, bukan sebagai dekorasi berlebihan.

---

## 8. Core Product Loop

```text
Discover
    ↓
Choose
    ↓
Compare
    ↓
Save
    ↓
Hike
    ↓
Mark as Completed
    ↓
Passport Updated
    ↓
Discover Next Mountain
```

Produk harus mendorong pengguna kembali ke awal loop setelah menyelesaikan pendakian.

---

## 9. MVP Objective

MVP harus membuktikan bahwa Jejak Puncak dapat membantu pengguna menemukan gunung yang sesuai dan mulai membangun catatan perjalanan pendakian mereka.

MVP tidak bertujuan menjadi platform pendakian lengkap.

---

## 10. MVP Scope

### 10.1 Included in MVP

#### Public Features

- Homepage
- Explore Mountains
- Search
- Filter
- Mountain Detail
- Jejak Finder
- Compare Mountains
- Interactive Map
- Collections

#### Authenticated Features

- Google Login
- Wishlist
- Mark Mountain as Completed
- Basic Profile
- Jejak Passport
- Basic Statistics
- Progress Map

#### Content Scope

- 12–20 gunung populer
- 1–2 jalur utama per gunung
- data dasar dan atribut rekomendasi
- foto utama
- fasilitas
- durasi
- kesulitan
- musim terbaik
- FAQ dasar

### 10.2 Excluded from MVP

- komunitas;
- komentar;
- review pengguna;
- forum;
- marketplace;
- booking;
- porter atau guide marketplace;
- group hiking;
- leaderboard;
- follower system;
- notifikasi;
- GPS tracking;
- offline map;
- real-time weather;
- packing planner;
- budget planner;
- AI Journey Coach;
- mobile native application;
- admin CMS lengkap.

---

## 11. Product Pillars

### 11.1 Discover

Membantu pengguna menemukan gunung.

**Fitur:**

- Explore
- Search
- Filter
- Collections
- Map
- Jejak Finder

### 11.2 Decide

Membantu pengguna menentukan pilihan.

**Fitur:**

- Mountain Detail
- Compare
- Recommendation Score
- Similar Mountains
- Recommendation Explanation

### 11.3 Journey

Membantu pengguna menyimpan dan mencatat perjalanan.

**Fitur:**

- Wishlist
- Mark as Completed
- Journey History
- Progress Map

### 11.4 Achievement

Memberikan rasa pencapaian.

**Fitur MVP:**

- Passport
- Basic Statistics
- Completion Progress

Badge dan level kompleks bukan bagian dari MVP.

---

## 12. Information Architecture

```text
Home
├── Explore
│   ├── Search Results
│   ├── Collections
│   └── Mountain Detail
├── Jejak Finder
│   ├── Quiz
│   └── Recommendation Result
├── Compare
├── Map
├── Passport
├── Profile
├── Login
├── About
├── FAQ
└── Legal Pages
```

---

## 13. Primary Navigation

### Desktop

- Explore
- Map
- Compare
- Jejak Finder
- Passport
- Profile

### Mobile Bottom Navigation

- Explore
- Map
- Finder
- Passport
- Profile

Jejak Finder menjadi navigation action utama pada mobile.

---

## 14. Key User Flows

### 14.1 First-Time Visitor

```text
Homepage
→ Start Jejak Finder
→ Complete Quiz
→ View Recommendations
→ Open Mountain Detail
→ Save Mountain
→ Login
→ Mountain Added to Wishlist
```

### 14.2 Explore Flow

```text
Explore
→ Search or Apply Filter
→ Select Mountain
→ View Detail
→ Save or Compare
```

### 14.3 Compare Flow

```text
Select Mountain A
→ Select Mountain B
→ View Visual Comparison
→ Read Recommendation Summary
→ Open Selected Mountain
→ Save
```

### 14.4 Completion Flow

```text
Open Saved Mountain
→ Mark as Completed
→ Confirm Completion
→ Passport Updated
→ Statistics Updated
→ Progress Map Updated
```

### 14.5 Returning User

```text
Open Website
→ View Passport Summary
→ See Saved Mountains
→ Continue Exploring
→ Choose Next Mountain
```

---

## 15. Feature Requirements

### 15.1 Homepage

#### Goal

Menjelaskan manfaat Jejak Puncak dan mengarahkan pengguna ke Jejak Finder atau Explore.

#### Required Sections

1. Header
2. Hero
3. Jejak Finder introduction
4. Popular mountains
5. Map preview
6. Beginner collection
7. Compare feature preview
8. Passport preview
9. FAQ
10. Footer

#### Primary CTA

> Temukan Gunung yang Cocok

#### Secondary CTA

> Jelajahi Gunung

---

### 15.2 Explore Mountains

#### Goal

Membantu pengguna menemukan gunung berdasarkan kebutuhan tertentu.

#### Functional Requirements

Pengguna dapat:

- mencari berdasarkan nama;
- memfilter berdasarkan wilayah;
- memfilter berdasarkan tingkat kesulitan;
- memfilter berdasarkan durasi;
- memfilter berdasarkan ketinggian;
- memfilter berdasarkan karakter pendakian;
- mengurutkan berdasarkan popularitas atau ketinggian;
- membuka detail gunung;
- menambahkan gunung ke compare;
- menyimpan gunung.

#### Empty State

Jika tidak ada hasil:

- tampilkan pesan yang jelas;
- tawarkan reset filter;
- tampilkan gunung alternatif;
- arahkan ke Jejak Finder.

---

### 15.3 Mountain Detail

#### Goal

Memberikan informasi yang cukup agar pengguna dapat menilai apakah gunung tersebut sesuai.

#### Required Content

- nama gunung;
- lokasi;
- ketinggian;
- foto utama;
- ringkasan;
- tingkat kesulitan;
- estimasi durasi;
- beginner suitability;
- jalur;
- fasilitas;
- sumber air;
- area camping;
- musim terbaik;
- karakter pemandangan;
- hal yang perlu diperhatikan;
- FAQ;
- gunung serupa.

#### Primary CTA

> Simpan ke Wishlist

#### Secondary CTA

> Bandingkan

#### Additional Actions

- lihat di peta;
- tandai sudah didaki;
- buka gunung serupa.

---

### 15.4 Jejak Finder

#### Goal

Merekomendasikan gunung berdasarkan kondisi dan preferensi pengguna.

---

#### Quiz Inputs

- pengalaman mendaki
- tingkat kebugaran
- jumlah hari tersedia
- wilayah pilihan
- tujuan pendakian
- tingkat anggaran

---

#### Recommendation Engine

Sistem menggunakan deterministic scoring untuk menentukan kandidat gunung yang paling sesuai.

Setelah proses scoring selesai, AI menghasilkan penjelasan yang bersifat personal berdasarkan hasil tersebut.

AI tidak menentukan ranking.

AI hanya menjelaskan hasil yang telah ditentukan oleh sistem.

---

#### Recommendation Result

Setiap hasil rekomendasi harus menampilkan:

- Match Score
- Alasan kecocokan
- Trade-off
- Tingkat kesulitan
- Estimasi durasi
- CTA ke halaman Detail
- CTA Simpan ke Wishlist

Selain informasi terstruktur di atas, AI menghasilkan penjelasan singkat yang membantu pengguna memahami alasan rekomendasi.

Contoh:

> Berdasarkan jawabanmu, Gunung Prau menjadi pilihan terbaik karena durasi pendakiannya sesuai dengan waktu yang kamu miliki, tingkat kesulitannya ramah untuk pemula, dan terkenal dengan pemandangan sunrise. Namun, jalur ini cenderung ramai saat musim liburan.

---

#### AI Rules

AI wajib:

- menggunakan hasil scoring sebagai sumber utama;
- menjelaskan alasan kecocokan;
- menyebut minimal satu trade-off;
- menggunakan data yang tersedia di database.

AI dilarang:

- mengubah ranking hasil rekomendasi;
- menambahkan gunung di luar database;
- menciptakan informasi yang tidak tersedia;
- memberikan jaminan keselamatan pendakian.

---

### 15.5 Compare Mountains

#### Goal

Membantu pengguna memahami perbedaan beberapa gunung.

#### Requirements

- maksimal tiga gunung;
- selection dapat berasal dari Explore atau Detail;
- selection tersimpan dalam URL;
- perbandingan visual;
- responsive pada mobile;
- highlight keunggulan setiap gunung.

#### Comparison Attributes

- ketinggian;
- tingkat kesulitan;
- estimasi durasi;
- beginner suitability;
- akses;
- camping;
- sumber air;
- sunrise;
- crowd level;
- musim terbaik.

#### Recommendation Summary

Sistem menjelaskan:

- pilihan terbaik untuk pemula;
- pilihan terbaik untuk pendakian singkat;
- pilihan terbaik untuk tantangan;
- trade-off masing-masing pilihan.

---

### 15.6 Interactive Map

#### Goal

Membantu pengguna mengeksplorasi gunung berdasarkan wilayah.

#### Requirements

- menampilkan marker gunung;
- filter wilayah;
- filter difficulty;
- marker preview;
- navigasi ke detail;
- membedakan completed dan wishlist untuk user login;
- menyediakan list alternative untuk accessibility.

#### Not Required

- GPS tracking;
- route navigation;
- offline map;
- real-time location.

---

### 15.7 Wishlist

#### Requirements

Pengguna dapat:

- menyimpan gunung;
- menghapus gunung;
- melihat semua gunung tersimpan;
- membuka detail;
- menandai sebagai completed.

Login diperlukan untuk menyimpan permanen.

---

### 15.8 Jejak Passport

#### Goal

Menampilkan perjalanan pendakian pengguna secara visual.

#### Required Sections

- profile summary;
- total gunung selesai;
- gunung tertinggi;
- total akumulasi ketinggian;
- jumlah provinsi;
- completed mountains;
- wishlist;
- progress map.

#### MVP Constraint

Passport tidak memerlukan achievement engine kompleks.

Badge, streak, ranking, dan challenge masuk fase berikutnya.

---

## 16. Recommendation Scoring

### Base Weights

| Dimension | Weight |
|---|---:|
| Beginner suitability | 30% |
| Duration compatibility | 20% |
| Fitness compatibility | 15% |
| Region preference | 15% |
| Goal compatibility | 15% |
| Budget compatibility | 5% |

### Hard Filters

Gunung dapat dikeluarkan dari kandidat jika:

- durasi minimum melebihi waktu user secara signifikan;
- tingkat kesulitan terlalu tinggi untuk pengalaman pengguna;
- wilayah tidak memenuhi pilihan wajib;
- data penting tidak tersedia.

### Output

Setiap kandidat menghasilkan:

- total score;
- matched attributes;
- mismatched attributes;
- trade-offs;
- recommendation reasons.

---

## 17. Core Data Entities

### Mountain

- id
- name
- slug
- elevation
- province
- island
- latitude
- longitude
- summary
- description
- difficulty
- beginner suitability
- duration
- budget category
- best season
- popularity
- sunrise rating
- camping availability
- water source availability
- hero image
- status

### Mountain Route

- id
- mountain id
- name
- starting point
- estimated duration
- distance
- elevation gain
- difficulty
- facilities
- description

### User Profile

- id
- display name
- avatar
- experience level
- fitness level
- preferred region
- created at

### User Mountain

- user id
- mountain id
- status
- completed date
- saved date

Allowed status:

- wishlist
- completed

### Finder Result

- id
- user id optional
- answers
- recommendation result
- created at

---

## 18. Authentication Rules

### Public Access

- homepage;
- Explore;
- Detail;
- Finder;
- Compare;
- Map;
- Collections.

### Login Required

- save wishlist;
- mark completed;
- Passport;
- profile;
- persistent Finder result.

Authentication should appear after users receive initial value.

---

## 19. Non-Functional Requirements

### Performance

- mobile-first;
- responsive images;
- lazy-load maps and charts;
- minimize third-party scripts;
- public pages should be server-rendered;
- avoid unnecessary Client Components.

### Accessibility

- keyboard navigation;
- visible focus;
- semantic HTML;
- sufficient contrast;
- form labels;
- reduced motion support;
- text alternative for map and chart information.

### Security

- server-side validation;
- Row Level Security;
- no service key in browser;
- rate limit AI endpoint;
- validate file uploads;
- do not trust user ID from client.

### SEO

- clean URLs;
- metadata per mountain;
- structured headings;
- sitemap;
- canonical URL;
- descriptive image alt text;
- indexable mountain and collection pages.

---

## 20. Analytics Events

Track:

- `finder_started`
- `finder_completed`
- `recommendation_viewed`
- `mountain_viewed`
- `mountain_saved`
- `mountain_compared`
- `mountain_marked_completed`
- `passport_viewed`
- `account_created`

### North Star Metric

> Jumlah pengguna yang menemukan dan menyimpan gunung tujuan.

Primary event:

```text
mountain_saved
```

---

## 21. Success Metrics

### Product Metrics

- Finder completion rate;
- recommendation-to-detail click rate;
- save conversion rate;
- compare usage rate;
- completed mountain count;
- Passport return rate;
- account creation after value moment.

### Portfolio Metrics

- project selesai dan deployed;
- critical flow dapat didemonstrasikan;
- codebase modular;
- design konsisten;
- dokumentasi tersedia;
- AI integration dapat dijelaskan;
- recommendation logic dapat diuji.

---

## 22. Technical Stack

- Next.js App Router
- React
- TypeScript strict mode
- Tailwind CSS
- shadcn/ui
- Supabase PostgreSQL
- Supabase Authentication
- Supabase Storage
- Zod
- React Hook Form
- Mapbox GL JS
- LLM provider abstraction
- Vitest
- Playwright
- Vercel

---

## 23. Development Rules for AI

AI coding assistant must:

1. Follow the PRD and supporting documents.
2. Build only the current development phase.
3. Reuse existing components.
4. Use Server Components by default.
5. Avoid unnecessary dependencies.
6. Keep domain logic outside visual components.
7. Validate external input.
8. Use semantic design tokens.
9. Preserve existing working logic unless explicitly instructed.
10. Document assumptions.
11. Never fabricate mountain data.
12. Never expand MVP scope without explicit instruction.

AI coding assistant must not:

- redesign unrelated pages;
- introduce microservices;
- create unnecessary global state;
- add community or marketplace features;
- replace the chosen stack;
- use placeholder content in final production screens;
- generate safety claims;
- implement future roadmap features prematurely.

---

## 24. Development Phases

### Phase 1 — Foundation

- project setup;
- design tokens;
- typography;
- application layout;
- navigation;
- database connection;
- seed data.

### Phase 2 — Mountain Knowledge

- Explore;
- search;
- filters;
- Mountain Detail;
- Collections.

### Phase 3 — Decision Tools

- Compare;
- Jejak Finder;
- recommendation scoring;
- recommendation explanation.

### Phase 4 — Map

- mountain markers;
- filters;
- marker preview;
- Detail integration.

### Phase 5 — User Journey

- authentication;
- wishlist;
- mark completed;
- profile.

### Phase 6 — Passport

- statistics;
- completed list;
- wishlist;
- progress map.

### Phase 7 — Quality

- accessibility;
- automated tests;
- SEO;
- performance;
- analytics;
- deployment.

---

## 25. Definition of Done

Jejak Puncak MVP dianggap selesai ketika:

1. Semua public page dapat diakses dengan baik di mobile dan desktop.
2. Terdapat minimal 12 gunung dengan data berkualitas.
3. Explore, search, dan filter berfungsi.
4. Mountain Detail menampilkan data lengkap.
5. Jejak Finder menghasilkan rekomendasi yang konsisten.
6. Compare mendukung maksimal tiga gunung.
7. Map menampilkan dan membuka gunung.
8. User dapat login.
9. User dapat menyimpan dan menyelesaikan gunung.
10. Passport berubah berdasarkan aktivitas user.
11. Data user terlindungi melalui Row Level Security.
12. Critical user flow lulus test.
13. Aplikasi berhasil di-deploy.
14. Tidak ada fitur di luar MVP yang setengah jadi.

---

## 26. Future Roadmap

### Phase 2

- achievement;
- badge;
- collection progress;
- shareable Passport;
- downloadable Passport card;
- packing checklist;
- budget planner.

### Phase 3

- AI Journey Coach;
- seasonal recommendation;
- weather integration;
- hiking timeline;
- user photo upload.

### Phase 4

- review;
- community stories;
- challenges;
- guide atau partner integration.

Future roadmap tidak boleh memengaruhi kompleksitas MVP kecuali diperlukan sebagai fondasi data yang sederhana.

---

## 27. Final Product Statement

Jejak Puncak adalah platform perjalanan pendakian, bukan sekadar katalog gunung.

MVP harus menunjukkan satu pengalaman utama:

> Pengguna menemukan gunung yang sesuai, memahami pilihannya, menyimpannya, menyelesaikan pendakian, dan melihat progresnya bertambah.

Fokus utama adalah menyelesaikan pengalaman tersebut dengan kualitas tinggi sebelum menambahkan fitur baru.
