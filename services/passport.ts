import "server-only";

import type { User } from "@supabase/supabase-js";

import { getUser } from "@/lib/auth/user";
import { createClient } from "@/lib/supabase/server";
import { calculatePassportStatistics } from "@/services/passport-statistics";
import type { MountainDifficulty } from "@/types/mountain";
import type { PassportData, PassportMountain } from "@/types/passport";

type ProfileRow = {
  avatar_url: string | null;
  created_at: string;
  display_name: string;
};

type PassportMountainRow = {
  beginner_score: number;
  difficulty: MountainDifficulty;
  duration_days: number | string;
  elevation: number;
  hero_image: string;
  id: string;
  island: string;
  latitude: number | string;
  longitude: number | string;
  name: string;
  province: string;
  slug: string;
  summary: string;
};

type UserMountainRow = {
  completed_at: string | null;
  created_at: string;
  mountains: PassportMountainRow | PassportMountainRow[] | null;
  status: "completed" | "wishlist";
};

const PASSPORT_MOUNTAIN_COLUMNS = `
  status,
  completed_at,
  created_at,
  mountains (
    id,
    slug,
    name,
    province,
    island,
    elevation,
    latitude,
    longitude,
    difficulty,
    duration_days,
    beginner_score,
    hero_image,
    summary
  )
`;

function metadataString(user: User, key: string) {
  const value: unknown = user.user_metadata[key];
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function resolveMountain(
  relationship: UserMountainRow["mountains"],
): PassportMountainRow | null {
  if (Array.isArray(relationship)) return relationship[0] ?? null;
  return relationship;
}

function toPassportMountain(row: UserMountainRow): PassportMountain | null {
  const mountain = resolveMountain(row.mountains);
  if (!mountain) return null;

  const latitude = Number(mountain.latitude);
  const longitude = Number(mountain.longitude);
  const durationDays = Number(mountain.duration_days);

  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    !Number.isFinite(durationDays)
  ) {
    return null;
  }

  return {
    beginnerScore: mountain.beginner_score,
    completedAt: row.completed_at,
    difficulty: mountain.difficulty,
    durationDays,
    elevation: mountain.elevation,
    heroImage: mountain.hero_image,
    id: mountain.id,
    island: mountain.island,
    latitude,
    longitude,
    name: mountain.name,
    province: mountain.province,
    savedAt: row.created_at,
    slug: mountain.slug,
    summary: mountain.summary,
  };
}

export async function getPassportData(): Promise<PassportData | null> {
  const user = await getUser();
  if (!user) return null;

  const supabase = await createClient();
  const [profileResult, mountainResult] = await Promise.all([
    supabase
      .from("profiles")
      .select("display_name,avatar_url,created_at")
      .eq("id", user.id)
      .maybeSingle(),
    supabase
      .from("user_mountains")
      .select(PASSPORT_MOUNTAIN_COLUMNS)
      .eq("user_id", user.id),
  ]);

  if (profileResult.error || mountainResult.error) {
    throw new Error("Data Passport tidak dapat dimuat.");
  }

  const rows = (mountainResult.data ?? []) as unknown as UserMountainRow[];
  const completed: PassportMountain[] = [];
  const wishlist: PassportMountain[] = [];

  for (const row of rows) {
    const mountain = toPassportMountain(row);
    if (!mountain) continue;
    if (row.status === "completed") completed.push(mountain);
    if (row.status === "wishlist") wishlist.push(mountain);
  }

  completed.sort(
    (left, right) =>
      new Date(right.completedAt ?? 0).getTime() -
      new Date(left.completedAt ?? 0).getTime(),
  );
  wishlist.sort(
    (left, right) =>
      new Date(right.savedAt).getTime() - new Date(left.savedAt).getTime(),
  );

  const profile = profileResult.data as ProfileRow | null;
  const email = user.email ?? "";

  return {
    completed,
    profile: {
      avatarUrl:
        profile?.avatar_url ??
        metadataString(user, "avatar_url") ??
        metadataString(user, "picture"),
      displayName:
        profile?.display_name ??
        metadataString(user, "display_name") ??
        metadataString(user, "full_name") ??
        email.split("@")[0] ??
        "Pendaki",
      email,
      joinedAt: profile?.created_at ?? user.created_at,
    },
    statistics: calculatePassportStatistics(completed, wishlist),
    wishlist,
  };
}
