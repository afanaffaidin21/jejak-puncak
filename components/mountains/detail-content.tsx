import {
  ArrowUpRight,
  CalendarRange,
  Check,
  Clock3,
  Droplets,
  MapPin,
  Mountain as MountainIcon,
  Route as RouteIcon,
  ShieldAlert,
  TentTree,
} from "lucide-react";
import { Suspense } from "react";

import { Container } from "@/components/common/container";
import {
  MotionAnchor,
  MotionLink,
} from "@/components/common/motion-primitives";
import { SectionHeading } from "@/components/common/section-heading";
import { MountainGallery } from "@/components/mountains/mountain-gallery";
import {
  SimilarMountains,
  SimilarMountainsSkeleton,
} from "@/components/mountains/similar-mountains";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { DIFFICULTY_LABELS, getMountainFaqs } from "@/lib/mountains";
import { formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Mountain } from "@/types/mountain";

export function DetailContent({ mountain }: { mountain: Mountain }) {
  const faqs = getMountainFaqs(mountain);
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${mountain.latitude},${mountain.longitude}`;

  return (
    <>
      <section
        aria-labelledby="about-mountain-heading"
        className="bg-background py-3xl md:py-4xl"
      >
        <Container>
          <div className="grid gap-xl lg:grid-cols-[minmax(0,0.7fr)_minmax(18rem,0.3fr)]">
            <div>
              <p className="text-label font-semibold text-primary">
                Tentang gunung
              </p>
              <h2
                className="mt-xs text-balance font-heading text-h2 font-semibold text-text-primary"
                id="about-mountain-heading"
              >
                Kenali karakter perjalanannya.
              </h2>
              <p className="mt-md max-w-reading whitespace-pre-line text-pretty text-body-lg text-text-secondary">
                {mountain.description}
              </p>
            </div>
            <Alert className="self-start border-warning/35 bg-warning/10">
              <ShieldAlert aria-hidden="true" />
              <AlertTitle>Validasi sebelum berangkat</AlertTitle>
              <AlertDescription>
                Jejak Puncak bukan sumber status jalur, cuaca, kuota, atau
                aktivitas vulkanik langsung. Konfirmasi semua keputusan kepada
                pengelola dan otoritas resmi.
              </AlertDescription>
            </Alert>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="routes-heading"
        className="scroll-mt-mobile-nav bg-surface py-3xl md:py-4xl"
        id="routes"
      >
        <Container>
          <SectionHeading
            description="Angka di bawah adalah estimasi perencanaan dan dapat berbeda menurut titik rekam, cuaca, serta kondisi lapangan."
            eyebrow="Pilihan jalur"
            id="routes-heading"
            title={`Rute menuju ${mountain.name}`}
          />
          {mountain.routes.length ? (
            <div className="grid gap-md lg:grid-cols-2">
              {mountain.routes.map((route) => (
                <article
                  className="rounded-xl border border-divider bg-surface-elevated p-lg shadow-surface"
                  key={route.id}
                >
                  <div className="flex flex-wrap items-start justify-between gap-sm">
                    <div>
                      <p className="text-caption text-text-muted">
                        Mulai dari {route.startingPoint}
                      </p>
                      <h3 className="mt-3xs font-heading text-h3 font-semibold text-text-primary">
                        {route.name}
                      </h3>
                    </div>
                    <Badge variant="outline">
                      {DIFFICULTY_LABELS[route.difficulty]}
                    </Badge>
                  </div>
                  <dl className="mt-md grid grid-cols-3 gap-xs border-y border-divider py-sm text-caption">
                    <div>
                      <dt className="flex items-center gap-3xs text-text-muted">
                        <RouteIcon aria-hidden="true" className="size-xs" />
                        Jarak
                      </dt>
                      <dd className="mt-3xs font-semibold tabular-nums text-text-primary">
                        {formatNumber(route.distanceKm, {
                          maximumFractionDigits: 1,
                        })}{" "}
                        km
                      </dd>
                    </div>
                    <div>
                      <dt className="flex items-center gap-3xs text-text-muted">
                        <MountainIcon aria-hidden="true" className="size-xs" />
                        Gain
                      </dt>
                      <dd className="mt-3xs font-semibold tabular-nums text-text-primary">
                        {formatNumber(route.elevationGain)} m
                      </dd>
                    </div>
                    <div>
                      <dt className="flex items-center gap-3xs text-text-muted">
                        <Clock3 aria-hidden="true" className="size-xs" />
                        Waktu
                      </dt>
                      <dd className="mt-3xs font-semibold tabular-nums text-text-primary">
                        {formatNumber(route.estimatedHours, {
                          maximumFractionDigits: 1,
                        })}{" "}
                        jam
                      </dd>
                    </div>
                  </dl>
                  <p className="mt-md text-body-sm text-text-secondary">
                    {route.description}
                  </p>
                  <p className="mt-sm flex items-start gap-2xs text-caption text-text-muted">
                    <Check
                      aria-hidden="true"
                      className="mt-3xs size-xs shrink-0 text-primary"
                    />
                    {route.facilities}
                  </p>
                  <MotionLink
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "mt-md",
                    )}
                    href={`/login?next=${encodeURIComponent(
                      `/mountains/${mountain.slug}#routes`,
                    )}`}
                  >
                    Simpan rute
                  </MotionLink>
                </article>
              ))}
            </div>
          ) : (
            <p className="rounded-lg border border-divider bg-background p-md text-body-sm text-text-secondary">
              Rute terverifikasi belum tersedia untuk gunung ini.
            </p>
          )}
        </Container>
      </section>

      <section
        aria-labelledby="facilities-heading"
        className="bg-background py-3xl md:py-4xl"
      >
        <Container>
          <div className="grid gap-xl lg:grid-cols-2">
            <div>
              <p className="text-label font-semibold text-primary">Fasilitas</p>
              <h2
                className="mt-xs font-heading text-h2 font-semibold text-text-primary"
                id="facilities-heading"
              >
                Logistik yang perlu diperiksa
              </h2>
              <ul className="mt-lg grid gap-sm">
                <li className="flex items-start gap-sm rounded-lg border border-divider bg-surface p-md">
                  <TentTree
                    aria-hidden="true"
                    className="mt-3xs size-sm shrink-0 text-primary"
                  />
                  <div>
                    <p className="font-semibold text-text-primary">
                      Area berkemah
                    </p>
                    <p className="mt-3xs text-body-sm text-text-secondary">
                      {mountain.campingAvailable
                        ? "Tercatat tersedia pada koridor tertentu; konfirmasi area yang diizinkan."
                        : "Tidak tercatat sebagai bagian dari perjalanan ini."}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-sm rounded-lg border border-divider bg-surface p-md">
                  <Droplets
                    aria-hidden="true"
                    className="mt-3xs size-sm shrink-0 text-primary"
                  />
                  <div>
                    <p className="font-semibold text-text-primary">
                      Sumber air
                    </p>
                    <p className="mt-3xs text-body-sm text-text-secondary">
                      {mountain.waterSource
                        ? "Tercatat pada rute, tetapi debit dan kualitas dapat berubah."
                        : "Tidak tercatat; rencanakan membawa kebutuhan air secara mandiri."}
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-divider bg-surface p-lg">
              <CalendarRange
                aria-hidden="true"
                className="size-md text-primary"
              />
              <h2 className="mt-md font-heading text-h2 font-semibold text-text-primary">
                Musim dan waktu
              </h2>
              <p className="mt-sm text-body-lg text-text-secondary">
                Referensi editorial:{" "}
                <strong className="font-semibold text-text-primary">
                  {mountain.bestSeason}
                </strong>
                .
              </p>
              <p className="mt-sm text-body-sm text-text-secondary">
                Musim bukan jaminan kondisi aman. Hujan lokal, angin, kebakaran,
                aktivitas vulkanik, dan kebijakan konservasi dapat mengubah
                akses kapan saja.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="location-heading"
        className="bg-surface py-3xl md:py-4xl"
      >
        <Container>
          <div className="grid items-center gap-xl lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-label font-semibold text-primary">Lokasi</p>
              <h2
                className="mt-xs font-heading text-h2 font-semibold text-text-primary"
                id="location-heading"
              >
                Titik referensi {mountain.name}
              </h2>
              <p className="mt-md text-body-sm text-text-secondary">
                {formatNumber(mountain.latitude, {
                  maximumFractionDigits: 6,
                })}
                ,{" "}
                {formatNumber(mountain.longitude, {
                  maximumFractionDigits: 6,
                })}
              </p>
              <MotionAnchor
                className={cn(buttonVariants({ variant: "outline" }), "mt-lg")}
                href={mapHref}
                rel="noreferrer"
                target="_blank"
              >
                Buka peta eksternal
                <ArrowUpRight aria-hidden="true" data-icon="inline-end" />
                <span className="sr-only">(terbuka di tab baru)</span>
              </MotionAnchor>
            </div>
            <div className="relative aspect-16/8 overflow-hidden rounded-xl border border-divider bg-accent shadow-surface">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--divider)_1px,transparent_1px)] bg-size-[20px_20px]"
              />
              <span className="absolute top-1/2 left-1/2 flex size-2xl -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-floating">
                <MapPin aria-hidden="true" className="size-md" />
              </span>
              <p className="absolute right-sm bottom-sm rounded-full bg-background/90 px-sm py-2xs text-caption text-text-secondary">
                Preview koordinat — bukan peta navigasi
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="gallery-heading"
        className="bg-background py-3xl md:py-4xl"
      >
        <Container>
          <SectionHeading
            description="Semua visual masih berupa ilustrasi placeholder sampai foto berlisensi dan kredit lengkap tersedia."
            eyebrow="Galeri"
            id="gallery-heading"
            title={`Bayangkan perjalanan di ${mountain.name}`}
          />
          <MountainGallery mountainName={mountain.name} slug={mountain.slug} />
        </Container>
      </section>

      <section
        aria-labelledby="similar-heading"
        className="bg-surface py-3xl md:py-4xl"
      >
        <Container>
          <SectionHeading
            description={`Pilihan lain di ${mountain.island} atau dengan tingkat kesulitan yang sejenis.`}
            eyebrow="Lanjut menjelajah"
            id="similar-heading"
            title="Gunung yang mungkin cocok juga"
          />
          <Suspense fallback={<SimilarMountainsSkeleton />}>
            <SimilarMountains mountain={mountain} />
          </Suspense>
        </Container>
      </section>

      <section
        aria-labelledby="detail-faq-heading"
        className="bg-background py-3xl md:py-4xl"
      >
        <Container className="max-w-4xl">
          <SectionHeading
            align="center"
            description="Jawaban awal untuk membantu membaca data dengan konteks yang benar."
            eyebrow="Pertanyaan umum"
            id="detail-faq-heading"
            title={`Sebelum menuju ${mountain.name}`}
          />
          <Accordion className="rounded-xl border border-divider bg-surface-elevated px-md shadow-surface">
            {faqs.map((item) => (
              <AccordionItem key={item.question} value={item.question}>
                <AccordionTrigger className="py-md text-body">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-md text-body-sm text-text-secondary">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </section>
    </>
  );
}
