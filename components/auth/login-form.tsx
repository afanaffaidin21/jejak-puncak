"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { loginAction } from "@/app/login/actions";
import { PasswordField } from "@/components/auth/password-field";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { trackEvent } from "@/lib/analytics";
import { loginSchema, type LoginValues } from "@/lib/auth/validation";

type LoginFormProps = {
  nextPath: string;
  onForgotPassword: () => void;
};

export function LoginForm({ nextPath, onForgotPassword }: LoginFormProps) {
  const router = useRouter();
  const [statusMessage, setStatusMessage] = useState("");
  const {
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    control,
    register,
  } = useForm<LoginValues>({
    defaultValues: { email: "", password: "", remember: true },
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatusMessage("");
    const result = await loginAction(values);

    if (!result.success) {
      setStatusMessage(result.message);
      trackEvent("login_failed");
      return;
    }

    setStatusMessage("Login berhasil. Mengarahkan ke halaman tujuan.");
    trackEvent("login_success");
    router.replace(nextPath);
    router.refresh();
  });

  return (
    <form className="flex flex-col gap-md" noValidate onSubmit={onSubmit}>
      <FieldGroup>
        <Field data-invalid={errors.email ? "true" : undefined}>
          <FieldLabel htmlFor="login-email">Email</FieldLabel>
          <Input
            {...register("email")}
            aria-invalid={errors.email ? true : undefined}
            autoComplete="email"
            id="login-email"
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
          autoComplete="current-password"
          error={errors.password?.message}
          id="login-password"
          label="Password"
          required
        />

        <div className="flex flex-wrap items-center justify-between gap-xs">
          <Field className="w-auto" orientation="horizontal">
            <Controller
              control={control}
              name="remember"
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  id="remember-me"
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <FieldLabel className="font-normal" htmlFor="remember-me">
              Ingat saya
            </FieldLabel>
          </Field>
          <Button
            onClick={onForgotPassword}
            size="sm"
            type="button"
            variant="link"
          >
            Lupa password?
          </Button>
        </div>
      </FieldGroup>

      {statusMessage ? (
        <Alert
          variant={
            statusMessage.startsWith("Login berhasil")
              ? "default"
              : "destructive"
          }
        >
          <AlertDescription>{statusMessage}</AlertDescription>
        </Alert>
      ) : null}

      <Button
        className="w-full"
        disabled={!isValid}
        isLoading={isSubmitting}
        loadingLabel="Sedang masuk…"
        size="lg"
        type="submit"
      >
        Masuk
      </Button>
    </form>
  );
}
