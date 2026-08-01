import "server-only";

import type { User } from "@supabase/supabase-js";

import { getUser } from "@/lib/auth/user";
import { createClient } from "@/lib/supabase/server";
import type {
  FinderExperience,
  FinderGoal,
  FinderRegion,
} from "@/types/finder";
import type { MeasurementUnit, ProfileData } from "@/types/profile";

type ProfileRow = {
  avatar_url: string | null;
  bio: string | null;
  display_name: string;
  experience_level: FinderExperience | null;
  hiking_goals: FinderGoal[] | null;
  measurement_unit: MeasurementUnit | null;
  preferred_region: Exclude<FinderRegion, "anywhere"> | null;
};

function metadataString(user: User, key: string) {
  const value: unknown = user.user_metadata[key];
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function getProvider(user: User) {
  const provider = user.app_metadata.provider;
  if (typeof provider === "string" && provider.trim()) return provider;
  return user.identities?.[0]?.provider ?? "email";
}

export async function getProfileData(): Promise<ProfileData | null> {
  const user = await getUser();
  if (!user) return null;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select(
      "display_name,avatar_url,bio,experience_level,preferred_region,hiking_goals,measurement_unit",
    )
    .eq("id", user.id)
    .maybeSingle();

  if (error) throw new Error("Profil tidak dapat dimuat.");

  const profile = data as ProfileRow | null;
  const email = user.email ?? "";

  return {
    avatarUrl:
      profile?.avatar_url ??
      metadataString(user, "avatar_url") ??
      metadataString(user, "picture"),
    bio: profile?.bio ?? "",
    displayName:
      profile?.display_name ??
      metadataString(user, "display_name") ??
      metadataString(user, "full_name") ??
      email.split("@")[0] ??
      "Pendaki",
    email,
    experienceLevel: profile?.experience_level ?? null,
    hikingGoals: profile?.hiking_goals ?? [],
    id: user.id,
    measurementUnit: profile?.measurement_unit ?? "metric",
    preferredRegion: profile?.preferred_region ?? "anywhere",
    provider: getProvider(user),
  };
}
