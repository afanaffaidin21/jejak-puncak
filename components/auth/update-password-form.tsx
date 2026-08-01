"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { updatePasswordAction } from "@/app/auth/update-password/actions";
import { PasswordField } from "@/components/auth/password-field";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import {
  updatePasswordSchema,
  type UpdatePasswordValues,
} from "@/lib/auth/validation";
import { cn } from "@/lib/utils";

export function UpdatePasswordForm() {
  const [status, setStatus] = useState<"error" | "success" | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const {
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    register,
  } = useForm<UpdatePasswordValues>({
    defaultValues: { confirmPassword: "", password: "" },
    mode: "onChange",
    resolver: zodResolver(updatePasswordSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus(null);
    setStatusMessage("");
    const result = await updatePasswordAction(values);

    if (!result.success) {
      setStatus("error");
      setStatusMessage(result.message);
      return;
    }

    setStatus("success");
    setStatusMessage("Password berhasil diperbarui.");
  });

  if (status === "success") {
    return (
      <div className="flex flex-col gap-md">
        <Alert>
          <AlertDescription>{statusMessage}</AlertDescription>
        </Alert>
        <Link
          className={cn(buttonVariants({ size: "lg" }), "w-full")}
          href="/profile"
        >
          Lanjut ke profil
        </Link>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-md" noValidate onSubmit={onSubmit}>
      <FieldGroup>
        <PasswordField
          {...register("password")}
          autoComplete="new-password"
          description="Minimal 8 karakter, dengan setidaknya satu huruf dan satu angka."
          error={errors.password?.message}
          id="new-password"
          label="Password baru"
          required
        />
        <PasswordField
          {...register("confirmPassword")}
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          id="confirm-new-password"
          label="Konfirmasi password baru"
          required
        />
      </FieldGroup>

      {statusMessage ? (
        <Alert variant="destructive">
          <AlertDescription>{statusMessage}</AlertDescription>
        </Alert>
      ) : null}

      <Button
        className="w-full"
        disabled={!isValid}
        isLoading={isSubmitting}
        loadingLabel="Memperbarui password…"
        size="lg"
        type="submit"
      >
        Simpan password baru
      </Button>
    </form>
  );
}
