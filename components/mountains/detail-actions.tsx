"use client";

import { Bookmark, GitCompareArrows, Route } from "lucide-react";
import { useRouter } from "next/navigation";

import { MotionAnchor } from "@/components/common/motion-primitives";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import { MarkCompletedButton } from "@/components/wishlist/mark-completed-button";
import { WishlistButton } from "@/components/wishlist/wishlist-button";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type DetailActionsProps = {
  className?: string;
  id: string;
  name: string;
  slug: string;
};

const COMPARE_STORAGE_KEY = "jejak-puncak:compare";
const MAX_COMPARE_ITEMS = 3;

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

export function DetailActions({
  className,
  id,
  name,
  slug,
}: DetailActionsProps) {
  const router = useRouter();

  return (
    <div className={cn("flex flex-wrap gap-xs", className)}>
      <MotionAnchor
        className={buttonVariants({ size: "lg" })}
        href="#routes"
        onClick={() => trackEvent("route_select", { mountain: slug })}
      >
        <Route aria-hidden="true" data-icon="inline-start" />
        Lihat rute
      </MotionAnchor>
      <WishlistButton
        icon={Bookmark}
        mountainId={id}
        name={name}
        size="lg"
        slug={slug}
      />
      <MarkCompletedButton mountainId={id} name={name} size="lg" slug={slug} />
      <Button
        onClick={() => {
          const selection = new Set(readCompareSelection());
          if (!selection.has(slug) && selection.size >= MAX_COMPARE_ITEMS)
            return;
          selection.add(slug);
          window.sessionStorage.setItem(
            COMPARE_STORAGE_KEY,
            JSON.stringify([...selection]),
          );
          trackEvent("mountain_added", { mountain: slug });
          router.push(
            `/compare?mountains=${encodeURIComponent([...selection].join(","))}`,
          );
        }}
        size="lg"
        variant="outline"
      >
        <GitCompareArrows aria-hidden="true" data-icon="inline-start" />
        Bandingkan
      </Button>
    </div>
  );
}
