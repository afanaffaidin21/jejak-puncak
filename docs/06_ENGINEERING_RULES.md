# 06_ENGINEERING_RULES.md

# Jejak Puncak — Engineering Rules

**Version:** 1.0  
**Status:** Production Ready

> Dokumen ini menjadi pedoman implementasi teknis agar seluruh developer dan AI coding assistant menghasilkan kode yang konsisten.

---

# 1. Engineering Principles

- Readability lebih penting daripada clever code.
- Konsisten lebih penting daripada preferensi pribadi.
- Hindari duplikasi (DRY).
- Bangun komponen yang reusable.
- Optimalkan performa sejak awal.
- Security by default.
- Accessibility bukan fitur tambahan.

---

# 2. Tech Stack

Frontend

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui

Backend

- Supabase

Deployment

- Vercel

---

# 3. Project Structure

```
app/
components/
features/
hooks/
lib/
services/
types/
utils/
public/
docs/
```

Pisahkan business logic dari UI.

---

# 4. Coding Standards

- TypeScript strict mode.
- Hindari penggunaan `any`.
- Gunakan interface/type yang jelas.
- Fungsi memiliki satu tanggung jawab.
- Hindari file yang terlalu besar (>300 baris bila memungkinkan).

---

# 5. Component Rules

- Satu komponen untuk satu tujuan.
- Reusable sebelum membuat komponen baru.
- Hindari prop drilling berlebihan.
- Gunakan composition dibanding inheritance.

---

# 6. State Management

Prioritas:

1. Local State
2. Context
3. Server State

Jangan menyimpan data server pada global state tanpa alasan yang jelas.

---

# 7. Data Fetching

- Server Component bila memungkinkan.
- Client Component hanya bila membutuhkan interaksi.
- Gunakan loading dan error state di setiap request.
- Hindari fetch yang sama berulang.

---

# 8. Styling Rules

- Gunakan utility Tailwind.
- Jangan menggunakan inline style kecuali benar-benar diperlukan.
- Ikuti Design System.
- Hindari hardcoded spacing dan warna di luar design token.

---

# 9. Naming Convention

File

- kebab-case

Component

- PascalCase

Hook

- useSomething

Variable

- camelCase

Constant

- UPPER_SNAKE_CASE

---

# 10. Folder Convention

```
features/
  compare/
  finder/
  passport/

components/
  common/
  ui/
```

Feature memiliki komponen, hooks, dan service sendiri bila kompleks.

---

# 11. Performance Rules

- Lazy load untuk komponen berat.
- Optimalkan gambar.
- Gunakan pagination bila diperlukan.
- Hindari render ulang yang tidak perlu.
- Target Core Web Vitals kategori "Good".

---

# 12. Accessibility Rules

- Gunakan semantic HTML.
- Semua input memiliki label.
- Keyboard navigation wajib.
- Focus state selalu terlihat.
- Kontras memenuhi WCAG AA.

---

# 13. Security Rules

- Validasi di client dan server.
- Jangan percaya input pengguna.
- Gunakan Row Level Security Supabase.
- Rahasiakan environment variable.
- Sanitasi seluruh input.

---

# 14. Error Handling

Setiap fitur wajib memiliki:

- Loading State
- Empty State
- Error State
- Retry Action bila memungkinkan

Jangan menampilkan error mentah kepada pengguna.

---

# 15. Logging

Development

- Console log diperbolehkan.

Production

- Hapus debug log.
- Gunakan error monitoring.

---

# 16. Git Convention

Branch

```
feature/
fix/
refactor/
docs/
```

Commit

```
feat:
fix:
refactor:
docs:
style:
test:
chore:
```

---

# 17. Testing Guidelines

Minimal mencakup:

- Critical business logic
- Utility function
- Form validation

Lakukan pengujian manual untuk:

- Responsive
- Authentication
- Navigation
- AI Flow

---

# 18. Documentation Rules

Setiap fitur baru wajib memperbarui:

- PRD (jika scope berubah)
- Product Specification terkait
- Database (jika skema berubah)
- AI Specification (jika AI berubah)

---

# 19. AI Coding Assistant Rules

AI wajib:

- mengikuti seluruh dokumen di folder docs;
- tidak mengubah business logic tanpa instruksi;
- tidak mengubah database tanpa pembaruan dokumentasi;
- menjaga konsistensi nama komponen, route, dan struktur folder.

AI tidak boleh:

- menambahkan dependency tanpa alasan;
- menghapus fitur yang sudah ada;
- mengubah desain di luar Design System;
- membuat asumsi terhadap data yang tidak didefinisikan.

---

# 20. Definition of Done

Sebuah task dianggap selesai apabila:

- sesuai Product Specification;
- lulus code review;
- tidak menghasilkan TypeScript error;
- tidak menghasilkan lint error;
- responsif pada mobile, tablet, desktop;
- memiliki loading, empty, dan error state;
- memenuhi standar accessibility;
- tidak menurunkan performa aplikasi;
- dokumentasi terkait telah diperbarui bila diperlukan.
