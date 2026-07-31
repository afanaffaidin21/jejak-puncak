import type { Metadata } from "next";

import { Container } from "@/components/common/container";
import { ErrorState } from "@/components/common/error-state";
import { ExploreShell } from "@/components/explore/explore-shell";
import {
  parseMountainSearchParams,
  type ExploreSearchParams,
} from "@/lib/mountain-search";
import { getAllMountains } from "@/services/mountains";

export const metadata: Metadata = {
  title: "Explore Gunung Indonesia | Jejak Puncak",
  description:
    "Cari dan filter gunung Indonesia berdasarkan wilayah, kesulitan, durasi, elevasi, camping, dan panorama sunrise.",
};

type ExplorePageProps = {
  searchParams: Promise<ExploreSearchParams>;
};

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parseMountainSearchParams(resolvedSearchParams);
  const result = await getAllMountains(filters).catch(() => null);

  return (
    <>
      <section className="border-b border-divider bg-surface py-2xl md:py-3xl">
        <Container>
          <p className="text-label font-semibold text-primary">Explore</p>
          <h1 className="mt-xs max-w-3xl text-balance font-heading text-h1 font-semibold text-text-primary">
            Temukan gunung yang sesuai dengan rencanamu.
          </h1>
          <p className="mt-md max-w-reading text-pretty text-body-lg text-text-secondary">
            Gunakan pencarian dan filter untuk mempersempit pilihan berdasarkan
            waktu, lokasi, serta tingkat kesiapan.
          </p>
        </Container>
      </section>

      <section
        aria-label="Hasil pencarian gunung"
        className="bg-background py-2xl md:py-3xl"
      >
        <Container>
          {result ? (
            <ExploreShell key={filters.search ?? ""} resultCount={result.count}>
              <div className="rounded-xl border border-dashed border-divider bg-surface p-xl text-center">
                <p className="font-heading text-h4 font-semibold text-text-primary">
                  Kontrol pencarian dan filter siap digunakan.
                </p>
                <p className="mt-xs text-body-sm text-text-secondary">
                  Grid hasil, aksi wishlist/compare, dan infinite scroll
                  diselesaikan pada issue hasil Explore berikutnya.
                </p>
              </div>
            </ExploreShell>
          ) : (
            <ErrorState
              description="Pastikan migration dan seed Supabase Phase 2 sudah diterapkan, lalu coba muat ulang halaman."
              title="Katalog gunung belum dapat dimuat"
            />
          )}
        </Container>
      </section>
    </>
  );
}
