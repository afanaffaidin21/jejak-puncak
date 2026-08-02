"use client";

import { useState } from "react";

import { GoogleLogo } from "@/components/auth/google-logo";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { createClient } from "@/lib/supabase/client";

type GoogleLoginButtonProps = {
  initialError?: string;
  nextPath: string;
};

export function GoogleLoginButton({
  initialError,
  nextPath,
}: GoogleLoginButtonProps) {
  const [errorMessage, setErrorMessage] = useState(initialError ?? "");
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setErrorMessage("");
    setIsLoading(true);
    trackEvent("google_login_click");

    try {
      const supabase = createClient();
      const callbackUrl = new URL("/auth/callback", window.location.origin);
      callbackUrl.searchParams.set("next", nextPath);
      callbackUrl.searchParams.set("provider", "google");

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: callbackUrl.toString() },
      });

      if (error) {
        setErrorMessage(
          "Login Google belum dapat dimulai. Silakan coba lagi beberapa saat.",
        );
        setIsLoading(false);
        trackEvent("login_failed", { provider: "google" });
      }
    } catch {
      setErrorMessage(
        "Login Google belum dapat dimulai. Periksa koneksi lalu coba lagi.",
      );
      setIsLoading(false);
      trackEvent("login_failed", { provider: "google" });
    }
  };

  return (
    <div className="flex flex-col gap-xs">
      {errorMessage ? (
        <Alert variant="destructive">
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      ) : null}
      <Button
        className="w-full"
        isLoading={isLoading}
        loadingLabel="Membuka Google…"
        onClick={handleGoogleLogin}
        size="lg"
        type="button"
        variant="outline"
      >
        <GoogleLogo className="size-5" />
        Lanjutkan dengan Google
      </Button>
    </div>
  );
}
