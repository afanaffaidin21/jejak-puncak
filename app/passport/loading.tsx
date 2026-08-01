import { Container } from "@/components/common/container";
import { ContentCardSkeleton } from "@/components/common/content-card-skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PassportLoading() {
  return (
    <Container
      aria-busy="true"
      aria-label="Memuat Jejak Passport…"
      className="flex flex-col gap-xl py-lg lg:py-xl"
      role="status"
    >
      <Card>
        <CardContent className="flex items-center gap-md">
          <Skeleton className="size-20 rounded-full" />
          <div className="flex flex-1 flex-col gap-xs">
            <Skeleton className="h-xs w-24" />
            <Skeleton className="h-lg w-52 max-w-full" />
            <Skeleton className="h-sm w-64 max-w-full" />
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-2 gap-xs md:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton className="h-28 w-full rounded-lg" key={index} />
        ))}
      </div>
      <Skeleton className="h-[24rem] w-full rounded-xl lg:h-[30rem]" />
      <div className="grid gap-md sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }, (_, index) => (
          <ContentCardSkeleton key={index} />
        ))}
      </div>
    </Container>
  );
}
