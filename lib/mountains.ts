import type {
  Mountain,
  MountainCardData,
  MountainDifficulty,
} from "@/types/mountain";

export const DIFFICULTY_LABELS: Record<MountainDifficulty, string> = {
  easy: "Mudah",
  moderate: "Menengah",
  hard: "Sulit",
  extreme: "Ekstrem",
};

export const BUDGET_LABELS: Record<string, string> = {
  low: "Hemat",
  medium: "Menengah",
  high: "Lebih tinggi",
};

export function formatDuration(days: number) {
  if (days <= 1) {
    return "1 hari";
  }

  return `${new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 1,
  }).format(days)} hari`;
}

export function toMountainCardData(mountain: Mountain): MountainCardData {
  return {
    difficulty: mountain.difficulty,
    durationDays: mountain.durationDays,
    elevation: mountain.elevation,
    heroImage: mountain.heroImage,
    id: mountain.id,
    name: mountain.name,
    province: mountain.province,
    slug: mountain.slug,
    summary: mountain.summary,
  };
}

export function getMountainFaqs(mountain: Mountain) {
  return [
    {
      question: `Apakah ${mountain.name} cocok untuk pemula?`,
      answer: `${mountain.name} memiliki skor pemula editorial ${mountain.beginnerScore}/100 dan tingkat kesulitan ${DIFFICULTY_LABELS[mountain.difficulty].toLowerCase()}. Skor ini hanya panduan awal; kebugaran, pengalaman, cuaca, dan kondisi jalur tetap harus dinilai sebelum berangkat.`,
    },
    {
      question: `Kapan waktu yang disarankan untuk menjelajahi ${mountain.name}?`,
      answer: `Referensi musim awal kami adalah ${mountain.bestSeason}. Penutupan, cuaca, kuota, serta aktivitas vulkanik dapat mengubah rencana, jadi periksa informasi resmi mendekati hari perjalanan.`,
    },
    {
      question: `Apakah ada area camping di ${mountain.name}?`,
      answer: mountain.campingAvailable
        ? "Data editorial mencatat opsi berkemah pada koridor rute. Pastikan lokasi yang diizinkan, kuota, sumber air, dan aturan pengelola sebelum membawa perlengkapan."
        : "Data editorial saat ini tidak mencatat opsi berkemah untuk perjalanan ini. Jangan mendirikan tenda di luar area yang diizinkan pengelola.",
    },
    {
      question: "Apakah data rute ini bisa dipakai sebagai panduan navigasi?",
      answer:
        "Tidak. Jarak, kenaikan elevasi, dan waktu adalah estimasi perencanaan, bukan trek GPS atau instruksi keselamatan. Gunakan peta resmi, arahan petugas, dan pemandu lokal bila diperlukan.",
    },
  ];
}
