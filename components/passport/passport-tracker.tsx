"use client";

import { useEffect } from "react";

import { trackEvent } from "@/lib/analytics";

export function PassportTracker() {
  useEffect(() => {
    trackEvent("passport_view");
  }, []);

  return null;
}
