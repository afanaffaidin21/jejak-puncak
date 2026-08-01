"use client";

import type { User } from "@supabase/supabase-js";
import { createContext, useEffect, useMemo, useRef, useState } from "react";

import { createClient } from "@/lib/supabase/client";

export type AuthUserSummary = {
  avatarUrl: string | null;
  displayName: string;
  email: string;
  id: string;
};

export type AuthContextValue = {
  completedIds: ReadonlySet<string>;
  isLoading: boolean;
  setCompleted: (mountainId: string, completed: boolean) => void;
  setWishlisted: (mountainId: string, wishlisted: boolean) => void;
  updateUserSummary: (
    updates: Partial<Pick<AuthUserSummary, "avatarUrl" | "displayName">>,
  ) => void;
  user: AuthUserSummary | null;
  wishlistIds: ReadonlySet<string>;
  wishlistReady: boolean;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

function getMetadataString(user: User, key: string) {
  const value: unknown = user.user_metadata[key];
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function toUserSummary(user: User): AuthUserSummary {
  const email = user.email ?? "";
  return {
    avatarUrl:
      getMetadataString(user, "avatar_url") ??
      getMetadataString(user, "picture"),
    displayName:
      getMetadataString(user, "display_name") ??
      getMetadataString(user, "full_name") ??
      email.split("@")[0] ??
      "Pendaki",
    email,
    id: user.id,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUserSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [wishlistIds, setWishlistIds] = useState<ReadonlySet<string>>(
    () => new Set(),
  );
  const [completedIds, setCompletedIds] = useState<ReadonlySet<string>>(
    () => new Set(),
  );
  const [wishlistReady, setWishlistReady] = useState(false);
  const authVersionRef = useRef(0);

  useEffect(() => {
    let isActive = true;
    const supabase = createClient();

    const loadUserMountains = async (version: number) => {
      setWishlistReady(false);
      const { data } = await supabase
        .from("user_mountains")
        .select("mountain_id,status");

      if (!isActive || version !== authVersionRef.current) return;

      setWishlistIds(
        new Set(
          (data ?? []).flatMap((item) =>
            item.status === "wishlist" && typeof item.mountain_id === "string"
              ? [item.mountain_id]
              : [],
          ),
        ),
      );
      setCompletedIds(
        new Set(
          (data ?? []).flatMap((item) =>
            item.status === "completed" && typeof item.mountain_id === "string"
              ? [item.mountain_id]
              : [],
          ),
        ),
      );
      setWishlistReady(true);
    };

    const applyUser = (nextUser: User | null) => {
      const version = ++authVersionRef.current;
      setUser(nextUser ? toUserSummary(nextUser) : null);
      setWishlistIds(new Set());
      setCompletedIds(new Set());
      setWishlistReady(!nextUser);
      setIsLoading(false);

      if (nextUser) {
        window.setTimeout(() => void loadUserMountains(version), 0);
      }
    };

    void supabase.auth
      .getUser()
      .then(({ data }) => {
        if (isActive) applyUser(data.user);
      })
      .catch(() => {
        if (isActive) applyUser(null);
      });

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "INITIAL_SESSION") return;
      if (isActive) applyUser(session?.user ?? null);
    });

    return () => {
      isActive = false;
      data.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      completedIds,
      isLoading,
      setCompleted: (mountainId, completed) => {
        setCompletedIds((current) => {
          const next = new Set(current);
          if (completed) next.add(mountainId);
          else next.delete(mountainId);
          return next;
        });
      },
      setWishlisted: (mountainId, wishlisted) => {
        setWishlistIds((current) => {
          const next = new Set(current);
          if (wishlisted) next.add(mountainId);
          else next.delete(mountainId);
          return next;
        });
      },
      updateUserSummary: (updates) => {
        setUser((current) => (current ? { ...current, ...updates } : current));
      },
      user,
      wishlistIds,
      wishlistReady,
    }),
    [completedIds, isLoading, user, wishlistIds, wishlistReady],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
