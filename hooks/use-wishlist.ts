"use client";

import { useContext } from "react";

import { AuthContext } from "@/components/auth/auth-provider";

export function useWishlist() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useWishlist must be used inside AuthProvider.");
  }

  return {
    isWishlisted: (mountainId: string) => context.wishlistIds.has(mountainId),
    setWishlisted: context.setWishlisted,
    wishlistReady: context.wishlistReady,
  };
}
