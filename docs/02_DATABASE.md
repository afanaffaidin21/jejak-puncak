# 02_DATABASE.md

# Jejak Puncak — Database Specification

**Version:** 1.0  
**Status:** Ready for Development  
**Database:** PostgreSQL (Supabase)

---

# 1. Tujuan

Dokumen ini mendefinisikan struktur database untuk MVP Jejak Puncak. Database dirancang untuk:

- menyimpan data gunung secara terstruktur;
- mendukung Jejak Finder;
- mendukung Compare;
- mendukung Wishlist dan Passport;
- mudah dikembangkan tanpa mengubah fondasi utama.

> **Scope:** MVP saja. Fitur komunitas, review, leaderboard, dan marketplace belum termasuk.

---

# 2. Prinsip Database

- PostgreSQL sebagai source of truth.
- Semua relasi menggunakan foreign key.
- Hindari penyimpanan data penting dalam JSON jika dapat dimodelkan secara relasional.
- Soft delete hanya digunakan bila benar-benar diperlukan.
- Semua tabel milik pengguna wajib menggunakan Row Level Security (RLS).

---

# 3. Entity Relationship

```text
profiles
    │
    ├──────────────┐
    │              │
    ▼              ▼
user_mountains   finder_results
    │
    ▼
mountains
    │
    ▼
mountain_routes
```

---

# 4. Tabel

## profiles

Menyimpan profil pengguna.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid (PK) | Mengikuti auth.users |
| display_name | text | |
| avatar_url | text | nullable |
| experience_level | text | beginner/intermediate/advanced |
| fitness_level | text | low/moderate/high |
| preferred_region | text | nullable |
| created_at | timestamptz | |
| updated_at | timestamptz | |

---

## mountains

Data utama gunung.

| Column | Type |
|--------|------|
| id | uuid (PK) |
| slug | text (unique) |
| name | text |
| province | text |
| island | text |
| elevation | integer |
| latitude | numeric |
| longitude | numeric |
| summary | text |
| description | text |
| difficulty | text |
| beginner_score | integer |
| duration_days | numeric |
| budget_category | text |
| best_season | text |
| sunrise_rating | integer |
| camping_available | boolean |
| water_source | boolean |
| popularity_score | integer |
| hero_image | text |
| status | text |
| created_at | timestamptz |
| updated_at | timestamptz |

---

## mountain_routes

Relasi one-to-many terhadap mountains.

| Column | Type |
|--------|------|
| id | uuid (PK) |
| mountain_id | uuid (FK → mountains.id) |
| name | text |
| starting_point | text |
| distance_km | numeric |
| elevation_gain | integer |
| estimated_hours | numeric |
| difficulty | text |
| facilities | text |
| description | text |

---

## user_mountains

Wishlist dan riwayat pendakian.

| Column | Type |
|--------|------|
| id | uuid (PK) |
| user_id | uuid (FK → profiles.id) |
| mountain_id | uuid (FK → mountains.id) |
| status | text |
| completed_at | timestamptz nullable |
| created_at | timestamptz |

**Allowed status**

- wishlist
- completed

Constraint:

- satu user hanya boleh memiliki satu record untuk satu gunung.

Unique:

```sql
UNIQUE(user_id, mountain_id)
```

---

## finder_results

Riwayat hasil Jejak Finder.

| Column | Type |
|--------|------|
| id | uuid (PK) |
| user_id | uuid nullable |
| answers | jsonb |
| top_recommendation | uuid (FK → mountains.id) |
| recommendation_payload | jsonb |
| created_at | timestamptz |

Catatan:
- `answers` menyimpan jawaban kuis.
- `recommendation_payload` menyimpan hasil scoring terstruktur.
- Narasi AI tidak wajib disimpan pada MVP.

---

# 5. Enum

## experience_level

- beginner
- intermediate
- advanced

## fitness_level

- low
- moderate
- high

## mountain_status

- wishlist
- completed

## difficulty

- easy
- moderate
- hard
- extreme

---

# 6. Relasi

- profiles 1:N user_mountains
- mountains 1:N mountain_routes
- mountains 1:N user_mountains
- mountains 1:N finder_results (melalui top_recommendation)

---

# 7. Index

Buat index pada:

- mountains.slug
- mountains.province
- mountains.difficulty
- mountains.elevation
- user_mountains.user_id
- finder_results.user_id

---

# 8. Row Level Security

Aktifkan RLS untuk:

- profiles
- user_mountains
- finder_results

Aturan:

- User hanya dapat membaca dan mengubah datanya sendiri.
- Data gunung bersifat publik.

---

# 9. Seed Data MVP

Minimal:

- 12–20 gunung
- 1–2 jalur per gunung
- foto utama
- atribut recommendation
- FAQ dasar (fase berikutnya dapat dipisah menjadi tabel sendiri bila berkembang)

---

# 10. Future Tables (Out of Scope)

- achievements
- collections
- reviews
- comments
- notifications
- ai_conversations
- shared_passports

Jangan dibuat pada MVP sampai benar-benar dibutuhkan.
