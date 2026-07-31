"use client";

import { Bookmark, Route } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { Button, buttonVariants } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type DetailActionsProps = {
  className?: string;
  name: string;
  slug: string;
};

export function DetailActions({ className, name, slug }: DetailActionsProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className={cn("flex flex-wrap gap-xs", className)}>
      <a
        className={buttonVariants({ size: "lg" })}
        href="#routes"
        onClick={() => trackEvent("route_select", { mountain: slug })}
      >
        <Route aria-hidden="true" data-icon="inline-start" />
        Lihat rute
      </a>
      <Button
        aria-label={`Simpan ${name} ke wishlist — perlu login`}
        onClick={() => {
          trackEvent("wishlist_redirect", { mountain: slug });
          router.push(`/login?next=${encodeURIComponent(pathname)}`);
        }}
        size="lg"
        variant="outline"
      >
        <Bookmark aria-hidden="true" data-icon="inline-start" />
        Simpan
      </Button>
    </div>
  );
}
