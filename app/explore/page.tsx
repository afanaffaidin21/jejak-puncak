import type { Metadata } from "next";

import { Container } from "@/components/common/container";
import { ErrorState } from "@/components/common/error-state";
import { ExploreShell } from "@/components/explore/explore-shell";
import { InfiniteMountainGrid } from "@/components/explore/infinite-mountain-grid";
import {
  parseMountainSearchParams,
  type ExploreSearchParams,
} from "@/lib/mountain-search";
import { toMountainCardData } from "@/lib/mountains";
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
  const baseQuery = new URLSearchParams();

  for (const [key, rawValue] of Object.entries(resolvedSearchParams)) {
    const values = Array.isArray(rawValue) ? rawValue : [rawValue];
    values.forEach((value) => {
      if (value !== undefined && key !== "page") {
        baseQuery.append(key, value);
      }
    });
  }

  const structuredData = result
    ? {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Explore Gunung Indonesia",
        description:
          "Katalog gunung Indonesia dengan filter wilayah, kesulitan, durasi, elevasi, camping, dan sunrise.",
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: result.count,
          itemListElement: result.mountains.map((mountain, index) => ({
            "@type": "ListItem",
            position: (result.page - 1) * result.pageSize + index + 1,
            url: `https://jejak-puncak.vercel.app/mountains/${mountain.slug}`,
            name: mountain.name,
          })),
        },
      }
    : null;

  return (
    <>
      {structuredData ? (
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c"),
          }}
          type="application/ld+json"
        />
      ) : null}
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
            <ExploreShell
              key={JSON.stringify(filters)}
              resultCount={result.count}
            >
              <InfiniteMountainGrid
                baseQuery={baseQuery.toString()}
                initialHasMore={result.hasMore}
                initialMountains={result.mountains.map(toMountainCardData)}
                initialPage={result.page}
              />
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
