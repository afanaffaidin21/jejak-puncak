export type AnalyticsEventName =
  | "explore_search"
  | "explore_filter"
  | "explore_sort"
  | "mountain_view"
  | "wishlist_redirect"
  | "compare_toggle"
  | "gallery_open"
  | "route_select"
  | "finder_view"
  | "finder_started"
  | "question_answered"
  | "finder_completed"
  | "recommendation_clicked"
  | "wishlist_clicked"
  | "restart_finder";

export function trackEvent(
  name: AnalyticsEventName,
  properties: Record<string, boolean | number | string> = {},
) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent("jejak-puncak:analytics", {
      detail: { name, properties },
    }),
  );
}
