import { z } from "zod";

import {
  FINDER_EXPERIENCES,
  FINDER_GOALS,
  FINDER_REGIONS,
} from "./finder-validation.ts";

export const personalInformationSchema = z.object({
  bio: z.string().trim().max(500, "Bio maksimal 500 karakter."),
  displayName: z
    .string()
    .trim()
    .min(2, "Nama tampilan minimal 2 karakter.")
    .max(60, "Nama tampilan maksimal 60 karakter."),
});

export const profilePreferencesSchema = z.object({
  experienceLevel: z.enum(FINDER_EXPERIENCES).nullable(),
  hikingGoals: z
    .array(z.enum(FINDER_GOALS))
    .max(3, "Pilih maksimal 3 tujuan pendakian."),
  measurementUnit: z.enum(["metric", "imperial"]),
  preferredRegion: z.enum(FINDER_REGIONS),
});

export const avatarSchema = z
  .instanceof(File)
  .refine((file) => file.size > 0, "Pilih file avatar terlebih dahulu.")
  .refine(
    (file) => file.size <= 2 * 1024 * 1024,
    "Ukuran avatar maksimal 2 MB.",
  )
  .refine(
    (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
    "Gunakan gambar JPG, PNG, atau WebP.",
  );

export type PersonalInformationValues = z.input<
  typeof personalInformationSchema
>;
export type ProfilePreferencesValues = z.input<typeof profilePreferencesSchema>;
