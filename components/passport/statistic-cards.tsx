"use client";

import type { LucideIcon } from "lucide-react";
import {
  Bookmark,
  CalendarRange,
  MountainSnow,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/lib/format";
import type { PassportStatistics } from "@/types/passport";

type AnimatedNumberProps = {
  maximumFractionDigits?: number;
  suffix?: string;
  value: number;
};

function AnimatedNumber({
  maximumFractionDigits = 0,
  suffix = "",
  value,
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion || value === 0) {
      const frame = requestAnimationFrame(() => setDisplayValue(value));
      return () => cancelAnimationFrame(frame);
    }

    const duration = 650;
    const startedAt = performance.now();
    let frame = 0;

    const update = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(value * eased);
      if (progress < 1) frame = requestAnimationFrame(update);
    };

    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return (
    <span
      aria-label={`${formatNumber(value, { maximumFractionDigits })}${suffix}`}
      className="tabular-nums"
    >
      {formatNumber(displayValue, { maximumFractionDigits })}
      {suffix}
    </span>
  );
}

type StatisticCardProps = AnimatedNumberProps & {
  icon: LucideIcon;
  label: string;
};

function StatisticCard({ icon: Icon, label, ...number }: StatisticCardProps) {
  return (
    <Card interactive size="sm">
      <CardHeader className="grid-cols-[1fr_auto] items-center">
        <CardTitle className="text-body-sm text-text-secondary">
          {label}
        </CardTitle>
        <Icon aria-hidden="true" className="text-primary" />
      </CardHeader>
      <CardContent>
        <p className="font-heading text-h2 font-semibold text-text-primary">
          <AnimatedNumber {...number} />
        </p>
      </CardContent>
    </Card>
  );
}

export function StatisticCards({
  completedCount,
  highestElevation,
  totalHikingDays,
  wishlistCount,
}: PassportStatistics) {
  return (
    <section aria-labelledby="passport-statistics-heading">
      <h2 className="sr-only" id="passport-statistics-heading">
        Statistik perjalanan
      </h2>
      <div className="grid grid-cols-2 gap-xs md:grid-cols-4">
        <StatisticCard
          icon={MountainSnow}
          label="Gunung Selesai"
          value={completedCount}
        />
        <StatisticCard icon={Bookmark} label="Wishlist" value={wishlistCount} />
        <StatisticCard
          icon={TrendingUp}
          label="Elevasi Tertinggi"
          suffix=" mdpl"
          value={highestElevation}
        />
        <StatisticCard
          icon={CalendarRange}
          label="Estimasi Hari Mendaki"
          maximumFractionDigits={1}
          suffix=" hari"
          value={totalHikingDays}
        />
      </div>
    </section>
  );
}
