import {
  ArrowRight,
  MapPinned,
  Sparkles,
  Stamp,
  Sunrise,
  TentTree,
} from "lucide-react";
import { Suspense } from "react";

import { Container } from "@/components/common/container";
import { ContentCardSkeleton } from "@/components/common/content-card-skeleton";
import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import {
  MotionLink,
  StaggerGrid,
  StaggerItem,
} from "@/components/common/motion-primitives";
import { ScrollReveal } from "@/components/common/scroll-reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { HomeFaqAccordion } from "@/components/home/home-faq-accordion";
import { MountainCard } from "@/components/mountains/mountain-card";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { getPopularMountains } from "@/services/mountains";

const HOME_FAQS = [
  {
    question: "Apakah data Jejak Puncak menggantikan informasi resmi?",
    answer:
      "Tidak. Jejak Puncak membantu tahap eksplorasi dan perencanaan awal. Selalu periksa status jalur, cuaca, kuota, izin, dan aktivitas vulkanik melalui pengelola serta otoritas resmi sebelum berangkat.",
  },
  {
    question: "Bagaimana tingkat kesulitan ditentukan?",
    answer:
      "Tingkat kesulitan adalah klasifikasi editorial awal yang mempertimbangkan durasi, kenaikan elevasi, karakter medan, dan kebutuhan bermalam. Penilaian ini akan terus ditinjau bersama data lapangan.",
  },
  {
    question: "Apakah saya perlu login untuk menjelajahi gunung?",
    answer:
      "Tidak. Homepage, Explore, dan detail gunung dapat dibuka tanpa akun. Login baru diperlukan untuk fitur personal seperti wishlist dan Passport.",
  },
  {
    question: "Mengapa beberapa foto masih berupa ilustrasi?",
    answer:
      "Fase ini memakai ilustrasi placeholder sambil menunggu foto gunung berlisensi lengkap. Setiap foto produksi nantinya akan disertai sumber, kredit, dan teks alternatif.",
  },
] as const;

async function PopularMountainGrid() {
  const mountains = await getPopularMountains(4).catch(() => null);

  if (mountains === null) {
    return (
      <ErrorState
        description="Data gunung belum dapat dijangkau. Pastikan migration dan seed Supabase Phase 2 sudah diterapkan."
        title="Gunung populer belum dapat dimuat"
      />
    );
  }

  if (!mountains.length) {
    return (
      <EmptyState
        description="Katalog gunung belum memiliki data berstatus terbit."
        title="Belum ada gunung populer"
      />
    );
  }

  return (
    <StaggerGrid className="grid gap-md sm:grid-cols-2 lg:grid-cols-4">
      {mountains.map((mountain, index) => (
        <StaggerItem className="h-full" key={mountain.id}>
          <MountainCard mountain={mountain} priority={index < 2} />
        </StaggerItem>
      ))}
    </StaggerGrid>
  );
}

export function PopularMountainsSection() {
  return (
    <section
      aria-labelledby="popular-mountains-heading"
      className="bg-background py-3xl md:py-4xl"
    >
      <ScrollReveal>
        <Container>
          <SectionHeading
            action={
              <MotionLink
                className={buttonVariants({ variant: "outline" })}
                href="/explore"
              >
                Lihat semua
                <ArrowRight aria-hidden="true" data-icon="inline-end" />
              </MotionLink>
            }
            description="Mulai dari gunung yang paling sering masuk daftar perjalanan pendaki Indonesia."
            eyebrow="Pilihan populer"
            id="popular-mountains-heading"
            title="Puncak yang banyak ingin dijelajahi"
          />
          <Suspense
            fallback={
              <div className="grid gap-md sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }, (_, index) => (
                  <ContentCardSkeleton key={index} />
                ))}
              </div>
            }
          >
            <PopularMountainGrid />
          </Suspense>
        </Container>
      </ScrollReveal>
    </section>
  );
}

export function MapIntroductionSection() {
  const markers = [
    { className: "top-[26%] left-[17%]", label: "Sumatra" },
    { className: "top-[58%] left-[42%]", label: "Jawa" },
    { className: "top-[56%] left-[57%]", label: "Bali" },
    { className: "top-[44%] left-[72%]", label: "Nusa Tenggara" },
  ] as const;

  return (
    <section
      aria-labelledby="map-introduction-heading"
      className="bg-surface py-3xl md:py-4xl"
    >
      <ScrollReveal>
        <Container>
          <div className="grid items-center gap-2xl lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-label font-semibold text-primary">
                Jelajah kepulauan
              </p>
              <h2
                className="mt-xs text-balance font-heading text-h2 font-semibold text-text-primary"
                id="map-introduction-heading"
              >
                Lihat perjalanan dalam konteks wilayah.
              </h2>
              <p className="mt-md text-pretty text-body-lg text-text-secondary">
                Gunakan peta interaktif untuk melihat sebaran pilihan, lalu buka
                detail gunung yang paling menarik perhatianmu.
              </p>
              <MotionLink
                className={cn(buttonVariants({ variant: "outline" }), "mt-lg")}
                href="/map"
              >
                Buka peta gunung
                <ArrowRight aria-hidden="true" data-icon="inline-end" />
              </MotionLink>
            </div>
            <div className="relative aspect-16/9 overflow-hidden rounded-xl border border-divider bg-accent shadow-surface">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--divider)_1px,transparent_1px)] bg-size-[20px_20px] opacity-70"
              />
              <div
                aria-hidden="true"
                className="absolute inset-[12%] rounded-[45%_55%_50%_40%] border border-primary/15 bg-surface/65 blur-[1px]"
              />
              {markers.map((marker) => (
                <span
                  className={cn(
                    "absolute flex items-center gap-2xs rounded-full bg-surface-elevated px-xs py-2xs text-caption font-semibold text-text-primary shadow-floating",
                    marker.className,
                  )}
                  key={marker.label}
                >
                  <MapPinned
                    aria-hidden="true"
                    className="size-xs text-primary"
                  />
                  {marker.label}
                </span>
              ))}
              <p className="absolute right-sm bottom-sm rounded-full bg-foreground/75 px-sm py-2xs text-caption text-primary-foreground">
                Preview peta — data interaktif segera hadir
              </p>
            </div>
          </div>
        </Container>
      </ScrollReveal>
    </section>
  );
}

