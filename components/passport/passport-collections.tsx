"use client";

import { Bookmark, MountainSnow } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { EmptyState } from "@/components/common/empty-state";
import { MountainCard } from "@/components/mountains/mountain-card";
import { RemoveWishlistButton } from "@/components/passport/remove-wishlist-button";
import { buttonVariants } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MarkCompletedButton } from "@/components/wishlist/mark-completed-button";
import { formatDate } from "@/lib/format";
import { trackEvent } from "@/lib/analytics";
import type { PassportMountain } from "@/types/passport";

type CollectionProps = {
  completed: PassportMountain[];
  wishlist: PassportMountain[];
};

function CompletedCollection({ mountains }: { mountains: PassportMountain[] }) {
  if (!mountains.length) {
    return (
      <EmptyState
        action={
          <Link className={buttonVariants()} href="/explore">
            Jelajahi Gunung
          </Link>
        }
        description="Tandai pendakian yang sudah selesai untuk mulai membangun riwayat perjalananmu."
        illustration={<MountainSnow aria-hidden="true" />}
        title="Belum ada gunung yang diselesaikan"
      />
    );
  }

  return (
    <div className="grid gap-md sm:grid-cols-2 xl:grid-cols-3">
      {mountains.map((mountain) => (
        <MountainCard
          key={mountain.id}
          metadata={
            <span>Diselesaikan {formatDate(mountain.completedAt)}</span>
          }
          mountain={mountain}
          onDetailClick={() =>
            trackEvent("mountain_detail_click", { mountain: mountain.slug })
          }
        />
      ))}
    </div>
  );
}

function WishlistCollection({ mountains }: { mountains: PassportMountain[] }) {
  if (!mountains.length) {
    return (
      <EmptyState
        action={
          <Link className={buttonVariants()} href="/finder">
            Coba Jejak Finder
          </Link>
        }
        description="Simpan gunung dari Explore atau hasil Jejak Finder untuk melihatnya kembali di sini."
        illustration={<Bookmark aria-hidden="true" />}
        title="Wishlist masih kosong"
      />
    );
  }

  return (
    <div className="grid gap-md sm:grid-cols-2 xl:grid-cols-3">
      {mountains.map((mountain) => (
        <MountainCard
          footerActions={
            <>
              <MarkCompletedButton
                className="flex-1"
                mountainId={mountain.id}
                name={mountain.name}
                size="sm"
                slug={mountain.slug}
              />
              <RemoveWishlistButton
                mountainId={mountain.id}
                name={mountain.name}
                slug={mountain.slug}
              />
            </>
          }
          key={mountain.id}
          mountain={mountain}
          onDetailClick={() =>
            trackEvent("mountain_detail_click", { mountain: mountain.slug })
          }
        />
      ))}
    </div>
  );
}

export function PassportCollections({ completed, wishlist }: CollectionProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab =
    searchParams.get("tab") === "wishlist" ? "wishlist" : "completed";

  const changeTab = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "wishlist") params.set("tab", "wishlist");
    else params.delete("tab");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
    trackEvent(
      value === "wishlist" ? "wishlist_tab_view" : "completed_tab_view",
    );
  };

  return (
    <>
      <div className="lg:hidden">
        <Tabs onValueChange={changeTab} value={activeTab}>
          <TabsList className="grid h-auto w-full grid-cols-2">
            <TabsTrigger value="completed">
              Selesai ({completed.length})
            </TabsTrigger>
            <TabsTrigger value="wishlist">
              Wishlist ({wishlist.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="completed">
            <CompletedCollection mountains={completed} />
          </TabsContent>
          <TabsContent value="wishlist">
            <WishlistCollection mountains={wishlist} />
          </TabsContent>
        </Tabs>
      </div>

      <div className="hidden flex-col gap-2xl lg:flex">
        <section aria-labelledby="completed-mountains-heading">
          <div className="mb-md flex items-end justify-between gap-md">
            <div>
              <p className="text-label font-semibold text-primary">
                Riwayat Pendakian
              </p>
              <h2
                className="text-balance font-heading text-h2 font-semibold text-text-primary"
                id="completed-mountains-heading"
              >
                Gunung yang Sudah Diselesaikan
              </h2>
            </div>
            <p className="text-body-sm text-text-secondary">Terbaru</p>
          </div>
          <CompletedCollection mountains={completed} />
        </section>

        <section aria-labelledby="wishlist-mountains-heading">
          <div className="mb-md">
            <p className="text-label font-semibold text-primary">
              Rencana Berikutnya
            </p>
            <h2
              className="text-balance font-heading text-h2 font-semibold text-text-primary"
              id="wishlist-mountains-heading"
            >
              Wishlist
            </h2>
          </div>
          <WishlistCollection mountains={wishlist} />
        </section>
      </div>
    </>
  );
}
