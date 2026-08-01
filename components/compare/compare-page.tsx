"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Check, GitCompareArrows, Heart, X } from "lucide-react";

import { Container } from "@/components/common/container";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import {
  DIFFICULTY_LABELS,
  type CompareMountain,
} from "@/types/compare";

const MAX_COMPARE_ITEMS = 3;

type ComparePageProps = {
  mountains: CompareMountain[];
};

type Row = {
  key: string;
  label: string;
  value: (mountain: CompareMountain) => React.ReactNode;
  score?: (mountain: CompareMountain) => number;
  rank?: "max" | "min" | "true";
};

function readSlugs(value: string | null) {
  return [...new Set((value ?? "").split(",").map((slug) => slug.trim()))].filter(
    Boolean,
  );
}

function CompareSelectionBar({
  mountains,
  selectedSlugs,
  onRemove,
  onClear,
  onAdd,
}: {
  mountains: CompareMountain[];
  selectedSlugs: string[];
  onRemove: (slug: string) => void;
  onClear: () => void;
  onAdd: (slug: string) => void;
}) {
  const selected = selectedSlugs.flatMap((slug) => {
    const mountain = mountains.find((item) => item.slug === slug);
    return mountain ? [mountain] : [];
  });
  const available = mountains.filter((mountain) => !selectedSlugs.includes(mountain.slug));

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardContent className="flex flex-col gap-md p-md md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <p className="text-label font-semibold text-primary">Pilihan compare</p>
          <div className="mt-xs flex flex-wrap items-center gap-xs">
            {selected.length ? (
              selected.map((mountain) => (
                <Badge className="gap-2xs py-2xs" key={mountain.slug} variant="secondary">
                  <span className="max-w-48 truncate">{mountain.name}</span>
                  <button
                    aria-label={`Hapus ${mountain.name} dari compare`}
                    className="rounded-full p-2xs hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    onClick={() => onRemove(mountain.slug)}
                    type="button"
                  >
                    <X aria-hidden="true" className="size-3" />
                  </button>
                </Badge>
              ))
            ) : (
              <span className="text-body-sm text-text-secondary">Belum ada gunung dipilih.</span>
            )}
          </div>
          <p className="mt-xs text-body-sm text-text-secondary">
            Pilih 2–3 gunung untuk melihat perbandingan berdampingan.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-xs">
          <label className="sr-only" htmlFor="compare-add">Tambah gunung</label>
          <select
            className="h-10 min-w-48 rounded-md border border-divider bg-background px-sm text-body-sm text-text-primary outline-none focus-visible:ring-2 focus-visible:ring-primary"
            disabled={selectedSlugs.length >= MAX_COMPARE_ITEMS || !available.length}
            id="compare-add"
            onChange={(event) => {
              if (event.target.value) {
                onAdd(event.target.value);
                event.currentTarget.value = "";
              }
            }}
            value=""
          >
            <option value="">Tambah gunung…</option>
            {available.map((mountain) => (
              <option key={mountain.slug} value={mountain.slug}>
                {mountain.name}
              </option>
            ))}
          </select>
          <Button onClick={onClear} size="sm" variant="ghost" type="button">
            Hapus semua
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function formatBoolean(value: boolean) {
  return value ? "Tersedia" : "Tidak tersedia";
}

function formatRating(value: number) {
  return `${value}/5`;
}

function getBestIndexes(mountains: CompareMountain[], row: Row) {
  if (!row.rank || !mountains.length) return new Set<number>();
  const values = mountains.map((mountain) => {
    if (row.rank === "true") return row.value(mountain) === "Tersedia" ? 1 : 0;
    return row.score?.(mountain) ?? -Infinity;
  });
  const best = row.rank === "min" ? Math.min(...values) : Math.max(...values);
  return new Set(values.flatMap((value, index) => (value === best ? [index] : [])));
}

function ComparisonTable({ mountains }: { mountains: CompareMountain[] }) {
  const rows: Row[] = [
    {
      key: "hero",
      label: "Hero",
      value: (mountain) => (
        <div className="relative aspect-[4/3] min-w-32 overflow-hidden rounded-md bg-muted">
          <Image alt="" className="object-cover" fill sizes="160px" src={mountain.heroImage} />
        </div>
      ),
    },
    { key: "name", label: "Nama", value: (mountain) => mountain.name },
    { key: "province", label: "Provinsi", value: (mountain) => mountain.province },
    { key: "elevation", label: "Elevasi", value: (mountain) => `${mountain.elevation.toLocaleString("id-ID")} mdpl`, score: (mountain) => mountain.elevation, rank: "max" },
    { key: "difficulty", label: "Kesulitan", value: (mountain) => DIFFICULTY_LABELS[mountain.difficulty] },
    { key: "duration", label: "Durasi", value: (mountain) => `${mountain.durationDays} hari`, score: (mountain) => mountain.durationDays, rank: "min" },
    { key: "beginner", label: "Beginner friendly", value: (mountain) => `${mountain.beginnerScore}/100`, score: (mountain) => mountain.beginnerScore, rank: "max" },
    { key: "camping", label: "Camping", value: (mountain) => formatBoolean(mountain.campingAvailable), rank: "true" },
    { key: "water", label: "Sumber air", value: (mountain) => formatBoolean(mountain.waterSource), rank: "true" },
    { key: "season", label: "Musim terbaik", value: (mountain) => mountain.bestSeason },
    { key: "popularity", label: "Popularitas", value: (mountain) => `${mountain.popularityScore}/100`, score: (mountain) => mountain.popularityScore, rank: "max" },
    { key: "sunrise", label: "Rating sunrise", value: (mountain) => formatRating(mountain.sunriseRating), score: (mountain) => mountain.sunriseRating, rank: "max" },
  ];

  return (
    <div className="overflow-x-auto rounded-xl border border-divider" role="region" aria-label="Tabel perbandingan gunung" tabIndex={0}>
      <table className="w-full min-w-[48rem] border-collapse text-left text-body-sm">
        <caption className="sr-only">Perbandingan atribut gunung yang dipilih</caption>
        <thead className="sticky top-0 z-10 bg-card">
          <tr className="border-b border-divider">
            <th className="sticky left-0 z-20 w-40 bg-card p-sm font-semibold text-text-secondary" scope="col">Atribut</th>
            {mountains.map((mountain) => (
              <th className="min-w-48 p-sm align-top font-semibold text-text-primary" key={mountain.slug} scope="col">{mountain.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const bestIndexes = getBestIndexes(mountains, row);
            return (
              <tr className="border-b border-divider last:border-b-0" key={row.key}>
                <th className="sticky left-0 z-[1] bg-card p-sm font-medium text-text-secondary" scope="row">{row.label}</th>
                {mountains.map((mountain, index) => {
                  const isBest = bestIndexes.has(index);
                  return (
                    <td className={cn("p-sm align-middle text-text-primary", isBest && "bg-primary/5 font-semibold text-primary")} key={mountain.slug}>
                      <span className="inline-flex items-center gap-2xs">
                        {row.value(mountain)}
                        {isBest ? <span className="sr-only"> (terbaik di baris ini)</span> : null}
                      </span>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function CompareCtas({ mountains }: { mountains: CompareMountain[] }) {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="grid gap-sm md:grid-cols-3">
      {mountains.map((mountain) => (
        <Card key={mountain.slug}>
          <CardHeader className="pb-sm"><CardTitle className="text-h4">{mountain.name}</CardTitle></CardHeader>
          <CardContent className="flex flex-wrap gap-xs">
            <Link className={buttonVariants({ size: "sm" })} href={`/mountains/${mountain.slug}`} onClick={() => trackEvent("detail_click", { mountain: mountain.slug })}>Lihat detail</Link>
            <Button
              onClick={() => {
                trackEvent("wishlist_click", { mountain: mountain.slug });
                router.push(`/login?next=${encodeURIComponent(pathname)}`);
              }}
              size="sm"
              type="button"
              variant="outline"
            ><Heart aria-hidden="true" data-icon="inline-start" /> Simpan</Button>
          </CardContent>
        </Card>
      ))}
      <Card className="border-dashed">
        <CardContent className="flex h-full flex-col items-start justify-center gap-xs p-md">
          <p className="font-semibold text-text-primary">Masih bingung memilih?</p>
          <Link className={buttonVariants({ size: "sm", variant: "secondary" })} href="/finder" onClick={() => trackEvent("finder_click")}>Coba Jejak Finder</Link>
        </CardContent>
      </Card>
    </div>
  );
}

export function ComparePage({ mountains }: ComparePageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedSlugs, setSelectedSlugs] = useState(() => readSlugs(searchParams.get("mountains")).slice(0, MAX_COMPARE_ITEMS));
  const completedKey = useRef("");
  const selectedMountains = useMemo(() => selectedSlugs.flatMap((slug) => {
    const mountain = mountains.find((item) => item.slug === slug);
    return mountain ? [mountain] : [];
  }), [mountains, selectedSlugs]);

  useEffect(() => {
    const next = readSlugs(searchParams.get("mountains")).filter((slug) => mountains.some((mountain) => mountain.slug === slug)).slice(0, MAX_COMPARE_ITEMS);
    setSelectedSlugs(next);
  }, [mountains, searchParams]);

  useEffect(() => {
    trackEvent("compare_view", { selected: selectedMountains.length });
  }, [selectedMountains.length]);

  useEffect(() => {
    if (selectedMountains.length >= 2) {
      const key = selectedMountains.map((mountain) => mountain.slug).join(",");
      if (completedKey.current !== key) {
        completedKey.current = key;
        trackEvent("compare_completed", { count: selectedMountains.length });
      }
    }
  }, [selectedMountains]);

  const updateSelection = (next: string[]) => {
    const normalized = [...new Set(next)].slice(0, MAX_COMPARE_ITEMS);
    setSelectedSlugs(normalized);
    const query = normalized.join(",");
    router.replace(query ? `/compare?mountains=${encodeURIComponent(query)}` : "/compare", { scroll: false });
  };

  return (
    <main className="bg-background py-2xl md:py-3xl">
      <Container className="space-y-xl">
        <header className="max-w-3xl">
          <div className="flex items-center gap-xs text-primary"><GitCompareArrows aria-hidden="true" className="size-5" /><p className="text-label font-semibold">Bandingkan gunung</p></div>
          <h1 className="mt-xs font-heading text-h1 font-semibold text-text-primary">Pilih puncak yang paling cocok untuk langkahmu.</h1>
          <p className="mt-sm max-w-reading text-body-lg text-text-secondary">Bandingkan data penting secara berdampingan, lalu lanjutkan ke detail atau Jejak Finder untuk keputusan yang lebih personal.</p>
        </header>

        <CompareSelectionBar
          mountains={mountains}
          onAdd={(slug) => { updateSelection([...selectedSlugs, slug]); trackEvent("mountain_added", { mountain: slug }); }}
          onClear={() => { updateSelection([]); trackEvent("mountain_removed", { mountain: "all" }); }}
          onRemove={(slug) => { updateSelection(selectedSlugs.filter((item) => item !== slug)); trackEvent("mountain_removed", { mountain: slug }); }}
          selectedSlugs={selectedSlugs}
        />

        {selectedMountains.length >= 2 ? (
          <section aria-labelledby="comparison-heading" className="space-y-md">
            <div><h2 className="font-heading text-h2 font-semibold text-text-primary" id="comparison-heading">Perbandingan gunung</h2><p className="mt-2xs text-body-sm text-text-secondary">Sel yang diberi penanda menunjukkan nilai paling menonjol pada baris tersebut.</p></div>
            <ComparisonTable mountains={selectedMountains} />
            <CompareCtas mountains={selectedMountains} />
          </section>
        ) : (
          <Empty className="min-h-72 border-divider bg-surface">
            <EmptyHeader>
              <EmptyMedia variant="icon"><GitCompareArrows aria-hidden="true" /></EmptyMedia>
              <EmptyTitle>Pilih setidaknya dua gunung</EmptyTitle>
              <EmptyDescription>Gunakan pilihan di atas untuk menambahkan gunung dan mulai membandingkan atributnya.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Link className={buttonVariants({ variant: "secondary" })} href="/explore">Jelajahi gunung</Link>
            </EmptyContent>
          </Empty>
        )}
      </Container>
    </main>
  );
}
