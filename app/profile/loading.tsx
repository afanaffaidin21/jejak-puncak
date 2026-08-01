import { Container } from "@/components/common/container";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoading() {
  return (
    <Container
      aria-busy="true"
      aria-label="Memuat profile…"
      className="flex flex-col gap-lg py-lg lg:py-xl"
      role="status"
    >
      <div className="flex flex-col gap-xs">
        <Skeleton className="h-xs w-28" />
        <Skeleton className="h-xl w-48" />
        <Skeleton className="h-md w-80 max-w-full" />
      </div>
      <div className="grid gap-xl lg:grid-cols-[15rem_minmax(0,1fr)]">
        <Skeleton className="h-56 w-full rounded-lg" />
        <Card>
          <CardContent className="flex flex-col gap-md">
            <Skeleton className="size-24 rounded-full" />
            <Skeleton className="h-touch w-full" />
            <Skeleton className="h-touch w-full" />
            <Skeleton className="h-28 w-full" />
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
