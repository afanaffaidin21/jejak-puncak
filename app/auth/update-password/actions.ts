"use server";

import { updatePasswordSchema } from "@/lib/auth/validation";
import { createClient } from "@/lib/supabase/server";

type UpdatePasswordResult =
  { success: true } | { success: false; message: string };

export async function updatePasswordAction(
  input: unknown,
): Promise<UpdatePasswordResult> {
  const parsed = updatePasswordSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      message: "Periksa kembali password baru yang kamu masukkan.",
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: "Sesi reset sudah berakhir. Minta tautan reset yang baru.",
    };
  }

  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  });

  if (error) {
    return {
      success: false,
      message:
        "Password belum dapat diperbarui. Minta tautan baru atau coba lagi beberapa saat.",
    };
  }

  return { success: true };
}
