"use client";

import type { ComponentProps, ReactNode } from "react";
import { type MotionProps, useReducedMotion } from "framer-motion";
import * as m from "framer-motion/m";

import { cn } from "@/lib/utils";

type ScrollRevealProps = Omit<ComponentProps<"div">, keyof MotionProps> &
  MotionProps & {
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
  const reduceMotion = useReducedMotion();

  return (
    <m.div
      initial={reduceMotion ? false : { opacity: 0, y: 32 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              damping: 20,
              delay: delay / 1000,
              mass: 0.8,
              stiffness: 110,
              type: "spring",
            }
      }
      className={cn("will-change-[transform,opacity]", className)}
      viewport={{ amount: 0.12, margin: "0px 0px -80px 0px", once: true }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      style={style}
      {...props}
    >
      {children}
    </m.div>
  );
}
