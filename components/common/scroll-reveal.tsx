"use client";

import type { ComponentProps, CSSProperties, ReactNode } from "react";

import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";

type ScrollRevealProps = ComponentProps<"div"> & {
  children: ReactNode;
  delay?: number;
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  style,
  ...props
}: ScrollRevealProps) {
  const { isVisible, ref } = useScrollReveal<HTMLDivElement>();
  const revealStyle = delay
    ? ({ ...style, transitionDelay: `${delay}ms` } as CSSProperties)
    : style;

  return (
    <div
      ref={ref}
      className={cn(
        "motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)]",
        !isVisible && "motion-safe:translate-y-lg motion-safe:opacity-0",
        className,
      )}
      style={revealStyle}
      {...props}
    >
      {children}
    </div>
  );
}
