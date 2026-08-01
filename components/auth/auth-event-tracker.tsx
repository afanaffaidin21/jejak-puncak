"use client";

import { useEffect } from "react";

import { trackEvent } from "@/lib/analytics";

export function AuthEventTracker() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const event = url.searchParams.get("_auth_event");

    if (event === "google_success") {
      trackEvent("login_success", { provider: "google" });
    } else if (event === "google_failed") {
      trackEvent("login_failed", { provider: "google" });
    } else {
      return;
    }

    url.searchParams.delete("_auth_event");
    window.history.replaceState(
      window.history.state,
      "",
      `${url.pathname}${url.search}${url.hash}`,
    );
  }, []);

  return null;
}
