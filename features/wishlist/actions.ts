"use server";

import { revalidatePath } from "next/cache";

import {
  mountainStatusMutationSchema,
  wishlistMutationSchema,
} from "@/features/wishlist/validation";
import { getUser } from "@/lib/auth/user";
import { createClient } from "@/lib/supabase/server";

type WishlistMutationResult =
  | { success: true; wishlisted: boolean }
  | { success: false; status: "error" | "unauthenticated"; message: string };

export async function toggleWishlistAction(
  input: unknown,
): Promise<WishlistMutationResult> {
  const parsed = wishlistMutationSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      status: "error",
      message: "Gunung yang dipilih tidak valid.",
    };
  }

  const user = await getUser();
  if (!user) {
    return {
      success: false,
      status: "unauthenticated",
      message: "Login diperlukan untuk menyimpan wishlist.",
    };
  }

  const supabase = await createClient();
  const { data: existing, error: readError } = await supabase
    .from("user_mountains")
    .select("status")
    .eq("mountain_id", parsed.data.mountainId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (readError) {
    return {
      success: false,
      status: "error",
      message: "Wishlist belum dapat diperbarui. Silakan coba lagi.",
    };
  }

  if (existing?.status === "wishlist") {
    const { error } = await supabase
      .from("user_mountains")
      .delete()
      .eq("mountain_id", parsed.data.mountainId)
      .eq("user_id", user.id)
      .eq("status", "wishlist");

    if (error) {
      return {
        success: false,
        status: "error",
        message: "Wishlist belum dapat diperbarui. Silakan coba lagi.",
      };
    }

    revalidatePath("/passport");
    return { success: true, wishlisted: false };
  }

  if (existing?.status === "completed") {
    return {
      success: false,
      status: "error",
      message: "Gunung ini sudah tercatat sebagai selesai di Passport.",
    };
  }

  const { error } = await supabase.from("user_mountains").upsert(
    {
      mountain_id: parsed.data.mountainId,
      status: "wishlist",
      user_id: user.id,
    },
    { onConflict: "user_id,mountain_id" },
  );

  if (error) {
    return {
      success: false,
      status: "error",
      message: "Wishlist belum dapat diperbarui. Silakan coba lagi.",
    };
  }

  revalidatePath("/passport");
  return { success: true, wishlisted: true };
}

export async function setMountainStatusAction(input: unknown) {
  const parsed = mountainStatusMutationSchema.safeParse(input);

  if (!parsed.success) {
    return { success: false as const, message: "Status gunung tidak valid." };
  }

  const user = await getUser();
  if (!user) {
    return {
      success: false as const,
      message: "Login diperlukan untuk mencatat perjalanan.",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("user_mountains").upsert(
    {
      completed_at:
        parsed.data.status === "completed" ? new Date().toISOString() : null,
      mountain_id: parsed.data.mountainId,
      status: parsed.data.status,
      user_id: user.id,
    },
    { onConflict: "user_id,mountain_id" },
  );

  if (error) {
    return {
      success: false as const,
      message: "Perjalanan belum dapat disimpan. Silakan coba lagi.",
    };
  }

  revalidatePath("/passport");
  return { success: true as const };
}
