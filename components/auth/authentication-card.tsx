"use client";

import { ArrowLeft, MountainSnow } from "lucide-react";
import { useEffect, useState } from "react";

import { LoginForm } from "@/components/auth/login-form";
import { RegisterForm } from "@/components/auth/register-form";
import { GoogleLoginButton } from "@/components/auth/google-login-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FieldSeparator } from "@/components/ui/field";
import { trackEvent } from "@/lib/analytics";

type AuthView = "forgot" | "login" | "register";

type AuthenticationCardProps = {
  initialError?: string;
  initialView: AuthView;
  nextPath: string;
};

export function AuthenticationCard({
  initialError,
  initialView,
  nextPath,
}: AuthenticationCardProps) {
  const [view, setView] = useState<AuthView>(initialView);

  useEffect(() => {
    trackEvent("login_page_view");
  }, []);

  if (view === "forgot") {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <Button
            aria-label="Kembali ke login"
            className="mb-xs self-start"
            onClick={() => setView("login")}
            size="icon-sm"
            variant="ghost"
          >
            <ArrowLeft aria-hidden="true" />
          </Button>
          <CardTitle className="text-h3">Lupa password?</CardTitle>
          <CardDescription>
            Form pemulihan akun sedang disiapkan. Kembali ke login untuk
            melanjutkan.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <span className="mx-auto mb-xs flex size-xl items-center justify-center rounded-full bg-accent text-accent-foreground">
          <MountainSnow aria-hidden="true" />
        </span>
        <CardTitle className="text-h3">
          Selamat datang di Jejak Puncak
        </CardTitle>
        <CardDescription>
          Masuk atau buat akun untuk menyimpan rencana pendakianmu.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          onValueChange={(value) => setView(value as "login" | "register")}
          value={view}
        >
          <TabsList className="mb-md grid h-touch w-full grid-cols-2">
            <TabsTrigger value="login">Masuk</TabsTrigger>
            <TabsTrigger value="register">Daftar</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm
              nextPath={nextPath}
              onForgotPassword={() => setView("forgot")}
            />
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm nextPath={nextPath} />
          </TabsContent>
        </Tabs>
        <div className="mt-md flex flex-col gap-md">
          <FieldSeparator>atau</FieldSeparator>
          <GoogleLoginButton initialError={initialError} nextPath={nextPath} />
        </div>
      </CardContent>
    </Card>
  );
}
