import {
  CalendarDays,
  MapPin,
  Mountain as MountainIcon,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/common/container";
import { DetailActions } from "@/components/mountains/detail-actions";
import { Badge } from "@/components/ui/badge";
import { DIFFICULTY_LABELS, formatDuration } from "@/lib/mountains";
import { formatNumber } from "@/lib/format";
import type { Mountain } from "@/types/mountain";

export function DetailHero({ mountain }: { mountain: Mountain }) {
  return (
    <section className="relative min-h-[72svh] overflow-hidden bg-primary text-primary-foreground">
      <Image
        alt={`Ilustrasi sementara lanskap ${mountain.name}`}
        className="object-cover"
        fill
        priority
        sizes="100vw"
        src={mountain.heroImage}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b from-foreground/25 via-foreground/45 to-foreground/90"
      />
      <Container className="relative flex min-h-[72svh] flex-col justify-between py-lg md:py-xl">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2xs text-caption text-primary-foreground/75">
            <li>
              <Link
                className="rounded-sm hover:text-primary-foreground"
                href="/"
              >
                Beranda
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                className="rounded-sm hover:text-primary-foreground"
                href="/explore"
              >
                Explore
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{mountain.name}</li>
          </ol>
        </nav>

        <div className="max-w-4xl pt-3xl">
          <Badge variant="secondary">
            {DIFFICULTY_LABELS[mountain.difficulty]}
          </Badge>
          <h1 className="mt-sm text-balance font-heading text-display font-semibold text-primary-foreground">
            {mountain.name}
          </h1>
          <p className="mt-sm inline-flex items-center gap-2xs text-body-lg text-primary-foreground/80">
            <MapPin aria-hidden="true" className="size-sm" />
            {mountain.province}, {mountain.island}
          </p>
          <p className="mt-md max-w-reading text-pretty text-body-lg text-primary-foreground/90">
            {mountain.summary}
          </p>

          <dl className="mt-lg flex flex-wrap gap-xs">
            <div className="rounded-full border border-primary-foreground/25 bg-background/10 px-sm py-2xs backdrop-blur">
              <dt className="sr-only">Elevasi</dt>
              <dd className="inline-flex items-center gap-2xs text-label font-semibold tabular-nums">
                <MountainIcon aria-hidden="true" className="size-sm" />
                {formatNumber(mountain.elevation)} mdpl
              </dd>
            </div>
            <div className="rounded-full border border-primary-foreground/25 bg-background/10 px-sm py-2xs backdrop-blur">
              <dt className="sr-only">Durasi</dt>
              <dd className="inline-flex items-center gap-2xs text-label font-semibold tabular-nums">
                <CalendarDays aria-hidden="true" className="size-sm" />
                {formatDuration(mountain.durationDays)}
              </dd>
            </div>
            <div className="rounded-full border border-primary-foreground/25 bg-background/10 px-sm py-2xs backdrop-blur">
              <dt className="sr-only">Musim terbaik</dt>
              <dd className="inline-flex items-center gap-2xs text-label font-semibold">
                <Sparkles aria-hidden="true" className="size-sm" />
                {mountain.bestSeason}
              </dd>
            </div>
          </dl>

          <DetailActions
            className="mt-xl [&_a]:border-primary-foreground/20 [&_button]:border-primary-foreground/30 [&_button]:bg-background/10 [&_button]:text-primary-foreground [&_button]:hover:bg-background/20"
            name={mountain.name}
            slug={mountain.slug}
          />
        </div>
      </Container>
    </section>
  );
}
