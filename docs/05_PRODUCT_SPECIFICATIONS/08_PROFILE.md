# 08_PROFILE.md

# Jejak Puncak — Profile Product Specification

**Version:** 1.0  
**Status:** Production Ready

> Referensi:
> - 00_GLOBAL.md
> - 01_PRD.md
> - 03_VISUAL_DIRECTION.md
> - 04_DESIGN_SYSTEM.md

---

# 1. Business Goal

Memberikan halaman bagi pengguna untuk mengelola informasi akun, preferensi, serta pengaturan aplikasi secara sederhana dan aman.

---

# 2. User Goal

Pengguna dapat:

- melihat informasi akun;
- memperbarui profil;
- mengatur preferensi;
- mengelola keamanan akun.

---

# 3. Success Metrics

Primary

- Profile Completion Rate
- Profile Update Success Rate

Secondary

- Preference Update Rate
- Account Retention

---

# 4. Entry Points

- Passport
- User Avatar
- Navigation

---

# 5. Exit Points

- Passport
- Homepage
- Logout

---

# 6. User Flow

Open Profile

↓

View Information

↓

Edit Profile / Preferences

↓

Save Changes

↓

Success Feedback

---

# 7. Layout Blueprint

## Desktop

```
Header

Sidebar Navigation

Content Area

Footer
```

Sidebar:

- Personal Information
- Preferences
- Security
- Account

## Mobile

```
Header

Tabs

Content

Sticky Save Button
```

---

# 8. Section Specifications

## Personal Information

### Purpose

Menampilkan dan mengubah informasi dasar pengguna.

### Components

- Avatar
- Display Name
- Email (Read Only)
- Bio (Optional)
- Save Button

Rules

- Email tidak dapat diubah dari halaman ini.
- Avatar bersifat opsional.

---

## Preferences

### Components

- Preferred Region
- Experience Level
- Hiking Goals
- Measurement Unit
- Theme (Future)

Rules

- Perubahan langsung tersimpan setelah menekan Save.

---

## Security

### Components

- Change Password
- Connected Account
- Active Sessions (Future)

---

## Account

### Components

- Export Data (Future)
- Delete Account
- Logout

Delete Account harus memiliki konfirmasi tambahan.

---

# 9. Component Tree

ProfilePage
├── Header
├── ProfileSidebar
├── PersonalInformationForm
├── PreferenceForm
├── SecuritySection
├── AccountSection
└── Footer

---

# 10. UX Rules

- Form sederhana dan mudah dipahami.
- Validasi ditampilkan secara real-time.
- Simpan perubahan tanpa memuat ulang halaman.
- Berikan feedback yang jelas setelah berhasil.

---

# 11. Motion

- Smooth tab transition
- Success toast
- Loading button
- Avatar fade transition

---

# 12. Responsive Behavior

## Mobile

- Tabs
- Sticky Save Button
- Single-column layout

## Tablet

- Dua kolom terbatas

## Desktop

- Sidebar + Content

---

# 13. AI Behavior

Halaman Profile tidak menggunakan AI pada MVP.

---

# 14. SEO

Halaman Profile memerlukan autentikasi dan tidak diindeks oleh mesin pencari.

---

# 15. Analytics

- profile_view
- profile_updated
- preference_updated
- password_change_started
- logout_click
- delete_account_started

---

# 16. Empty States

## Bio

Belum ada bio.

Placeholder:

"Ceritakan sedikit tentang dirimu."

---

# 17. Loading States

- Skeleton profile
- Loading button saat menyimpan
- Skeleton avatar

---

# 18. Error States

Pesan:

"Perubahan tidak dapat disimpan."

CTA

- Coba Lagi

---

# 19. Accessibility

- Semua field memiliki label.
- Error dijelaskan dengan jelas.
- Navigasi keyboard penuh.
- Focus state terlihat pada setiap kontrol.

---

# 20. Acceptance Criteria

Halaman Profile dianggap selesai jika:

- pengguna dapat memperbarui profil;
- preferensi tersimpan ke database;
- validasi berjalan dengan benar;
- responsif pada seluruh ukuran layar;
- memenuhi aturan pada 00_GLOBAL.md.
