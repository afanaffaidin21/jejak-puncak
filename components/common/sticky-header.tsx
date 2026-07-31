"use client";

import { useEffect, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type StickyHeaderProps = {
  children: ReactNode;
  className?: string;
  variant?: "solid" | "transparent";
};

export function StickyHeader({
  children,
  className,
  variant = "solid",
}: StickyHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 8);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  const isTransparent = variant === "transparent" && !isScrolled;

  return (
    <header
      className={cn(
        "group/site-header sticky top-0 z-sticky w-full border-b transition-[background-color,border-color,box-shadow] duration-normal ease-standard",
        isTransparent
          ? "border-transparent bg-transparent text-primary-foreground shadow-flat"
          : "border-divider bg-background/95 text-text-primary shadow-surface backdrop-blur supports-[backdrop-filter]:bg-background/85",
        className,
      )}
      data-appearance={isTransparent ? "transparent" : "solid"}
      data-scrolled={isScrolled ? "true" : "false"}
    >
      {children}
    </header>
  );
}
