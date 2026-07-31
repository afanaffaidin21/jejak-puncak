import Link from "next/link";

import { ContentCardSkeleton } from "@/components/common/content-card-skeleton";
import { EmptyState } from "@/components/common/empty-state";
import { MountainCard } from "@/components/mountains/mountain-card";
import { buttonVariants } from "@/components/ui/button";
import { toMountainCardData } from "@/lib/mountains";
import { getSimilarMountains } from "@/services/mountains";
import type { Mountain } from "@/types/mountain";

export function SimilarMountainsSkeleton() {
  return (
    <div className="grid gap-md sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }, (_, index) => (
        <ContentCardSkeleton key={index} />
      ))}
    </div>
  );
}

export async function SimilarMountains({ mountain }: { mountain: Mountain }) {
  const similar = await getSimilarMountains(
    mountain.id,
    mountain.island,
    mountain.difficulty,
    4,
  ).catch(() => null);

  if (similar === null) {
    return (
      <EmptyState
        action={
          <Link
            className={buttonVariants({ variant: "outline" })}
            href="/explore"
          >
            Buka Explore
          </Link>
        }
        description="Rekomendasi serupa belum dapat dijangkau dari database."
        title="Gunung serupa belum tersedia"
      />
    );
  }

  if (!similar.length) {
    return (
      <EmptyState
        description="Belum ada gunung lain dengan wilayah atau tingkat kesulitan serupa."
        title="Belum ada rekomendasi serupa"
      />
    );
  }

  return (
    <div className="grid gap-md sm:grid-cols-2 lg:grid-cols-4">
      {similar.map((item) => (
        <MountainCard key={item.id} mountain={toMountainCardData(item)} />
      ))}
    </div>
  );
}
