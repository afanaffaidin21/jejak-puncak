"use client";

import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Heart,
  Info,
  MapPin,
  Mountain,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Container } from "@/components/common/container";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { formatNumber } from "@/lib/format";
import { trackEvent } from "@/lib/analytics";
import { DIFFICULTY_LABELS, formatDuration } from "@/lib/mountains";
import { cn } from "@/lib/utils";
import type {
  FinderAiStatus,
  FinderRecommendation,
  FinderResultPayload,
} from "@/types/finder";

type FinderResultsProps = {
  onRestart: () => void;
  result: FinderResultPayload;
};

const AI_FALLBACK_MESSAGES: Record<
  Exclude<FinderAiStatus, "available">,
  string
> = {
  not_configured:
    "Penjelasan AI belum dikonfigurasi. Ringkasan ini berasal langsung dari hasil scoring terstruktur.",
  rate_limited:
    "Batas penjelasan AI sementara tercapai. Hasil dan alasannya tetap berasal dari scoring yang sama.",
  unavailable:
    "Penjelasan AI sementara tidak tersedia. Hasil utama tetap lengkap dan tidak berubah.",
};

function FinderWishlistButton({ name, slug }: { name: string; slug: string }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Button
      aria-label={`Simpan ${name} ke wishlist — perlu login`}
      onClick={() => {
        trackEvent("wishlist_clicked", { mountain: slug, source: "finder" });
        router.push(`/login?next=${encodeURIComponent(pathname)}`);
      }}
      variant="outline"
    >
      <Heart aria-hidden="true" data-icon="inline-start" />
      Wishlist
    </Button>
  );
}

