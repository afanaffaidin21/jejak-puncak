"use server";

import {
  avatarSchema,
  personalInformationSchema,
  profilePreferencesSchema,
} from "@/lib/profile-validation";
import { updatePasswordSchema } from "@/lib/auth/validation";
import { createClient } from "@/lib/supabase/server";

type ProfileActionResult =
  { success: true; avatarUrl?: string } | { success: false; message: string };

async function getAuthenticatedClient() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  return { supabase, user: error ? null : data.user };
}

export async function updatePersonalInformationAction(
  input: unknown,
): Promise<ProfileActionResult> {
  const parsed = personalInformationSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: "Periksa kembali informasi profil." };
  }

  const { supabase, user } = await getAuthenticatedClient();
  if (!user)
    return { success: false, message: "Sesi berakhir. Silakan login kembali." };

  const { error } = await supabase
    .from("profiles")
    .update({
      bio: parsed.data.bio || null,
      display_name: parsed.data.displayName,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error)
    return { success: false, message: "Perubahan tidak dapat disimpan." };

  const { error: metadataError } = await supabase.auth.updateUser({
    data: { display_name: parsed.data.displayName },
  });

  return metadataError
    ? {
        success: false,
        message:
          "Profil tersimpan, tetapi tampilan akun belum dapat diperbarui.",
      }
    : { success: true };
}

export async function updateProfilePreferencesAction(
  input: unknown,
): Promise<ProfileActionResult> {
  const parsed = profilePreferencesSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: "Periksa kembali preferensi pendakian." };
  }

  const { supabase, user } = await getAuthenticatedClient();
  if (!user)
    return { success: false, message: "Sesi berakhir. Silakan login kembali." };

  const { error } = await supabase
    .from("profiles")
    .update({
      experience_level: parsed.data.experienceLevel,
      hiking_goals: parsed.data.hikingGoals,
      measurement_unit: parsed.data.measurementUnit,
      preferred_region:
        parsed.data.preferredRegion === "anywhere"
          ? null
          : parsed.data.preferredRegion,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  return error
    ? { success: false, message: "Perubahan tidak dapat disimpan." }
    : { success: true };
}

export async function uploadAvatarAction(
  formData: FormData,
): Promise<ProfileActionResult> {
  const parsed = avatarSchema.safeParse(formData.get("avatar"));
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Avatar tidak valid.",
    };
  }

  const { supabase, user } = await getAuthenticatedClient();
  if (!user)
    return { success: false, message: "Sesi berakhir. Silakan login kembali." };

  const extension =
    parsed.data.type === "image/png"
      ? "png"
      : parsed.data.type === "image/webp"
        ? "webp"
        : "jpg";
  const path = `${user.id}/avatar.${extension}`;
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(path, parsed.data, {
      cacheControl: "3600",
      contentType: parsed.data.type,
      upsert: true,
    });

  if (uploadError)
    return { success: false, message: "Avatar tidak dapat diunggah." };

  const publicUrl = supabase.storage.from("avatars").getPublicUrl(path)
    .data.publicUrl;
  const avatarUrl = `${publicUrl}?v=${Date.now()}`;
  const [{ error: profileError }, { error: metadataError }] = await Promise.all(
    [
      supabase
        .from("profiles")
        .update({ avatar_url: avatarUrl, updated_at: new Date().toISOString() })
        .eq("id", user.id),
      supabase.auth.updateUser({ data: { avatar_url: avatarUrl } }),
    ],
  );

  return profileError || metadataError
    ? {
        success: false,
        message: "Avatar terunggah, tetapi profil belum dapat diperbarui.",
      }
    : { success: true, avatarUrl };
}

export async function changeProfilePasswordAction(
  input: unknown,
): Promise<ProfileActionResult> {
  const parsed = updatePasswordSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: "Periksa kembali password baru." };
  }

  const { supabase, user } = await getAuthenticatedClient();
  if (!user) {
    return {
      success: false,
      message: "Sesi berakhir. Silakan login kembali.",
    };
  }

  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  });

  return error
    ? {
        success: false,
        message: "Password belum dapat diperbarui. Silakan coba lagi.",
      }
    : { success: true };
}

export async function deleteAccountAction(): Promise<ProfileActionResult> {
  const { supabase, user } = await getAuthenticatedClient();
  if (!user)
    return { success: false, message: "Sesi berakhir. Silakan login kembali." };

  const { data: files, error: listError } = await supabase.storage
    .from("avatars")
    .list(user.id);
  if (listError) {
    return {
      success: false,
      message: "Data avatar belum dapat diperiksa. Silakan coba lagi.",
    };
  }

  if (files?.length) {
    const { error: removeError } = await supabase.storage
      .from("avatars")
      .remove(files.map((file) => `${user.id}/${file.name}`));
    if (removeError) {
      return {
        success: false,
        message: "Avatar belum dapat dihapus. Silakan coba lagi.",
      };
    }
  }

  const { error } = await supabase.rpc("delete_my_account");
  if (error)
    return {
      success: false,
      message: "Akun belum dapat dihapus. Silakan coba lagi.",
    };

  await supabase.auth.signOut({ scope: "local" });
  return { success: true };
}
