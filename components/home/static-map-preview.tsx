"use client";

import { MapPinned } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

const ISLAND_BADGES = [
  { className: "top-[26%] left-[17%]", label: "Sumatra" },
  { className: "top-[58%] left-[42%]", label: "Jawa" },
  { className: "top-[56%] left-[57%]", label: "Bali" },
  { className: "top-[44%] left-[72%]", label: "Nusa Tenggara" },
] as const;

function PlaceholderMap() {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--divider)_1px,transparent_1px)] bg-size-[20px_20px] opacity-70"
      />
      <div
        aria-hidden="true"
        className="absolute inset-[12%] rounded-[45%_55%_50%_40%] border border-primary/15 bg-surface/65 blur-[1px]"
      />
    </>
  );
}

export function StaticMapPreview({ imageUrl }: { imageUrl: string | null }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative aspect-16/9 overflow-hidden rounded-xl border border-divider bg-accent shadow-surface">
      {imageUrl && !imageError ? (
        <Image
          alt="Peta sebaran gunung Indonesia"
          className="object-cover"
          fill
          loading="lazy"
          onError={() => setImageError(true)}
          sizes="(min-width: 1024px) 50vw, 100vw"
          src={imageUrl}
          unoptimized
        />
      ) : (
        <PlaceholderMap />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-foreground/20 via-transparent to-transparent"
      />
      {ISLAND_BADGES.map((marker) => (
        <span
          className={cn(
            "absolute flex items-center gap-2xs rounded-full bg-surface-elevated px-xs py-2xs text-caption font-semibold text-text-primary shadow-floating",
            marker.className,
          )}
          key={marker.label}
        >
          <MapPinned aria-hidden="true" className="size-xs text-primary" />
          {marker.label}
        </span>
      ))}
      <p className="absolute right-sm bottom-sm rounded-full bg-foreground/75 px-sm py-2xs text-caption text-primary-foreground">
        Peta interaktif penuh tersedia di halaman Map
      </p>
    </div>
  );
}
