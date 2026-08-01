"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { registerAction } from "@/app/login/actions";
import { PasswordField } from "@/components/auth/password-field";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { trackEvent } from "@/lib/analytics";
import { registerSchema, type RegisterValues } from "@/lib/auth/validation";

type RegisterFormProps = {
  nextPath: string;
};

export function RegisterForm({ nextPath }: RegisterFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState<"error" | "success" | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const {
    formState: { errors, isSubmitting, isValid },
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
    router.replace(nextPath);
    router.refresh();
  });

  return (
    <form className="flex flex-col gap-md" noValidate onSubmit={onSubmit}>
      <FieldGroup>
        <Field data-invalid={errors.displayName ? "true" : undefined}>
          <FieldLabel htmlFor="register-name">Nama tampilan</FieldLabel>
          <Input
            {...register("displayName")}
            aria-invalid={errors.displayName ? true : undefined}
            autoComplete="name"
            id="register-name"
            placeholder="Nama yang akan tampil"
            required
          />
          {errors.displayName ? (
            <FieldError>{errors.displayName.message}</FieldError>
          ) : null}
        </Field>

        <Field data-invalid={errors.email ? "true" : undefined}>
          <FieldLabel htmlFor="register-email">Email</FieldLabel>
          <Input
            {...register("email")}
            aria-invalid={errors.email ? true : undefined}
            autoComplete="email"
            id="register-email"
            inputMode="email"
            placeholder="nama@email.com"
            required
            type="email"
          />
          {errors.email ? (
            <FieldError>{errors.email.message}</FieldError>
          ) : null}
        </Field>

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
        disabled={!isValid || status === "success"}
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
