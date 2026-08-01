"use client";

import { GitCompareArrows, Heart } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const MAX_COMPARE_ITEMS = 3;
const COMPARE_STORAGE_KEY = "jejak-puncak:compare";

function readCompareSelection() {
  try {
    const value = window.sessionStorage.getItem(COMPARE_STORAGE_KEY);
    const parsed: unknown = value ? JSON.parse(value) : [];
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

type MountainCardActionsProps = {
  name: string;
  slug: string;
};

export function MountainCardActions({ name, slug }: MountainCardActionsProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isCompared, setIsCompared] = useState(false);
  const [compareMessage, setCompareMessage] = useState("");

  const handleWishlist = () => {
    trackEvent("wishlist_redirect", { mountain: slug });
    router.push(`/login?next=${encodeURIComponent(`${pathname}#${slug}`)}`);
  };

  const handleCompare = () => {
    const selection = new Set(readCompareSelection());

    if (selection.has(slug)) {
      selection.delete(slug);
      setIsCompared(false);
      setCompareMessage(`${name} dihapus dari pilihan compare.`);
    } else if (selection.size >= MAX_COMPARE_ITEMS) {
      setCompareMessage("Compare sementara dibatasi maksimal tiga gunung.");
      return;
    } else {
      selection.add(slug);
      setIsCompared(true);
      setCompareMessage(`${name} ditambahkan ke pilihan compare.`);
    }

    window.sessionStorage.setItem(
      COMPARE_STORAGE_KEY,
      JSON.stringify([...selection]),
    );
    if (selection.has(slug)) {
      router.push(
        `/compare?mountains=${encodeURIComponent([...selection].join(","))}`,
      );
    }
    trackEvent("compare_toggle", {
      active: selection.has(slug),
      mountain: slug,
    });
    trackEvent(selection.has(slug) ? "mountain_added" : "mountain_removed", {
      mountain: slug,
    });
  };

  return (
    <>
      <div className="flex items-center gap-3xs">
        <Button
          aria-label={`Simpan ${name} ke wishlist — perlu login`}
          onClick={handleWishlist}
          size="icon-sm"
          title="Simpan ke wishlist (perlu login)"
          variant="outline"
        >
          <Heart aria-hidden="true" />
        </Button>
        <Button
          aria-label={`${isCompared ? "Hapus" : "Tambahkan"} ${name} ${
            isCompared ? "dari" : "ke"
          } compare`}
          aria-pressed={isCompared}
          onClick={handleCompare}
          size="icon-sm"
          title="Pilih untuk compare"
          variant={isCompared ? "secondary" : "outline"}
        >
          <GitCompareArrows aria-hidden="true" />
        </Button>
      </div>
      <span aria-live="polite" className="sr-only">
        {compareMessage}
      </span>
    </>
  );
}
