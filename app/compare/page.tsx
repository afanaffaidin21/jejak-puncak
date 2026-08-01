import type { Metadata } from "next";

import { ComparePage } from "@/components/compare/compare-page";
import { ErrorState } from "@/components/common/error-state";
import { getAllMountains } from "@/services/mountains";
import type { CompareMountain } from "@/types/compare";

export const metadata: Metadata = {
  title: "Bandingkan Gunung | Jejak Puncak",
  description: "Bandingkan elevasi, kesulitan, durasi, fasilitas, dan rating gunung Indonesia secara berdampingan.",
};

function toCompareMountain(mountain: Awaited<ReturnType<typeof getAllMountains>>["mountains"][number]): CompareMountain {
  return {
    id: mountain.id,
    slug: mountain.slug,
    name: mountain.name,
    province: mountain.province,
    island: mountain.island,
    elevation: mountain.elevation,
    difficulty: mountain.difficulty,
    beginnerScore: mountain.beginnerScore,
    durationDays: mountain.durationDays,
    campingAvailable: mountain.campingAvailable,
    waterSource: mountain.waterSource,
    bestSeason: mountain.bestSeason,
    popularityScore: mountain.popularityScore,
    sunriseRating: mountain.sunriseRating,
    heroImage: mountain.heroImage,
    latitude: mountain.latitude,
    longitude: mountain.longitude,
  };
}

export default async function CompareRoute() {
  const result = await getAllMountains({ pageSize: 48, sort: "name-asc" }).catch(() => null);

  if (!result) {
    return <ErrorState description="Coba muat ulang halaman atau kembali ke Explore." title="Data perbandingan belum dapat dimuat" />;
  }

  return <ComparePage mountains={result.mountains.map(toCompareMountain)} />;
}

