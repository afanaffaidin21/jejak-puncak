import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Mountain as MountainIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardMedia,
  CardMetadata,
  CardTitle,
} from "@/components/ui/card";
import { DIFFICULTY_LABELS, formatDuration } from "@/lib/mountains";
import { formatNumber } from "@/lib/format";
import type { MountainCardData } from "@/types/mountain";
import type { ReactNode } from "react";

type MountainCardProps = {
  actions?: ReactNode;
  footerActions?: ReactNode;
  metadata?: ReactNode;
  mountain: MountainCardData;
  onDetailClick?: () => void;
  priority?: boolean;
};

export function MountainCard({
  actions,
  footerActions,
  metadata,
  mountain,
  onDetailClick,
  priority = false,
}: MountainCardProps) {
  const detailHref = `/mountains/${mountain.slug}`;

  return (
    <Card className="relative h-full" interactive>
      <CardMedia className="relative">
        <Image
          alt={`Ilustrasi sementara lanskap ${mountain.name}`}
          className="object-cover transition-transform duration-slow ease-emphasized group-hover/card:scale-[1.03]"
          fill
          priority={priority}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          src={mountain.heroImage}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-foreground/45 via-transparent to-transparent"
        />
        <Badge className="absolute top-sm left-sm" variant="secondary">
          {DIFFICULTY_LABELS[mountain.difficulty]}
        </Badge>
      </CardMedia>
      <CardHeader>
        {actions ? (
          <CardAction className="relative z-10">{actions}</CardAction>
        ) : null}
        <CardMetadata>
          <span className="inline-flex items-center gap-3xs">
            <MapPin aria-hidden="true" className="size-xs" />
            {mountain.province}
          </span>
        </CardMetadata>
        <CardTitle className="text-h3">
          <Link
            className="rounded-sm after:absolute after:inset-0"
            href={detailHref}
          >
            {mountain.name}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid flex-1 gap-sm">
        <p className="line-clamp-2 text-body-sm text-text-secondary">
          {mountain.summary}
        </p>
        {metadata ? (
          <div className="relative z-10 text-body-sm text-text-secondary">
            {metadata}
          </div>
        ) : null}
        <dl className="grid grid-cols-2 gap-xs border-t border-divider pt-sm text-caption text-text-muted">
          <div>
            <dt className="inline-flex items-center gap-3xs">
              <MountainIcon aria-hidden="true" className="size-xs" />
              Elevasi
            </dt>
            <dd className="mt-3xs font-semibold tabular-nums text-text-primary">
              {formatNumber(mountain.elevation)} mdpl
            </dd>
          </div>
          <div>
            <dt className="inline-flex items-center gap-3xs">
              <CalendarDays aria-hidden="true" className="size-xs" />
              Durasi
            </dt>
            <dd className="mt-3xs font-semibold tabular-nums text-text-primary">
              {formatDuration(mountain.durationDays)}
            </dd>
          </div>
        </dl>
      </CardContent>
      <CardFooter
        className={footerActions ? "flex-col items-stretch gap-xs" : undefined}
      >
        <Link
          className="relative z-10 flex items-center justify-between rounded-sm text-label font-semibold text-primary focus-visible:ring-2 focus-visible:ring-ring"
          href={detailHref}
          onClick={onDetailClick}
        >
          Lihat detail
          <ArrowUpRight aria-hidden="true" className="size-sm" />
        </Link>
        {footerActions ? (
          <div className="relative z-10 flex flex-wrap gap-xs">
            {footerActions}
          </div>
        ) : null}
      </CardFooter>
    </Card>
  );
}
