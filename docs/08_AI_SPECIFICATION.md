
# 08_AI_SPECIFICATION.md

# Jejak Puncak — AI Specification

**Version:** 1.0  
**Status:** Production Ready

> Dokumen ini mendefinisikan perilaku AI pada Jejak Puncak. AI hanya berfungsi sebagai pendukung keputusan, bukan pengambil keputusan utama.

---

# 1. Objectives

AI digunakan untuk:

- menjelaskan hasil rekomendasi;
- membantu pengguna memahami trade-off;
- meningkatkan kepercayaan terhadap rekomendasi.

AI tidak digunakan untuk menghasilkan data gunung baru.

---

# 2. AI Scope (MVP)

## Digunakan

- Jejak Finder Recommendation Explanation
- Mountain Fit Explanation
- Compare Summary

## Tidak Digunakan

- Chatbot
- Trip Planner
- Route Generator
- Itinerary Generator
- Safety Prediction
- Cuaca
- Estimasi risiko

---

# 3. AI Architecture

```
User Input
      │
      ▼
Recommendation Engine
(Deterministic Scoring)
      │
      ▼
Structured Result JSON
      │
      ▼
LLM
      │
      ▼
Natural Language Explanation
```

Seluruh proses ranking dilakukan sebelum AI dipanggil.

---

# 4. Source of Truth

AI hanya boleh menggunakan:

- hasil scoring Finder;
- data gunung dari database;
- atribut rute dan fasilitas;
- preferensi pengguna yang tersedia.

AI tidak boleh menggunakan asumsi di luar data tersebut.

---

# 5. Input Schema

AI menerima data terstruktur, misalnya:

- User Preferences
- Match Score
- Top Recommendations
- Mountain Attributes
- Compare Dataset

Input harus berbentuk JSON terstruktur.

---

# 6. Output Requirements

Output harus:

- ringkas;
- mudah dipahami;
- objektif;
- menggunakan Bahasa Indonesia yang natural.

Struktur minimum:

1. Ringkasan
2. Alasan utama
3. Trade-off
4. Ajakan melihat detail

---

# 7. Prompt Principles

Prompt sistem harus mengarahkan AI untuk:

- tetap netral;
- tidak berlebihan;
- tidak membuat klaim tanpa data;
- menjelaskan berdasarkan fakta yang tersedia.

---

# 8. Guardrails

AI WAJIB:

- menjelaskan, bukan menentukan;
- mengutip data yang tersedia;
- menyebutkan keterbatasan jika data tidak lengkap.

AI DILARANG:

- mengarang data gunung;
- mengubah urutan rekomendasi;
- memberikan jaminan keselamatan;
- membuat prediksi cuaca;
- memberikan saran medis atau darurat.

---

# 9. Feature Specifications

## Jejak Finder

Input

- Preferensi pengguna
- Top 3 hasil
- Match score

Output

- Mengapa rekomendasi pertama paling sesuai
- Faktor utama
- Trade-off

---

## Mountain Fit

Input

- Data gunung
- Preferensi pengguna

Output

- Tingkat kecocokan
- Penjelasan singkat
- Catatan penting

---

## Compare Summary

Input

- Data 2–3 gunung

Output

- Perbedaan utama
- Kelebihan masing-masing
- Trade-off

---

# 10. Tone of Voice

- Ramah
- Informatif
- Tenang
- Profesional
- Tidak menggurui
- Tidak sensasional

---

# 11. Error Handling

Jika AI gagal:

- tampilkan hasil rekomendasi tanpa penjelasan;
- tampilkan pesan bahwa penjelasan sementara tidak tersedia;
- seluruh fitur utama tetap dapat digunakan.

---

# 12. Performance Targets

- Waktu respons ideal < 3 detik.
- Timeout maksimal 10 detik.
- AI tidak boleh menghambat alur utama aplikasi.

---

# 13. Security & Privacy

- Jangan mengirim data yang tidak diperlukan.
- Jangan menyertakan informasi sensitif pengguna.
- Gunakan koneksi HTTPS.
- Simpan API Key di environment variable.

---

# 14. Prompt Template

System Prompt:

"Anda adalah asisten Jejak Puncak. Jelaskan hasil rekomendasi berdasarkan data yang diberikan. Jangan mengubah skor, jangan menambahkan fakta baru, dan jangan memberikan jaminan keselamatan."

User Payload:

- Structured JSON Result

Expected Response:

- Summary
- Main Reasons
- Trade-offs
- CTA

---

# 15. Future Enhancements

Di luar MVP, AI dapat mendukung:

- Journey Summary
- Personalized Hiking Tips
- Seasonal Recommendation
- Packing Checklist
- Learning Insights

Semua fitur baru harus memiliki Product Specification dan pembaruan dokumen ini.

---

# 16. Acceptance Criteria

Implementasi AI dianggap selesai jika:

- seluruh output mengikuti guardrails;
- tidak mengubah hasil scoring;
- tidak menghasilkan fakta di luar database;
- dapat gagal secara aman (graceful degradation);
- digunakan hanya pada fitur yang telah didefinisikan.
