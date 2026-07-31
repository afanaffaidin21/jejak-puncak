import { Container } from "@/components/common/container";
import { ContentCardSkeleton } from "@/components/common/content-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function ExploreLoading() {
  return (
    <div className="bg-background py-3xl">
      <Container>
        <Skeleton className="h-xl max-w-2xl" />
        <Skeleton className="mt-sm h-md max-w-reading" />
        <div className="mt-2xl grid gap-xl lg:grid-cols-[17rem_minmax(0,1fr)]">
          <Skeleton className="hidden h-[40rem] rounded-xl lg:block" />
          <div className="grid gap-md sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <ContentCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
