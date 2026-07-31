"use client";

import {
  Compass,
  Map,
  Search,
  Stamp,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

type MobileNavigationItem = {
  href: string;
  icon: LucideIcon;
  label: string;
  primary?: boolean;
};

const MOBILE_NAV_ITEMS = [
  { href: "/explore", icon: Compass, label: "Explore" },
  { href: "/map", icon: Map, label: "Map" },
  { href: "/finder", icon: Search, label: "Finder", primary: true },
  { href: "/passport", icon: Stamp, label: "Passport" },
  { href: "/profile", icon: UserRound, label: "Profile" },
] satisfies readonly MobileNavigationItem[];

function isCurrentPath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navigasi utama mobile"
      className="fixed inset-x-0 bottom-0 z-sticky border-t border-divider bg-background/95 pb-safe-area shadow-floating backdrop-blur supports-[backdrop-filter]:bg-background/85 lg:hidden"
    >
      <ul className="mx-auto grid min-h-mobile-nav max-w-reading grid-cols-5 px-2xs">
        {MOBILE_NAV_ITEMS.map((item) => {
          const isActive = isCurrentPath(pathname, item.href);
          const Icon = item.icon;

          return (
            <li className="min-w-0" key={item.href}>
              <Link
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative flex h-full min-h-touch flex-col items-center justify-center gap-3xs rounded-md px-3xs py-2xs text-caption font-medium text-text-muted",
                  "transition-[color,transform] duration-fast ease-standard hover:text-text-primary",
                  isActive && "font-semibold text-text-primary",
                  item.primary && "-translate-y-xs text-primary",
                )}
                href={item.href}
              >
                <span
                  className={cn(
                    "flex size-lg items-center justify-center rounded-full transition-[background-color,box-shadow,transform] duration-fast ease-standard",
                    isActive && !item.primary && "bg-accent shadow-surface",
                    item.primary &&
                      "size-touch bg-primary text-primary-foreground shadow-floating",
                  )}
                >
                  <Icon
                    aria-hidden="true"
                    className="size-sm"
                    strokeWidth={isActive || item.primary ? 2.4 : 1.8}
                  />
                </span>
                <span>{item.label}</span>
                {isActive && !item.primary ? (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-3xs h-3xs w-md rounded-full bg-primary"
                  />
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
