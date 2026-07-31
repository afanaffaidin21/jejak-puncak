"use client";

import { ArrowUp } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { ContentCardSkeleton } from "@/components/common/content-card-skeleton";
import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import { MountainCardActions } from "@/components/explore/mountain-card-actions";
import { MountainCard } from "@/components/mountains/mountain-card";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { MountainCardData } from "@/types/mountain";

type MountainApiResult = {
  hasMore: boolean;
  mountains: MountainCardData[];
  page: number;
};

type InfiniteMountainGridProps = {
  baseQuery: string;
  initialHasMore: boolean;
  initialMountains: MountainCardData[];
  initialPage: number;
};

export function InfiniteMountainGrid({
  baseQuery,
  initialHasMore,
  initialMountains,
  initialPage,
}: InfiniteMountainGridProps) {
  const [mountains, setMountains] = useState(initialMountains);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [page, setPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  const loadMore = useCallback(async () => {
    if (!hasMore || loadingRef.current) {
      return;
    }

    loadingRef.current = true;
    setIsLoading(true);
    setLoadError("");

    const params = new URLSearchParams(baseQuery);
    params.set("page", String(page + 1));

    try {
      const response = await fetch(`/api/mountains?${params.toString()}`);

      if (!response.ok) {
        throw new Error("Request halaman berikutnya gagal.");
      }

      const result = (await response.json()) as MountainApiResult;
      setMountains((current) => {
        const uniqueMountains = new Map(
          current.map((mountain) => [mountain.id, mountain]),
        );
        result.mountains.forEach((mountain) => {
          uniqueMountains.set(mountain.id, mountain);
        });
        return [...uniqueMountains.values()];
      });
      setPage(result.page);
      setHasMore(result.hasMore);
    } catch {
      setLoadError(
        "Hasil berikutnya belum dapat dimuat. Periksa koneksi lalu coba lagi.",
      );
    } finally {
      loadingRef.current = false;
      setIsLoading(false);
    }
  }, [baseQuery, hasMore, page]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          void loadMore();
        }
      },
      { rootMargin: "320px 0px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  useEffect(() => {
    const updateVisibility = () => {
      setShowBackToTop(window.scrollY > window.innerHeight);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  if (!mountains.length) {
    return (
      <EmptyState
        action={
          <Link
            className={buttonVariants({ variant: "outline" })}
            href="/explore"
          >
            Hapus semua filter
          </Link>
        }
        description="Coba ubah kata pencarian atau kurangi beberapa filter."
        title="Belum ada gunung yang cocok"
      />
    );
  }

  return (
    <>
      <div className="grid gap-md sm:grid-cols-2 xl:grid-cols-3">
        {mountains.map((mountain, index) => (
          <article id={mountain.slug} key={mountain.id}>
            <MountainCard
              actions={
                <MountainCardActions
                  name={mountain.name}
                  slug={mountain.slug}
                />
              }
              mountain={mountain}
              priority={index < 2}
            />
          </article>
        ))}
      </div>

      {isLoading ? (
        <div
          aria-label="Memuat lebih banyak gunung"
          className="mt-md grid gap-md sm:grid-cols-2 xl:grid-cols-3"
          role="status"
        >
          {Array.from({ length: 3 }, (_, index) => (
            <ContentCardSkeleton key={index} />
          ))}
        </div>
      ) : null}

      {loadError ? (
        <ErrorState
          action={
            <Button onClick={() => void loadMore()} variant="outline">
              Coba lagi
            </Button>
          }
          className="mt-md"
          description={loadError}
          title="Hasil berikutnya tertunda"
        />
      ) : null}

      <div className="mt-lg flex min-h-touch items-center justify-center">
        {hasMore ? (
          <div className="w-full text-center" ref={sentinelRef}>
            <Button
              disabled={isLoading}
              onClick={() => void loadMore()}
              variant="outline"
            >
              Muat lebih banyak
            </Button>
          </div>
        ) : (
          <p className="text-body-sm text-text-muted">
            Semua hasil sudah ditampilkan.
          </p>
        )}
      </div>

      <button
        aria-label="Kembali ke atas"
        className={cn(
          "fixed right-sm bottom-[calc(var(--spacing-mobile-nav)+var(--spacing-sm)+var(--spacing-safe-area))] z-sticky flex size-touch items-center justify-center rounded-full bg-primary text-primary-foreground shadow-floating transition-[opacity,transform] duration-normal lg:bottom-lg",
          showBackToTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-sm opacity-0",
        )}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        type="button"
      >
        <ArrowUp aria-hidden="true" className="size-sm" />
      </button>
    </>
  );
}
