"use client";

import {
  ShieldCheck,
  SlidersHorizontal,
  Trash2,
  UserRound,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { AccountSection } from "@/components/profile/account-section";
import { PersonalInformationForm } from "@/components/profile/personal-information-form";
import { PreferencesForm } from "@/components/profile/preferences-form";
import { SecuritySection } from "@/components/profile/security-section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trackEvent } from "@/lib/analytics";
import type { ProfileData } from "@/types/profile";

const SECTIONS = ["personal", "preferences", "security", "account"] as const;
type ProfileSection = (typeof SECTIONS)[number];

function isProfileSection(value: string | null): value is ProfileSection {
  return SECTIONS.includes(value as ProfileSection);
}

export function ProfilePage({ profile }: { profile: ProfileData }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedSection = searchParams.get("section");
  const activeSection = isProfileSection(requestedSection)
    ? requestedSection
    : "personal";

  useEffect(() => {
    trackEvent("profile_view");
  }, []);

  const changeSection = (value: string) => {
    if (!isProfileSection(value)) return;
    const next = new URLSearchParams(searchParams.toString());
    if (value === "personal") next.delete("section");
    else next.set("section", value);
    const query = next.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  return (
    <Tabs
      className="gap-md lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:items-start lg:gap-xl"
      onValueChange={changeSection}
      value={activeSection}
    >
      <TabsList
        aria-label="Bagian profil"
        className="grid w-full grid-cols-4 group-data-horizontal/tabs:h-auto lg:sticky lg:top-[calc(var(--spacing-mobile-nav)+var(--spacing-sm))] lg:flex lg:flex-col lg:items-stretch lg:gap-2xs lg:bg-surface-elevated lg:p-xs lg:shadow-surface"
        variant="default"
      >
        <TabsTrigger
          className="min-h-touch min-w-0 touch-manipulation px-3xs text-caption sm:px-xs sm:text-body-sm lg:justify-start"
          value="personal"
        >
          <UserRound aria-hidden="true" className="hidden sm:block" />
          <span>Informasi</span>
        </TabsTrigger>
        <TabsTrigger
          className="min-h-touch min-w-0 touch-manipulation px-3xs text-caption sm:px-xs sm:text-body-sm lg:justify-start"
          value="preferences"
        >
          <SlidersHorizontal aria-hidden="true" className="hidden sm:block" />
          <span>Preferensi</span>
        </TabsTrigger>
        <TabsTrigger
          className="min-h-touch min-w-0 touch-manipulation px-3xs text-caption sm:px-xs sm:text-body-sm lg:justify-start"
          value="security"
        >
          <ShieldCheck aria-hidden="true" className="hidden sm:block" />
          <span>Keamanan</span>
        </TabsTrigger>
        <TabsTrigger
          className="min-h-touch min-w-0 touch-manipulation px-3xs text-caption sm:px-xs sm:text-body-sm lg:justify-start"
          value="account"
        >
          <Trash2 aria-hidden="true" className="hidden sm:block" />
          <span>Akun</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent
        className="min-w-0 lg:col-start-2 lg:row-start-1"
        value="personal"
      >
        <PersonalInformationForm profile={profile} />
      </TabsContent>
      <TabsContent
        className="min-w-0 lg:col-start-2 lg:row-start-1"
        value="preferences"
      >
        <PreferencesForm profile={profile} />
      </TabsContent>
      <TabsContent
        className="min-w-0 lg:col-start-2 lg:row-start-1"
        value="security"
      >
        <SecuritySection provider={profile.provider} />
      </TabsContent>
      <TabsContent
        className="min-w-0 lg:col-start-2 lg:row-start-1"
        value="account"
      >
        <AccountSection />
      </TabsContent>
    </Tabs>
  );
}
