import * as React from "react";

import { cn } from "@/lib/utils";

function Card({
  className,
  interactive = false,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & {
  interactive?: boolean;
  size?: "default" | "sm";
}) {
  return (
    <div
      data-slot="card"
      data-interactive={interactive ? "true" : undefined}
      data-size={size}
      className={cn(
        "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-lg border border-border bg-card py-(--card-spacing) text-body-sm text-card-foreground shadow-surface [--card-spacing:var(--spacing-md)] has-data-[slot=card-footer]:pb-0 data-[size=sm]:[--card-spacing:var(--spacing-sm)] data-[size=sm]:has-data-[slot=card-footer]:pb-0",
        "transition-[border-color,box-shadow,transform] duration-fast ease-standard motion-safe:data-[interactive=true]:hover:-translate-y-3xs data-[interactive=true]:hover:border-primary/35 data-[interactive=true]:hover:shadow-hover data-[interactive=true]:focus-within:border-ring data-[interactive=true]:focus-within:ring-2 data-[interactive=true]:focus-within:ring-ring/50",
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn(
        "font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm",
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-body-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-(--card-spacing)", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-xl border-t bg-muted/50 p-(--card-spacing)",
        className,
      )}
      {...props}
    />
  );
}

function CardMedia({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-media"
      className={cn(
        "-mt-(--card-spacing) aspect-4/3 overflow-hidden bg-muted",
        className,
      )}
      {...props}
    />
  );
}

function CardMetadata({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-metadata"
      className={cn(
        "flex flex-wrap items-center gap-2xs text-caption text-text-muted",
        className,
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardMedia,
  CardMetadata,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
