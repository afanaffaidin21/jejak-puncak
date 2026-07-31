"use client";

import { useEffect } from "react";

import { trackEvent } from "@/lib/analytics";

export function MountainViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    trackEvent("mountain_view", { mountain: slug });
  }, [slug]);

  return null;
}
