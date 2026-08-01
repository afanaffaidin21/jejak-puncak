import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { Container } from "@/components/common/container";
import { ProfilePage } from "@/components/profile/profile-page";
import { Skeleton } from "@/components/ui/skeleton";
import { getProfileData } from "@/services/profile";

export const metadata: Metadata = {
  title: "Profile | Jejak Puncak",
  description: "Kelola profil, preferensi pendakian, dan keamanan akun.",
  robots: { follow: false, index: false },
};

export const dynamic = "force-dynamic";

export default async function ProfileRoute() {
  const profile = await getProfileData();
  if (!profile) redirect("/login?redirect=/profile");

  return (
    <Container className="flex flex-col gap-lg py-lg lg:gap-xl lg:py-xl">
      <div className="max-w-2xl">
        <p className="text-label font-semibold tracking-wide text-primary uppercase">
          Pengaturan akun
        </p>
        <h1 className="text-balance font-heading text-h2 font-semibold text-text-primary">
          Profile
        </h1>
        <p className="mt-2xs text-body text-text-secondary">
          Kelola informasi pribadi dan preferensi perjalananmu.
        </p>
      </div>
      <Suspense fallback={<Skeleton className="h-[36rem] w-full rounded-xl" />}>
        <ProfilePage profile={profile} />
      </Suspense>
    </Container>
  );
}
