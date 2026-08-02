"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { useReducedMotion } from "framer-motion";
import * as m from "framer-motion/m";

import { CARD_SPRING } from "@/components/common/motion-primitives";
import {
  buttonVariants,
  type ButtonVariantProps,
} from "@/components/ui/button-variants";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonPrimitive.Props &
  ButtonVariantProps & {
    isLoading?: boolean;
    loadingLabel?: string;
  };

function Button({
  children,
  className,
  disabled,
  isLoading = false,
  loadingLabel = "Memuat…",
  variant = "primary",
  size = "default",
  ...props
}: ButtonProps) {
  const isIconOnly = size?.startsWith("icon");
  const reduceMotion = useReducedMotion();

  return (
    <ButtonPrimitive
      aria-busy={isLoading || undefined}
      data-slot="button"
      data-loading={isLoading ? "true" : undefined}
      disabled={disabled || isLoading}
      className={cn(buttonVariants({ variant, size, className }))}
      render={
        <m.button
          transition={reduceMotion ? { duration: 0 } : CARD_SPRING}
          whileHover={reduceMotion ? undefined : { y: -8 }}
          whileTap={reduceMotion ? undefined : { scale: 0.95 }}
        />
      }
      {...props}
    >
      {isLoading ? (
        <>
          <Spinner aria-hidden="true" data-icon="inline-start" />
          <span className={cn(isIconOnly && "sr-only")}>{loadingLabel}</span>
        </>
      ) : (
        children
      )}
    </ButtonPrimitive>
  );
}

export { Button, type ButtonProps };
