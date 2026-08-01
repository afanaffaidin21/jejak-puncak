const DEFAULT_AUTH_REDIRECT = "/";

export type AuthAnalyticsEvent = "google_failed" | "google_success";

export function getSafeRedirectPath(
  value: string | null | undefined,
  fallback = DEFAULT_AUTH_REDIRECT,
) {
  if (!value?.startsWith("/") || value.startsWith("//")) {
    return fallback;
  }

  try {
    const url = new URL(value, "https://jejak-puncak.local");

    if (url.origin !== "https://jejak-puncak.local") {
      return fallback;
    }

    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return fallback;
  }
}

export function addAuthAnalyticsEvent(path: string, event: AuthAnalyticsEvent) {
  const safePath = getSafeRedirectPath(path);
  const url = new URL(safePath, "https://jejak-puncak.local");
  url.searchParams.set("_auth_event", event);

  return `${url.pathname}${url.search}${url.hash}`;
}
