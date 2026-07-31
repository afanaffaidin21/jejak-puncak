import { MountainSnow } from "lucide-react";
import type { ReactNode } from "react";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  action?: ReactNode;
  className?: string;
  description: string;
  illustration?: ReactNode;
  title: string;
};

export function EmptyState({
  action,
  className,
  description,
  illustration,
  title,
}: EmptyStateProps) {
  return (
    <Empty
      className={cn("border border-divider bg-surface px-md py-2xl", className)}
    >
      <EmptyHeader>
        <EmptyMedia variant="icon">
          {illustration ?? <MountainSnow aria-hidden="true" />}
        </EmptyMedia>
        <EmptyTitle aria-level={2} role="heading">
          {title}
        </EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {action ? <EmptyContent>{action}</EmptyContent> : null}
    </Empty>
  );
}
