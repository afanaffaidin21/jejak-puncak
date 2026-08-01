export type AnalyticsEventName =
  | "login_page_view"
  | "login_success"
  | "login_failed"
  | "register_started"
  | "register_completed"
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
  | "restart_finder"
  | "compare_view"
  | "mountain_added"
  | "mountain_removed"
  | "compare_completed"
  | "ai_summary_view"
  | "detail_click"
  | "wishlist_click"
  | "finder_click"
  | "map_view"
  | "marker_click"
  | "preview_open"
  | "filter_region"
  | "reset_map";

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
