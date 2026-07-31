import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  action?: ReactNode;
  align?: "left" | "center";
  description?: string;
  eyebrow?: string;
  id: string;
  title: string;
};

export function SectionHeading({
  action,
  align = "left",
  description,
  eyebrow,
  id,
  title,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-xl flex flex-col gap-md sm:flex-row sm:items-end sm:justify-between",
        align === "center" &&
          "mx-auto max-w-3xl text-center sm:flex-col sm:items-center",
      )}
    >
      <div>
        {eyebrow ? (
          <p className="mb-xs text-label font-semibold text-primary">
            {eyebrow}
          </p>
        ) : null}
        <h2
          className="text-balance font-heading text-h2 font-semibold text-text-primary"
          id={id}
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-sm max-w-reading text-pretty text-body-lg text-text-secondary">
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
