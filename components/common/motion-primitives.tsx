"use client";

import type { ComponentProps, ReactNode } from "react";
import { type MotionProps, useReducedMotion } from "framer-motion";
import * as m from "framer-motion/m";
import Link from "next/link";

import { cn } from "@/lib/utils";

const STAGGER_VIEWPORT = {
  amount: 0.12,
  margin: "0px 0px -80px 0px",
  once: true,
} as const;

const STAGGER_CONTAINER_VARIANTS = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.05,
      staggerChildren: 0.09,
    },
  },
};

const STAGGER_ITEM_VARIANTS = {
  hidden: { opacity: 0, scale: 0.97, y: 24 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

const CARD_SPRING = {
  damping: 18,
  mass: 0.7,
  stiffness: 220,
  type: "spring" as const,
};

type StaggerProps = {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
};

const MotionLinkBase = m.create(Link);

type MotionAnchorProps = Omit<ComponentProps<"a">, keyof MotionProps> &
  MotionProps & { children: ReactNode };

export function MotionAnchor({ children, ...props }: MotionAnchorProps) {
  const reduceMotion = useReducedMotion();

  return (
    <m.a
      {...props}
      transition={reduceMotion ? { duration: 0 } : CARD_SPRING}
      whileHover={reduceMotion ? undefined : { y: -8 }}
      whileTap={reduceMotion ? undefined : { scale: 0.95 }}
    >
      {children}
    </m.a>
  );
}

export function MotionLink({
  children,
  ...props
}: Omit<ComponentProps<typeof Link>, keyof MotionProps> &
  MotionProps & { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <MotionLinkBase
      {...props}
      transition={reduceMotion ? { duration: 0 } : CARD_SPRING}
      whileHover={reduceMotion ? undefined : { y: -8 }}
      whileTap={reduceMotion ? undefined : { scale: 0.95 }}
    >
      {children}
    </MotionLinkBase>
  );
}

export function StaggerGrid({ children, className }: StaggerProps) {
  const reduceMotion = useReducedMotion();

  return (
    <m.div
      className={cn(className)}
      initial={reduceMotion ? false : "hidden"}
      variants={reduceMotion ? undefined : STAGGER_CONTAINER_VARIANTS}
      viewport={STAGGER_VIEWPORT}
      whileInView={reduceMotion ? undefined : "visible"}
    >
      {children}
    </m.div>
  );
}

export function StaggerItem({
  children,
  className,
  interactive = false,
}: StaggerProps) {
  const reduceMotion = useReducedMotion();

  return (
    <m.div
      className={cn(className)}
      variants={reduceMotion ? undefined : STAGGER_ITEM_VARIANTS}
      transition={reduceMotion ? { duration: 0 } : CARD_SPRING}
      whileHover={
        interactive && !reduceMotion
          ? {
              borderColor:
                "color-mix(in oklch, var(--primary) 45%, transparent)",
              boxShadow: "var(--elevation-floating)",
              y: -8,
            }
          : undefined
      }
    >
      {children}
    </m.div>
  );
}

export { CARD_SPRING, STAGGER_VIEWPORT };
