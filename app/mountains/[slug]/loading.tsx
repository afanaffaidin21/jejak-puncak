import { Container } from "@/components/common/container";
import { ContentCardSkeleton } from "@/components/common/content-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function MountainDetailLoading() {
  return (
    <>
      <div className="relative min-h-[68svh] bg-muted">
        <Skeleton className="absolute inset-0 rounded-none" />
        <Container className="relative flex min-h-[68svh] items-end py-2xl">
          <div className="w-full max-w-3xl">
            <Skeleton className="h-sm w-24" />
            <Skeleton className="mt-sm h-2xl w-3/4" />
            <Skeleton className="mt-sm h-md w-1/2" />
          </div>
        </Container>
      </div>
      <Container className="py-3xl">
        <div className="grid gap-md sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <ContentCardSkeleton key={index} />
          ))}
        </div>
      </Container>
    </>
  );
}
