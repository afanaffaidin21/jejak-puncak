import type { Metadata } from "next";

import { Container } from "@/components/common/container";
import { ErrorState } from "@/components/common/error-state";
import { MountainMap } from "@/components/map/mountain-map";
import { getMapMountains } from "@/services/mountains";

export const metadata: Metadata = {
  title: "Peta Gunung Indonesia | Jejak Puncak",
  description:
    "Jelajahi lokasi gunung Indonesia melalui peta interaktif dan filter wilayah.",
};

export default async function MapPage() {
  const mountains = await getMapMountains().catch(() => null);
  return (
    <main className="bg-background py-2xl md:py-3xl">
      <Container className="space-y-xl">
        <header className="max-w-3xl">
          <p className="text-label font-semibold text-primary">
            Jelajah kepulauan
          </p>
          <h1 className="mt-xs font-heading text-h1 font-semibold text-text-primary">
            Lihat gunung dalam konteks wilayah.
          </h1>
          <p className="mt-sm max-w-reading text-body-lg text-text-secondary">
            Gunakan marker, daftar aksesibel, dan filter wilayah untuk menemukan
            puncak yang ingin kamu kenali lebih dekat.
          </p>
        </header>
        {mountains ? (
          <MountainMap mountains={mountains} />
        ) : (
          <ErrorState
            description="Data gunung belum dapat dimuat. Coba kembali beberapa saat lagi."
            title="Peta belum dapat disiapkan"
          />
        )}
      </Container>
    </main>
  );
}
