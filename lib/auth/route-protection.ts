const PROTECTED_ROUTE_PREFIXES = ["/passport", "/profile"] as const;

export function isProtectedRoute(pathname: string) {
  return PROTECTED_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function getRequestedPath(pathname: string, search: string) {
  return `${pathname}${search}`;
}
