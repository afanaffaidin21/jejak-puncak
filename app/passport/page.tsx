import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { Container } from "@/components/common/container";
import { PassportCollections } from "@/components/passport/passport-collections";
import { PassportTracker } from "@/components/passport/passport-tracker";
import { ProfileSummary } from "@/components/passport/profile-summary";
import { ProgressMap } from "@/components/passport/progress-map";
import { StatisticCards } from "@/components/passport/statistic-cards";
import { Skeleton } from "@/components/ui/skeleton";
import { getPassportData } from "@/services/passport";

export const metadata: Metadata = {
  title: "Jejak Passport | Jejak Puncak",
  description: "Lihat progres pendakian, riwayat puncak, dan Wishlist kamu.",
  robots: { follow: false, index: false },
};

export const dynamic = "force-dynamic";

export default async function PassportPage() {
  const data = await getPassportData();
  if (!data) redirect("/login?redirect=/passport");

  return (
    <Container className="flex flex-col gap-xl py-lg lg:py-xl">
      <PassportTracker />
      <ProfileSummary
        profile={data.profile}
        totalMountains={
          data.statistics.completedCount + data.statistics.wishlistCount
        }
      />
      <StatisticCards {...data.statistics} />
      <ProgressMap completed={data.completed} />
      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <PassportCollections
          completed={data.completed}
          wishlist={data.wishlist}
        />
      </Suspense>
    </Container>
  );
}
