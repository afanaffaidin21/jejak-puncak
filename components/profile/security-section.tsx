"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { changeProfilePasswordAction } from "@/app/profile/actions";
import { PasswordField } from "@/components/auth/password-field";
import { FormFeedback } from "@/components/profile/form-feedback";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { trackEvent } from "@/lib/analytics";
import {
  updatePasswordSchema,
  type UpdatePasswordValues,
} from "@/lib/auth/validation";

export function SecuritySection({ provider }: { provider: string }) {
  const [feedback, setFeedback] = useState<{
    message: string;
    status: "error" | "success" | null;
  }>({ message: "", status: null });
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<UpdatePasswordValues>({
    defaultValues: { confirmPassword: "", password: "" },
    mode: "onChange",
    resolver: zodResolver(updatePasswordSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    trackEvent("password_change_started");
    setFeedback({ message: "", status: null });
    try {
      const result = await changeProfilePasswordAction(values);
      if (!result.success) {
        setFeedback({ message: result.message, status: "error" });
        return;
      }

      reset();
      setFeedback({
        message: "Password berhasil diperbarui.",
        status: "success",
      });
    } catch {
      setFeedback({
        message: "Password belum dapat diperbarui. Silakan coba lagi.",
        status: "error",
      });
    }
  });

  const providerLabel = provider === "google" ? "Google" : "Email dan password";

  return (
    <div className="flex flex-col gap-md">
      <Card>
        <CardHeader>
          <CardTitle>Akun terhubung</CardTitle>
          <CardDescription>
            Metode utama yang terhubung ke akun ini.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Badge variant="secondary">{providerLabel}</Badge>
        </CardContent>
      </Card>

      <form noValidate onSubmit={onSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Ubah password</CardTitle>
            <CardDescription>
              Gunakan password unik yang tidak dipakai di layanan lain.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-md">
            <FieldGroup>
              <PasswordField
                {...register("password")}
                autoComplete="new-password"
                description="Minimal 8 karakter, dengan setidaknya satu huruf dan satu angka."
                error={errors.password?.message}
                id="profile-new-password"
                label="Password baru"
                required
              />
              <PasswordField
                {...register("confirmPassword")}
                autoComplete="new-password"
                error={errors.confirmPassword?.message}
                id="profile-confirm-password"
                label="Konfirmasi password baru"
                required
              />
            </FieldGroup>
            <FormFeedback {...feedback} />
            <Button
              className="w-full sm:w-auto sm:self-start"
              isLoading={isSubmitting}
              loadingLabel="Memperbarui…"
              size="lg"
              type="submit"
            >
              Perbarui password
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
