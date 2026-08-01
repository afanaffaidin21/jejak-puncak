"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toggleWishlistAction } from "@/features/wishlist/actions";
import { useWishlist } from "@/hooks/use-wishlist";
import { trackEvent } from "@/lib/analytics";

type RemoveWishlistButtonProps = {
  mountainId: string;
  name: string;
  slug: string;
};

export function RemoveWishlistButton({
  mountainId,
  name,
  slug,
}: RemoveWishlistButtonProps) {
  const router = useRouter();
  const { setWishlisted } = useWishlist();
  const [isPending, setIsPending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRemove = async () => {
    setErrorMessage("");
    setIsPending(true);

    try {
      const result = await toggleWishlistAction({ mountainId });
      if (!result.success) {
        setErrorMessage(result.message);
        return;
      }

      setWishlisted(mountainId, false);
      trackEvent("wishlist_remove", { mountain: slug });
      setIsOpen(false);
      router.refresh();
    } catch {
      setErrorMessage(
        "Wishlist belum dapat diperbarui. Periksa koneksi lalu coba lagi.",
      );
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) setErrorMessage("");
      }}
      open={isOpen}
    >
      <DialogTrigger
        render={
          <Button
            aria-label={`Hapus ${name} dari Wishlist`}
            className="flex-1"
            size="sm"
            type="button"
            variant="destructive"
          />
        }
      >
        <Trash2 aria-hidden="true" data-icon="inline-start" />
        Hapus Wishlist
      </DialogTrigger>
      <DialogContent className="max-w-lg" showCloseButton={!isPending}>
        <DialogHeader>
          <DialogTitle>Hapus {name} dari Wishlist?</DialogTitle>
          <DialogDescription>
            Gunung ini akan dihapus dari rencana berikutnya. Kamu tetap dapat
            menyimpannya kembali dari halaman detail.
          </DialogDescription>
        </DialogHeader>
        {errorMessage ? (
          <p className="text-body-sm text-destructive" role="alert">
            {errorMessage}
          </p>
        ) : null}
        <DialogFooter>
          <Button
            disabled={isPending}
            onClick={() => setIsOpen(false)}
            variant="outline"
          >
            Batal
          </Button>
          <Button
            isLoading={isPending}
            loadingLabel="Menghapus…"
            onClick={() => void handleRemove()}
            variant="destructive"
          >
            <Trash2 aria-hidden="true" data-icon="inline-start" />
            Hapus Wishlist
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
