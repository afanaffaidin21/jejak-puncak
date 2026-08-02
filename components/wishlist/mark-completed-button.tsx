"use client";

import { CircleCheck, MountainSnow, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MotionLink } from "@/components/common/motion-primitives";
import { Button, type ButtonProps } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { setMountainStatusAction } from "@/features/wishlist/actions";
import { useUser } from "@/hooks/use-user";
import { useCompletedMountains } from "@/hooks/use-completed-mountains";
import { useWishlist } from "@/hooks/use-wishlist";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type MarkCompletedButtonProps = {
  className?: string;
  mountainId: string;
  name: string;
  size?: ButtonProps["size"];
  slug: string;
};

export function MarkCompletedButton({
  className,
  mountainId,
  name,
  size = "default",
  slug,
}: MarkCompletedButtonProps) {
  const router = useRouter();
  const { isLoading: isAuthLoading, user } = useUser();
  const { isCompleted, setCompleted, statusReady } = useCompletedMountains();
  const { setWishlisted } = useWishlist();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const completed = isCompleted(mountainId);

  if (isAuthLoading || !user) {
    return null;
  }

  const handleConfirm = async () => {
    setErrorMessage("");
    setIsPending(true);

    try {
      const result = await setMountainStatusAction({
        mountainId,
        status: "completed",
      });

      if (!result.success) {
        setErrorMessage(result.message);
        return;
      }

      setCompleted(mountainId, true);
      setWishlisted(mountainId, false);
      setIsSuccess(true);
      trackEvent("mountain_marked_completed", { mountain: slug });
      router.refresh();
    } catch {
      setErrorMessage(
        "Perjalanan belum dapat disimpan. Periksa koneksi lalu coba lagi.",
      );
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          setErrorMessage("");
          setIsSuccess(false);
        }
      }}
      open={isOpen}
    >
      <DialogTrigger
        render={
          <Button
            className={className}
            disabled={completed || !statusReady}
            size={size}
            type="button"
            variant={completed ? "secondary" : "outline"}
          />
        }
      >
        <CircleCheck aria-hidden="true" data-icon="inline-start" />
        {completed ? "Sudah selesai" : "Tandai selesai"}
      </DialogTrigger>

      <DialogContent className="max-w-lg" showCloseButton={!isPending}>
        {isSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle>Tersimpan di Passport</DialogTitle>
              <DialogDescription>
                {name} sudah ditambahkan ke perjalanan yang selesai.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center gap-xs rounded-lg bg-muted p-sm text-body-sm text-text-secondary">
              <MountainSnow aria-hidden="true" />
              Statistik dan Progress Map telah diperbarui.
            </div>
            <DialogFooter>
              <Button onClick={() => setIsOpen(false)} variant="outline">
                Tutup
              </Button>
              <MotionLink
                className={cn(buttonVariants(), "w-full sm:w-auto")}
                href="/passport"
              >
                Lihat Passport
              </MotionLink>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Tandai {name} sebagai selesai?</DialogTitle>
              <DialogDescription>
                Gunung ini akan dipindahkan dari Wishlist ke daftar perjalanan
                selesai dengan tanggal hari ini.
              </DialogDescription>
            </DialogHeader>

            {errorMessage ? (
              <Alert variant="destructive">
                <TriangleAlert aria-hidden="true" />
                <AlertTitle>Perjalanan belum tersimpan</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
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
                loadingLabel="Menyimpan…"
                onClick={() => void handleConfirm()}
              >
                <CircleCheck aria-hidden="true" data-icon="inline-start" />
                Tandai Selesai
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
