"use client";

import { useContext } from "react";

import { AuthContext } from "@/components/auth/auth-provider";

export function useUser() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useUser must be used inside AuthProvider.");

  return { isLoading: context.isLoading, user: context.user };
}
