import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export function ResponsiveGrid({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "grid grid-cols-4 gap-x-md gap-y-lg md:grid-cols-8 lg:grid-cols-12",
        className,
      )}
      {...props}
    />
  );
}
