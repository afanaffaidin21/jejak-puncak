"use server";

import { getSiteUrl } from "@/lib/auth/site-url";
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
} from "@/lib/auth/validation";
import { createClient } from "@/lib/supabase/server";

type AuthActionResult =
  | { success: true; status: "confirmation-required" | "signed-in" }
  | { success: false; message: string };

export async function loginAction(input: unknown): Promise<AuthActionResult> {
  const parsed = loginSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      message: "Periksa kembali data login yang kamu masukkan.",
    };
  }

  const supabase = await createClient({ remember: parsed.data.remember });
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return {
      success: false,
      message: "Email atau password salah. Silakan coba lagi.",
    };
  }

  return { success: true, status: "signed-in" };
}

export async function registerAction(
  input: unknown,
): Promise<AuthActionResult> {
  const parsed = registerSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      message: "Periksa kembali data pendaftaran yang kamu masukkan.",
    };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: { display_name: parsed.data.displayName },
      emailRedirectTo: `${getSiteUrl()}/auth/callback?next=/profile`,
    },
  });

  if (error) {
    return {
      success: false,
      message: "Pendaftaran belum berhasil. Silakan coba lagi beberapa saat.",
    };
  }

  return {
    success: true,
    status: data.session ? "signed-in" : "confirmation-required",
  };
}

export async function forgotPasswordAction(
  input: unknown,
): Promise<AuthActionResult> {
  const parsed = forgotPasswordSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      message: "Masukkan alamat email yang valid.",
    };
  }

  const supabase = await createClient();
  const redirectUrl = new URL("/auth/callback", getSiteUrl());
  redirectUrl.searchParams.set("flow", "recovery");
  redirectUrl.searchParams.set("next", "/auth/update-password");

  const { error } = await supabase.auth.resetPasswordForEmail(
    parsed.data.email,
    { redirectTo: redirectUrl.toString() },
  );

  if (error) {
    return {
      success: false,
      message:
        "Permintaan belum dapat diproses. Tunggu beberapa saat lalu coba lagi.",
    };
  }

  return { success: true, status: "confirmation-required" };
}

export async function logoutAction() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  return error
    ? {
        success: false as const,
        message: "Logout belum berhasil. Silakan coba lagi.",
      }
    : { success: true as const };
}

export type { AuthActionResult };