export function CollectionsSection() {
  const collections = [
    {
      icon: Sparkles,
      title: "Ramah pemula",
      description: "Pilihan dengan skor kesiapan awal yang lebih tinggi.",
      href: "/explore?beginner=70",
    },
    {
      icon: Sunrise,
      title: "Pemburu fajar",
      description: "Punggungan dan sudut pandang dengan rating sunrise tinggi.",
      href: "/explore?sunrise=4",
    },
    {
      icon: TentTree,
      title: "Malam di gunung",
      description: "Temukan pilihan yang memiliki area berkemah.",
      href: "/explore?camping=true",
    },
  ] as const;

  return (
    <section
      aria-labelledby="collections-heading"
      className="bg-background py-3xl md:py-4xl"
    >
      <ScrollReveal>
        <Container>
          <SectionHeading
            align="center"
            description="Kumpulan awal untuk mempersempit pilihan tanpa perlu mengetahui nama gunung terlebih dahulu."
            eyebrow="Koleksi pilihan"
            id="collections-heading"
            title="Mulai dari pengalaman yang kamu cari"
          />
          <StaggerGrid className="grid gap-md md:grid-cols-3">
            {collections.map((collection) => {
              const Icon = collection.icon;

              return (
                <StaggerItem
                  className="h-full"
                  interactive
                  key={collection.title}
                >
                  <MotionLink
                    className="flex h-full flex-col rounded-xl border border-divider bg-surface-elevated p-lg shadow-surface"
                    href={collection.href}
                  >
                    <span className="flex size-touch items-center justify-center rounded-full bg-accent text-accent-foreground">
                      <Icon aria-hidden="true" className="size-sm" />
                    </span>
                    <h3 className="mt-lg font-heading text-h3 font-semibold text-text-primary">
                      {collection.title}
                    </h3>
                    <p className="mt-xs text-body-sm text-text-secondary">
                      {collection.description}
                    </p>
                    <span className="mt-auto pt-md inline-flex items-center gap-2xs text-label font-semibold text-primary">
                      Buka koleksi
                      <ArrowRight aria-hidden="true" className="size-sm" />
                    </span>
                  </MotionLink>
                </StaggerItem>
              );
            })}
          </StaggerGrid>
        </Container>
      </ScrollReveal>
    </section>
  );
}

export function PassportSection() {
  return (
    <section
      aria-labelledby="passport-heading"
      className="bg-primary py-3xl text-primary-foreground md:py-4xl"
    >
      <ScrollReveal>
        <Container>
          <div className="grid items-center gap-xl md:grid-cols-[minmax(0,1fr)_auto]">
            <div>
              <p className="inline-flex items-center gap-2xs text-label font-semibold text-primary-foreground/75">
                <Stamp aria-hidden="true" className="size-sm shrink-0" />
                Jejak Passport
              </p>
              <h2
                className="mt-xs text-balance font-heading text-h2 font-semibold"
                id="passport-heading"
              >
                Simpan puncak yang ingin dan sudah kamu jejak.
              </h2>
              <p className="mt-sm max-w-reading text-body-lg text-primary-foreground/80">
                Login diperlukan untuk pengalaman personal. Pencatatan
                perjalanan lengkap akan dibangun pada fase berikutnya.
              </p>
            </div>
            <MotionLink
              className={buttonVariants({ variant: "secondary", size: "lg" })}
              href="/login?next=/passport"
            >
              Mulai Passport
              <ArrowRight aria-hidden="true" data-icon="inline-end" />
            </MotionLink>
          </div>
        </Container>
      </ScrollReveal>
    </section>
  );
}

export function HomeFaqSection() {
  return (
    <section
      aria-labelledby="home-faq-heading"
      className="bg-surface py-3xl md:py-4xl"
    >
      <ScrollReveal>
        <Container className="max-w-4xl">
          <SectionHeading
            align="center"
            description="Hal penting sebelum menjadikan Jejak Puncak bagian dari rencana perjalananmu."
            eyebrow="Pertanyaan umum"
            id="home-faq-heading"
            title="Rencanakan dengan informasi yang tepat"
          />
          <HomeFaqAccordion items={HOME_FAQS} />
        </Container>
      </ScrollReveal>
    </section>
  );
}

export { HOME_FAQS };
