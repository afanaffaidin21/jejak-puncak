"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { loginAction } from "@/app/login/actions";
import { PasswordField } from "@/components/auth/password-field";
import { TextField } from "@/components/common/text-field";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { trackEvent } from "@/lib/analytics";
import { loginSchema, type LoginValues } from "@/lib/auth/validation";

type LoginFormProps = {
  nextPath: string;
  onForgotPassword: () => void;
};

export function LoginForm({ nextPath, onForgotPassword }: LoginFormProps) {
  const [statusMessage, setStatusMessage] = useState("");
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
    register,
  } = useForm<LoginValues>({
    defaultValues: { email: "", password: "", remember: true },
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit(
    async (values) => {
      setStatusMessage("");

      try {
        const result = await loginAction(values);

        if (!result.success) {
          setStatusMessage(result.message);
          trackEvent("login_failed");
          return;
        }

        setStatusMessage("Login berhasil. Mengarahkan ke halaman tujuan.");
        trackEvent("login_success");
        window.location.replace(nextPath);
      } catch {
        setStatusMessage(
          "Login belum dapat diproses. Periksa koneksi lalu coba lagi.",
        );
        trackEvent("login_failed");
      }
    },
    () => {
      setStatusMessage("Periksa kembali email dan password yang kamu isi.");
    },
  );

  return (
    <form className="flex flex-col gap-md" noValidate onSubmit={onSubmit}>
      <FieldGroup>
        <TextField
          {...register("email")}
          autoComplete="email"
          error={errors.email?.message}
          id="login-email"
          inputMode="email"
          label="Email"
          placeholder="nama@email.com"
          required
          spellCheck={false}
          type="email"
        />

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
