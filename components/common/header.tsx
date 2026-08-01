"use client";

import { LogOut, MountainSnow, Stamp, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { logoutAction } from "@/app/login/actions";
import type { AuthUserSummary } from "@/components/auth/auth-provider";
import { Container } from "@/components/common/container";
import { StickyHeader } from "@/components/common/sticky-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/hooks/use-user";
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
  variant?: "solid" | "transparent";
};

type AccountControlProps = {
  compact?: boolean;
  isLoading: boolean;
  isLoggingOut: boolean;
  onLogout: () => void;
  pathname: string;
  user: AuthUserSummary | null;
};

const navigationLinkClassName = cn(
  "inline-flex min-h-touch items-center rounded-md px-xs text-label font-medium text-text-secondary",
  "transition-colors duration-fast ease-standard hover:bg-muted hover:text-text-primary",
  "group-data-[appearance=transparent]/site-header:text-primary-foreground",
  "group-data-[appearance=transparent]/site-header:hover:bg-background/15",
);

const accountButtonClassName = cn(
  "gap-2xs border-border bg-surface-elevated text-text-primary shadow-flat hover:shadow-surface",
  "group-data-[appearance=transparent]/site-header:border-primary-foreground/35",
  "group-data-[appearance=transparent]/site-header:bg-background/15",
  "group-data-[appearance=transparent]/site-header:text-primary-foreground",
);

function getInitials(displayName: string) {
  return displayName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function AccountControl({
  compact = false,
  isLoading,
  isLoggingOut,
  onLogout,
  pathname,
  user,
}: AccountControlProps) {
  if (isLoading) {
    return <Skeleton className={compact ? "size-touch" : "h-touch w-28"} />;
  }

  if (!user) {
    return (
      <Link
        aria-label={compact ? "Login" : undefined}
        className={cn(
          navigationLinkClassName,
          accountButtonClassName,
          compact && "size-touch justify-center px-0",
        )}
        href={`/login?redirect=${encodeURIComponent(pathname)}`}
      >
        <UserRound aria-hidden="true" />
        <span className={compact ? "sr-only" : undefined}>Login</span>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            aria-label={compact ? `Menu akun ${user.displayName}` : undefined}
            className={cn(accountButtonClassName, compact && "size-touch px-0")}
            size={compact ? "icon" : "default"}
            variant="outline"
          />
        }
      >
        <Avatar size={compact ? "default" : "sm"}>
          {user.avatarUrl ? <AvatarImage alt="" src={user.avatarUrl} /> : null}
          <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
        </Avatar>
        <span className={compact ? "sr-only" : "max-w-32 truncate"}>
          {user.displayName}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <span className="block truncate text-text-primary">
              {user.displayName}
            </span>
            <span className="block truncate font-normal">{user.email}</span>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem render={<Link href="/profile" />}>
            <UserRound aria-hidden="true" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href="/passport" />}>
            <Stamp aria-hidden="true" />
            Passport
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            disabled={isLoggingOut}
            onClick={onLogout}
            variant="destructive"
          >
            <LogOut aria-hidden="true" />
            {isLoggingOut ? "Keluar…" : "Logout"}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header({ className, variant }: HeaderProps) {
  const pathname = usePathname();
  const { isLoading, user } = useUser();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const resolvedVariant =
    variant ?? (pathname === "/" ? "transparent" : "solid");

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const result = await logoutAction();
    setIsLoggingOut(false);

    if (result.success) {
      window.location.replace("/");
    }
  };

  return (
    <StickyHeader className={className} variant={resolvedVariant}>
      <Container className="flex min-h-mobile-nav items-center justify-between gap-md">
        <Link
          aria-label="Jejak Puncak — Beranda"
          className="inline-flex min-h-touch items-center gap-2xs rounded-md font-heading text-h4 font-semibold tracking-tight text-text-primary group-data-[appearance=transparent]/site-header:text-primary-foreground"
          href="/"
        >
          <MountainSnow
            aria-hidden="true"
            className="size-md"
            strokeWidth={1.8}
          />
          <span translate="no">Jejak Puncak</span>
        </Link>

        <div className="lg:hidden">
          <AccountControl
            compact
            isLoading={isLoading}
            isLoggingOut={isLoggingOut}
            onLogout={() => void handleLogout()}
            pathname={pathname}
            user={user}
          />
        </div>

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

          <AccountControl
            isLoading={isLoading}
            isLoggingOut={isLoggingOut}
            onLogout={() => void handleLogout()}
            pathname={pathname}
            user={user}
          />
        </div>
      </Container>
    </StickyHeader>
  );
}
