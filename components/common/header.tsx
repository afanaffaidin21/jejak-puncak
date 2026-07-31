import { MountainSnow, UserRound } from "lucide-react";
import Link from "next/link";

import { StickyHeader } from "@/components/common/sticky-header";
import { cn } from "@/lib/utils";

const PRIMARY_NAV_ITEMS = [
  { href: "/explore", label: "Explore" },
  { href: "/map", label: "Map" },
  { href: "/compare", label: "Compare" },
  { href: "/finder", label: "Finder" },
  { href: "/passport", label: "Passport" },
] as const;

type HeaderProps = {
  className?: string;
  isAuthenticated?: boolean;
  variant?: "solid" | "transparent";
};

const navigationLinkClassName = cn(
  "inline-flex min-h-touch items-center rounded-md px-xs text-label font-medium text-text-secondary",
  "transition-colors duration-fast ease-standard hover:bg-muted hover:text-text-primary",
  "group-data-[appearance=transparent]/site-header:text-primary-foreground",
  "group-data-[appearance=transparent]/site-header:hover:bg-background/15",
);

export function Header({
  className,
  isAuthenticated = false,
  variant = "solid",
}: HeaderProps) {
  const accountLabel = isAuthenticated ? "Profile" : "Login";
  const accountHref = isAuthenticated ? "/profile" : "/login";

  return (
    <StickyHeader className={className} variant={variant}>
      <div className="mx-auto flex min-h-mobile-nav w-full max-w-content items-center justify-between gap-md px-sm sm:px-md lg:px-lg">
        <Link
          className="inline-flex min-h-touch items-center gap-2xs rounded-md font-heading text-h4 font-semibold tracking-tight text-text-primary group-data-[appearance=transparent]/site-header:text-primary-foreground"
          href="/"
          aria-label="Jejak Puncak — Beranda"
        >
          <MountainSnow
            aria-hidden="true"
            className="size-md"
            strokeWidth={1.8}
          />
          <span>Jejak Puncak</span>
        </Link>

        <div className="hidden items-center gap-2xs lg:flex">
          <nav aria-label="Navigasi utama">
            <ul className="flex items-center gap-3xs">
              {PRIMARY_NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link className={navigationLinkClassName} href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <span aria-hidden="true" className="mx-2xs h-md w-px bg-divider" />

          <Link
            className={cn(
              navigationLinkClassName,
              "gap-2xs border border-border bg-surface-elevated text-text-primary shadow-flat hover:shadow-surface",
              "group-data-[appearance=transparent]/site-header:border-primary-foreground/35",
              "group-data-[appearance=transparent]/site-header:bg-background/15",
            )}
            href={accountHref}
          >
            <UserRound
              aria-hidden="true"
              className="size-sm"
              strokeWidth={1.8}
            />
            {accountLabel}
          </Link>
        </div>
      </div>
    </StickyHeader>
  );
}
