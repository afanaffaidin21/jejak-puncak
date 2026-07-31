"use client";

import { RefreshCw } from "lucide-react";

import { Button, type ButtonProps } from "@/components/ui/button";

type RetryButtonProps = Omit<
  ButtonProps,
  "children" | "loadingLabel" | "onClick"
> & {
  label?: string;
  loadingLabel?: string;
  onRetry: () => void;
};

export function RetryButton({
  label = "Coba lagi",
  loadingLabel = "Mencoba lagi…",
  onRetry,
  variant = "secondary",
  ...props
}: RetryButtonProps) {
  return (
    <Button
      loadingLabel={loadingLabel}
      onClick={onRetry}
      variant={variant}
      {...props}
    >
      <RefreshCw aria-hidden="true" data-icon="inline-start" />
      {label}
    </Button>
  );
}
