"use server";

import { createClient } from "@/lib/supabase/server";
import { loginSchema, registerSchema } from "@/lib/auth/validation";

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

export type { AuthActionResult };
