import { CalendarDays, MountainSnow, Settings } from "lucide-react";

import { MotionLink } from "@/components/common/motion-primitives";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button-variants";
import { formatDate, formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { PassportProfile } from "@/types/passport";

function getInitials(displayName: string) {
  return displayName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

type ProfileSummaryProps = {
  profile: PassportProfile;
  totalMountains: number;
};

export function ProfileSummary({
  profile,
  totalMountains,
}: ProfileSummaryProps) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-md sm:flex-row sm:items-center">
        <Avatar className="size-20">
          {profile.avatarUrl ? (
            <AvatarImage alt="" src={profile.avatarUrl} />
          ) : null}
          <AvatarFallback className="text-h4">
            {getInitials(profile.displayName)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="text-label font-semibold tracking-wide text-primary uppercase">
            Jejak Passport
          </p>
          <h1 className="break-words text-balance font-heading text-h2 font-semibold text-text-primary">
            {profile.displayName}
          </h1>
          <p className="truncate text-body-sm text-text-secondary">
            {profile.email}
          </p>
          <div className="mt-xs flex flex-wrap gap-sm text-caption text-text-muted">
            <span className="inline-flex items-center gap-2xs">
              <CalendarDays aria-hidden="true" />
              Bergabung {formatDate(profile.joinedAt)}
            </span>
            <span className="inline-flex items-center gap-2xs">
              <MountainSnow aria-hidden="true" />
              {formatNumber(totalMountains)} gunung tercatat
            </span>
          </div>
        </div>
        <MotionLink
          className={cn(
            buttonVariants({ variant: "outline" }),
            "w-full sm:w-auto",
          )}
          href="/profile"
        >
          <Settings aria-hidden="true" />
          Kelola profile
        </MotionLink>
      </CardContent>
    </Card>
  );
}
