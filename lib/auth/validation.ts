import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .min(1, "Email wajib diisi.")
  .email("Masukkan alamat email yang valid.")
  .max(254, "Alamat email terlalu panjang.")
  .transform((value) => value.toLowerCase());

const passwordSchema = z
  .string()
  .min(8, "Gunakan minimal 8 karakter.")
  .max(72, "Gunakan maksimal 72 karakter.")
  .regex(/[A-Za-z]/, "Tambahkan setidaknya satu huruf.")
  .regex(/[0-9]/, "Tambahkan setidaknya satu angka.");

export const loginSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .min(1, "Password wajib diisi.")
    .max(72, "Password terlalu panjang."),
  remember: z.boolean(),
});

export const registerSchema = z
  .object({
    displayName: z
      .string()
      .trim()
      .min(2, "Nama tampilan minimal 2 karakter.")
      .max(60, "Nama tampilan maksimal 60 karakter."),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Konfirmasi password belum sama.",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({ email: emailSchema });

export const updatePasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Konfirmasi password belum sama.",
    path: ["confirmPassword"],
  });

export type ForgotPasswordValues = z.input<typeof forgotPasswordSchema>;
export type LoginValues = z.input<typeof loginSchema>;
export type RegisterValues = z.input<typeof registerSchema>;
export type UpdatePasswordValues = z.input<typeof updatePasswordSchema>;
