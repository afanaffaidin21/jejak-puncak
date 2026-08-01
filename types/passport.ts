import type { MapMountain } from "@/types/map";

export type PassportMountain = MapMountain & {
  completedAt: string | null;
  savedAt: string;
};

export type PassportProfile = {
  avatarUrl: string | null;
  displayName: string;
  email: string;
  joinedAt: string;
};

export type PassportStatistics = {
  completedCount: number;
  highestElevation: number;
  totalHikingDays: number;
  wishlistCount: number;
};

export type PassportData = {
  completed: PassportMountain[];
  profile: PassportProfile;
  statistics: PassportStatistics;
  wishlist: PassportMountain[];
};
