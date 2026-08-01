import { MapPinned } from "lucide-react";

import { EmptyState } from "@/components/common/empty-state";
import { MountainMap } from "@/components/map/mountain-map";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import type { PassportMountain } from "@/types/passport";

export function ProgressMap({ completed }: { completed: PassportMountain[] }) {
  return (
    <section aria-labelledby="progress-map-heading">
      <div className="mb-md max-w-2xl">
        <p className="text-label font-semibold text-primary">Progress Map</p>
        <h2
          className="text-balance font-heading text-h2 font-semibold text-text-primary"
          id="progress-map-heading"
        >
          Jejakmu di Indonesia
        </h2>
        <p className="mt-xs text-pretty text-body text-text-secondary">
          Setiap marker bertanda centang menunjukkan puncak yang sudah kamu
          selesaikan.
        </p>
      </div>

      {completed.length ? (
        <MountainMap mountains={completed} variant="progress" />
      ) : (
        <EmptyState
          action={
            <Link className={buttonVariants()} href="/explore">
              Jelajahi Gunung
            </Link>
          }
          description="Peta progres akan terisi setelah kamu menandai pendakian pertama sebagai selesai."
          illustration={<MapPinned aria-hidden="true" />}
          title="Belum ada jejak di peta"
        />
      )}
    </section>
  );
}