function RecommendationCard({
  rank,
  recommendation,
}: {
  rank: number;
  recommendation: FinderRecommendation;
}) {
  const { mountain } = recommendation;
  const detailHref = `/mountains/${mountain.slug}`;

  return (
    <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-card shadow-surface">
      <div className="relative aspect-16/10 overflow-hidden bg-muted">
        <Image
          alt={`Lanskap ${mountain.name}`}
          className="object-cover transition-transform duration-slow ease-emphasized hover:scale-[1.03]"
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          src={mountain.heroImage}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-foreground/55 via-transparent to-transparent"
        />
        <Badge
          className="absolute top-sm left-sm"
          variant={rank === 1 ? "default" : "secondary"}
        >
          #{rank} rekomendasi
        </Badge>
        <div
          aria-label={`Skor kecocokan ${recommendation.score} persen`}
          className="absolute right-sm bottom-sm rounded-lg bg-background/90 px-xs py-2xs text-right shadow-surface backdrop-blur-sm"
        >
          <span className="block text-caption text-text-secondary">
            Kecocokan
          </span>
          <span className="font-heading text-h3 font-semibold tabular-nums text-text-primary">
            {recommendation.score}%
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-sm md:p-md">
        <div className="flex flex-wrap items-center gap-2xs text-caption text-text-muted">
          <span className="inline-flex items-center gap-3xs">
            <MapPin aria-hidden="true" className="size-xs" />
            {mountain.province}
          </span>
          <span aria-hidden="true">•</span>
          <span>{DIFFICULTY_LABELS[mountain.difficulty]}</span>
        </div>
        <h3 className="mt-2xs font-heading text-h3 font-semibold text-text-primary">
          {mountain.name}
        </h3>

        <dl className="mt-sm grid grid-cols-2 gap-xs rounded-lg bg-muted/65 p-xs text-caption text-text-muted">
          <div>
            <dt className="inline-flex items-center gap-3xs">
              <Mountain aria-hidden="true" className="size-xs" />
              Elevasi
            </dt>
            <dd className="mt-3xs font-semibold tabular-nums text-text-primary">
              {formatNumber(mountain.elevation)} mdpl
            </dd>
          </div>
          <div>
            <dt className="inline-flex items-center gap-3xs">
              <CalendarDays aria-hidden="true" className="size-xs" />
              Durasi
            </dt>
            <dd className="mt-3xs font-semibold text-text-primary">
              {formatDuration(mountain.durationDays)}
            </dd>
          </div>
        </dl>

        <div className="mt-md grid gap-sm text-body-sm">
          <div>
            <p className="inline-flex items-center gap-2xs font-semibold text-text-primary">
              <CheckCircle2
                aria-hidden="true"
                className="size-sm text-success"
              />
              Alasan cocok
            </p>
            <ul className="mt-2xs grid list-disc gap-3xs pl-sm text-text-secondary marker:text-success">
              {recommendation.reasons.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="inline-flex items-center gap-2xs font-semibold text-text-primary">
              <Info
                aria-hidden="true"
                className="size-sm text-warning-foreground"
              />
              Trade-off
            </p>
            <ul className="mt-2xs grid list-disc gap-3xs pl-sm text-text-secondary marker:text-warning-foreground">
              {recommendation.tradeOffs.map((tradeOff) => (
                <li key={tradeOff}>{tradeOff}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-auto flex flex-wrap gap-xs pt-md">
          <Link
            className={buttonVariants()}
            href={detailHref}
            onClick={() =>
              trackEvent("recommendation_clicked", {
                mountain: mountain.slug,
                rank,
              })
            }
          >
            Lihat detail
            <ArrowUpRight aria-hidden="true" data-icon="inline-end" />
          </Link>
          <FinderWishlistButton name={mountain.name} slug={mountain.slug} />
        </div>
      </div>
    </article>
  );
}

export function FinderResults({ onRestart, result }: FinderResultsProps) {
  const topRecommendation = result.recommendations[0];

  if (!topRecommendation) {
    return (
      <section className="bg-surface py-3xl md:py-5xl">
        <Container className="max-w-2xl text-center">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-muted text-text-secondary">
            <Mountain aria-hidden="true" className="size-lg" />
          </span>
          <h1 className="mt-md text-balance font-heading text-h2 font-semibold text-text-primary">
            Belum ada rekomendasi yang sesuai.
          </h1>
          <p className="mt-sm text-pretty text-text-secondary">
            Coba sesuaikan jawabanmu atau jelajahi katalog lengkap untuk
            menemukan pilihan lain.
          </p>
          <div className="mt-lg flex flex-wrap justify-center gap-xs">
            <Button onClick={onRestart} variant="outline">
              <RotateCcw aria-hidden="true" data-icon="inline-start" />
              Ulangi Finder
            </Button>
            <Link className={buttonVariants()} href="/explore">
              Kembali ke Explore
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  const explanation = result.explanation ?? {
    summary: `${topRecommendation.mountain.name} menjadi rekomendasi teratas berdasarkan jawaban dan data kecocokan yang tersedia.`,
    mainReasons: topRecommendation.reasons,
    tradeOffs: topRecommendation.tradeOffs,
    cta: `Pelajari detail ${topRecommendation.mountain.name} sebelum menyusun rencana.`,
  };
  const detailHref = `/mountains/${topRecommendation.mountain.slug}`;

  return (
    <div className="bg-surface pb-4xl">
      <section className="bg-primary py-2xl text-primary-foreground md:py-3xl">
        <Container>
          <div className="grid items-end gap-lg lg:grid-cols-[minmax(0,1fr)_auto]">
            <div className="max-w-3xl">
              <p className="text-label font-semibold text-primary-foreground/75">
                Kecocokan teratasmu
              </p>
              <h1 className="mt-xs text-balance font-heading text-h1 font-semibold">
                {topRecommendation.mountain.name}
              </h1>
              <p className="mt-sm max-w-2xl text-pretty text-body-lg text-primary-foreground/80">
                {topRecommendation.mountain.province} ·{" "}
                {DIFFICULTY_LABELS[topRecommendation.mountain.difficulty]} ·{" "}
                {formatDuration(topRecommendation.mountain.durationDays)}
              </p>
            </div>
            <div className="flex items-end gap-md rounded-xl border border-primary-foreground/25 bg-background/10 p-md backdrop-blur-sm">
              <div>
                <p className="text-caption text-primary-foreground/70">
                  Match score
                </p>
                <p className="font-heading text-h1 font-semibold tabular-nums">
                  {topRecommendation.score}%
                </p>
              </div>
              <CheckCircle2 aria-hidden="true" className="mb-2xs size-lg" />
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <section
          aria-labelledby="finder-explanation-heading"
          className="relative z-10 -mt-lg rounded-xl border border-border bg-card p-sm shadow-floating sm:p-lg md:-mt-xl md:p-xl"
        >
          <div className="flex flex-wrap items-center gap-xs">
            <span className="grid size-touch place-items-center rounded-full bg-primary/10 text-primary">
              <Sparkles aria-hidden="true" className="size-sm" />
            </span>
            <div>
              <p className="text-caption font-semibold tracking-wider text-primary uppercase">
                {result.explanation
                  ? "Penjelasan rekomendasi"
                  : "Ringkasan berbasis scoring"}
              </p>
              <h2
                className="font-heading text-h3 font-semibold text-text-primary"
                id="finder-explanation-heading"
              >
                Mengapa pilihan ini berada di urutan pertama
              </h2>
            </div>
          </div>

          {!result.explanation && result.aiStatus !== "available" ? (
            <p
              className="mt-sm rounded-lg bg-muted px-sm py-xs text-body-sm text-text-secondary"
              role="status"
            >
              {AI_FALLBACK_MESSAGES[result.aiStatus]}
            </p>
          ) : null}

          <p className="mt-md max-w-3xl text-pretty text-body-lg text-text-secondary">
            {explanation.summary}
          </p>
          <div className="mt-md grid gap-md md:grid-cols-2">
            <div>
              <h3 className="font-semibold text-text-primary">Alasan utama</h3>
              <ul className="mt-xs grid list-disc gap-2xs pl-sm text-text-secondary marker:text-success">
                {explanation.mainReasons.map((reason) => (
                  <li key={reason}>{reason}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">
                Yang perlu dipertimbangkan
              </h3>
              <ul className="mt-xs grid list-disc gap-2xs pl-sm text-text-secondary marker:text-warning-foreground">
                {explanation.tradeOffs.map((tradeOff) => (
                  <li key={tradeOff}>{tradeOff}</li>
                ))}
              </ul>
            </div>
          </div>
          <Link
            className={cn(buttonVariants({ variant: "outline" }), "mt-md")}
            href={detailHref}
            onClick={() =>
              trackEvent("recommendation_clicked", {
                mountain: topRecommendation.mountain.slug,
                rank: 1,
                source: "explanation",
              })
            }
          >
            {explanation.cta}
            <ArrowRight aria-hidden="true" data-icon="inline-end" />
          </Link>
        </section>

        <section
          aria-labelledby="recommendation-list-heading"
          className="mt-2xl md:mt-3xl"
        >
          <div className="flex flex-wrap items-end justify-between gap-sm">
            <div>
              <p className="text-label font-semibold text-primary">
                Pilihan untukmu
              </p>
              <h2
                className="mt-2xs text-balance font-heading text-h2 font-semibold text-text-primary"
                id="recommendation-list-heading"
              >
                Bandingkan hingga tiga rekomendasi
              </h2>
            </div>
            <Button onClick={onRestart} variant="outline">
              <RotateCcw aria-hidden="true" data-icon="inline-start" />
              Ulangi Finder
            </Button>
          </div>

          <div className="mt-lg grid gap-md md:grid-cols-2 xl:grid-cols-3">
            {result.recommendations.slice(0, 3).map((recommendation, index) => (
              <RecommendationCard
                key={recommendation.mountain.id}
                rank={index + 1}
                recommendation={recommendation}
              />
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
