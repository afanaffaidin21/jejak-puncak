import { Card, CardContent, CardMedia } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type ContentCardSkeletonProps = {
  className?: string;
  label?: string;
};

export function ContentCardSkeleton({
  className,
  label = "Memuat konten",
}: ContentCardSkeletonProps) {
  return (
    <Card
      aria-busy="true"
      aria-label={label}
      className={cn("gap-sm", className)}
      role="status"
    >
      <CardMedia>
        <Skeleton className="size-full rounded-none" />
      </CardMedia>
      <CardContent className="grid gap-xs">
        <Skeleton className="h-sm w-2/3" />
        <Skeleton className="h-xs w-1/2" />
        <Skeleton className="h-lg w-full" />
      </CardContent>
    </Card>
  );
}
