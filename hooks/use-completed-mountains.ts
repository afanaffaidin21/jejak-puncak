"use client";

import { useContext } from "react";

import { AuthContext } from "@/components/auth/auth-provider";

export function useCompletedMountains() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useCompletedMountains must be used inside AuthProvider.");
  }

  return {
    isCompleted: (mountainId: string) => context.completedIds.has(mountainId),
    setCompleted: context.setCompleted,
    statusReady: context.wishlistReady,
  };
}
