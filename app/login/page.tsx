import type { Metadata } from "next";

import { AuthenticationCard } from "@/components/auth/authentication-card";
import { Container } from "@/components/common/container";
import { getSafeRedirectPath } from "@/lib/auth/redirect";

export const metadata: Metadata = {
  title: "Login | Jejak Puncak",
  description:
    "Masuk ke akun Jejak Puncak untuk mengelola Wishlist, Passport, dan progres pendakian.",
};

type LoginPageProps = {
  searchParams: Promise<{ error?: string; mode?: string; next?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error, mode, next } = await searchParams;
  const initialView = mode === "register" || mode === "forgot" ? mode : "login";

  return (
    <section className="bg-surface py-xl md:py-3xl">
      <Container className="flex justify-center">
        <h1 className="sr-only">Login Jejak Puncak</h1>
        <AuthenticationCard
          initialError={
            error === "oauth_callback"
              ? "Login Google belum berhasil atau dibatalkan. Silakan coba lagi."
              : undefined
          }
          initialView={initialView}
          nextPath={getSafeRedirectPath(next)}
        />
      </Container>
    </section>
  );
}
