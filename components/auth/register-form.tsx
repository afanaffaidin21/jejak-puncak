"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { registerAction } from "@/app/login/actions";
import { PasswordField } from "@/components/auth/password-field";
import { TextField } from "@/components/common/text-field";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { trackEvent } from "@/lib/analytics";
import { registerSchema, type RegisterValues } from "@/lib/auth/validation";

type RegisterFormProps = {
  nextPath: string;
};

export function RegisterForm({ nextPath }: RegisterFormProps) {
  const [status, setStatus] = useState<"error" | "success" | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<RegisterValues>({
    defaultValues: {
      confirmPassword: "",
      displayName: "",
      email: "",
      password: "",
    },
    mode: "onChange",
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus(null);
    setStatusMessage("");
    trackEvent("register_started");
    const result = await registerAction(values);

    if (!result.success) {
      setStatus("error");
      setStatusMessage(result.message);
      return;
    }

    setStatus("success");
    trackEvent("register_completed");

    if (result.status === "confirmation-required") {
      setStatusMessage(
        "Pendaftaran diterima. Periksa email untuk menyelesaikan konfirmasi akun.",
      );
      return;
    }

    setStatusMessage("Akun berhasil dibuat. Mengarahkan ke halaman tujuan.");
    window.location.replace(nextPath);
  });

  return (
    <form className="flex flex-col gap-md" noValidate onSubmit={onSubmit}>
      <FieldGroup>
        <TextField
          {...register("displayName")}
          autoComplete="name"
          error={errors.displayName?.message}
          id="register-name"
          label="Nama tampilan"
          placeholder="Nama yang akan tampil"
          required
        />

        <TextField
          {...register("email")}
          autoComplete="email"
          error={errors.email?.message}
          id="register-email"
          inputMode="email"
          label="Email"
          placeholder="nama@email.com"
          required
          spellCheck={false}
          type="email"
        />

        <PasswordField
          {...register("password")}
          autoComplete="new-password"
          description="Minimal 8 karakter, dengan setidaknya satu huruf dan satu angka."
          error={errors.password?.message}
          id="register-password"
          label="Password"
          required
        />

        <PasswordField
          {...register("confirmPassword")}
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          id="register-confirm-password"
          label="Konfirmasi password"
          required
        />
      </FieldGroup>

      {statusMessage ? (
        <Alert variant={status === "error" ? "destructive" : "default"}>
          <AlertDescription>{statusMessage}</AlertDescription>
        </Alert>
      ) : null}

      <Button
        className="w-full"
        disabled={status === "success"}
        isLoading={isSubmitting}
        loadingLabel="Membuat akun…"
        size="lg"
        type="submit"
      >
        Daftar
      </Button>
    </form>
  );
}
