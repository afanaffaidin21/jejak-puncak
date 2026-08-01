"use client";

import { Heart, type LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { toggleWishlistAction } from "@/features/wishlist/actions";
import { useUser } from "@/hooks/use-user";
import { useWishlist } from "@/hooks/use-wishlist";
import { trackEvent } from "@/lib/analytics";

type WishlistButtonProps = {
  className?: string;
  icon?: LucideIcon;
  label?: string;
  mountainId: string;
  name: string;
  showLabel?: boolean;
  size?: ButtonProps["size"];
  slug: string;
};

export function WishlistButton({
  className,
  icon: Icon = Heart,
  label = "Simpan",
  mountainId,
  name,
  showLabel = true,
  size = "default",
  slug,
}: WishlistButtonProps) {
  const router = useRouter();
  const { isLoading: isAuthLoading, user } = useUser();
  const { isWishlisted, setWishlisted, wishlistReady } = useWishlist();
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState("");
  const wishlisted = isWishlisted(mountainId);

  const redirectToLogin = () => {
    const returnPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    trackEvent("wishlist_redirect", { mountain: slug });
    router.push(`/login?redirect=${encodeURIComponent(returnPath)}`);
  };

  const handleClick = async () => {
    setMessage("");

    if (!user) {
      redirectToLogin();
      return;
    }

    const previousState = wishlisted;
    setWishlisted(mountainId, !previousState);
    setIsPending(true);
    try {
      const result = await toggleWishlistAction({ mountainId });

      if (!result.success) {
        setWishlisted(mountainId, previousState);
        setMessage(result.message);
        if (result.status === "unauthenticated") redirectToLogin();
        return;
      }

      setWishlisted(mountainId, result.wishlisted);
      setMessage(
        result.wishlisted
          ? `${name} disimpan ke wishlist.`
          : `${name} dihapus dari wishlist.`,
      );
      trackEvent("wishlist_click", {
        active: result.wishlisted,
        mountain: slug,
      });
    } catch {
      setWishlisted(mountainId, previousState);
      setMessage(
        "Wishlist belum dapat diperbarui. Periksa koneksi lalu coba lagi.",
      );
    } finally {
      setIsPending(false);
    }
  };

  const accessibleLabel = wishlisted
    ? `Hapus ${name} dari wishlist`
    : `Simpan ${name} ke wishlist`;

  return (
    <>
      <Button
        aria-label={accessibleLabel}
        aria-pressed={wishlisted}
        className={className}
        disabled={isAuthLoading || Boolean(user && !wishlistReady)}
        isLoading={isPending}
        loadingLabel="Memperbarui wishlist…"
        onClick={() => void handleClick()}
        size={size}
        title={accessibleLabel}
        type="button"
        variant={wishlisted ? "secondary" : "outline"}
      >
        <Icon
          aria-hidden="true"
          className={wishlisted ? "fill-current" : undefined}
          data-icon={showLabel ? "inline-start" : undefined}
        />
        <span className={showLabel ? undefined : "sr-only"}>
          {wishlisted ? "Tersimpan" : label}
        </span>
      </Button>
      <span aria-live="polite" className="sr-only">
        {message}
      </span>
    </>
  );
}
