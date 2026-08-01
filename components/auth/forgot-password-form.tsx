"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { forgotPasswordAction } from "@/app/login/actions";
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
import {
  forgotPasswordSchema,
  type ForgotPasswordValues,
} from "@/lib/auth/validation";

type ForgotPasswordFormProps = {
  initialError?: string;
};

export function ForgotPasswordForm({ initialError }: ForgotPasswordFormProps) {
  const [status, setStatus] = useState<"error" | "success" | null>(
    initialError ? "error" : null,
  );
  const [statusMessage, setStatusMessage] = useState(initialError ?? "");
  const {
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    register,
  } = useForm<ForgotPasswordValues>({
    defaultValues: { email: "" },
    mode: "onChange",
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus(null);
    setStatusMessage("");
    trackEvent("forgot_password_started");
    const result = await forgotPasswordAction(values);

    if (!result.success) {
      setStatus("error");
      setStatusMessage(result.message);
      return;
    }

    setStatus("success");
    setStatusMessage(
      "Jika email terdaftar, tautan reset akan dikirim. Periksa kotak masuk dan folder spam.",
    );
    trackEvent("forgot_password_completed");
  });

  return (
    <form className="flex flex-col gap-md" noValidate onSubmit={onSubmit}>
      <FieldGroup>
        <Field data-invalid={errors.email ? "true" : undefined}>
          <FieldLabel htmlFor="forgot-email">Email</FieldLabel>
          <Input
            {...register("email")}
            aria-invalid={errors.email ? true : undefined}
            autoComplete="email"
            id="forgot-email"
            inputMode="email"
            placeholder="nama@email.com"
            required
            type="email"
          />
          {errors.email ? (
            <FieldError>{errors.email.message}</FieldError>
          ) : null}
        </Field>
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
        loadingLabel="Mengirim tautan…"
        size="lg"
        type="submit"
      >
        Kirim tautan reset
      </Button>
    </form>
  );
}
