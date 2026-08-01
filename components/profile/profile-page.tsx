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
        className="grid h-auto w-full grid-cols-4 overflow-x-auto lg:sticky lg:top-[calc(var(--spacing-mobile-nav)+var(--spacing-sm))] lg:flex lg:flex-col lg:items-stretch lg:gap-2xs lg:bg-surface-elevated lg:p-xs lg:shadow-surface"
        variant="default"
      >
        <TabsTrigger
          className="min-h-touch px-2xs lg:justify-start lg:px-xs"
          value="personal"
        >
          <UserRound aria-hidden="true" />
          <span className="hidden sm:inline">Informasi</span>
          <span className="sm:hidden">Profil</span>
        </TabsTrigger>
        <TabsTrigger
          className="min-h-touch px-2xs lg:justify-start lg:px-xs"
          value="preferences"
        >
          <SlidersHorizontal aria-hidden="true" />
          <span className="hidden sm:inline">Preferensi</span>
          <span className="text-caption sm:hidden">Tujuan</span>
        </TabsTrigger>
        <TabsTrigger
          className="min-h-touch px-2xs lg:justify-start lg:px-xs"
          value="security"
        >
          <ShieldCheck aria-hidden="true" />
          <span className="hidden sm:inline">Keamanan</span>
          <span className="text-caption sm:hidden">Aman</span>
        </TabsTrigger>
        <TabsTrigger
          className="min-h-touch px-2xs lg:justify-start lg:px-xs"
          value="account"
        >
          <Trash2 aria-hidden="true" />
          <span className="hidden sm:inline">Akun</span>
          <span className="text-caption sm:hidden">Akun</span>
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
