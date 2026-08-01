import type { PassportMountain, PassportStatistics } from "@/types/passport";

export function calculatePassportStatistics(
  completed: PassportMountain[],
  wishlist: PassportMountain[],
): PassportStatistics {
  let highestElevation = 0;
  let totalHikingDays = 0;

  for (const mountain of completed) {
    highestElevation = Math.max(highestElevation, mountain.elevation);
    totalHikingDays += mountain.durationDays;
  }

  return {
    completedCount: completed.length,
    highestElevation,
    totalHikingDays,
    wishlistCount: wishlist.length,
  };
}
