import type { Metadata } from "next";

import { UpdatePasswordForm } from "@/components/auth/update-password-form";
import { Container } from "@/components/common/container";
import { MotionLink } from "@/components/common/motion-primitives";
import { buttonVariants } from "@/components/ui/button-variants";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Buat Password Baru | Jejak Puncak",
  description: "Perbarui password akun Jejak Puncak dengan aman.",
  robots: { index: false, follow: false },
};

export default async function UpdatePasswordPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <section className="bg-surface py-xl md:py-3xl">
      <Container className="flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-h3">
              {user ? "Buat password baru" : "Tautan reset tidak valid"}
            </CardTitle>
            <CardDescription>
              {user
                ? "Gunakan password yang kuat dan berbeda dari password sebelumnya."
                : "Tautan mungkin sudah digunakan atau kedaluwarsa. Minta tautan baru untuk melanjutkan."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {user ? (
              <UpdatePasswordForm />
            ) : (
              <MotionLink
                className={cn(buttonVariants({ size: "lg" }), "w-full")}
                href="/login?mode=forgot"
              >
                Minta tautan baru
              </MotionLink>
            )}
          </CardContent>
        </Card>
      </Container>
    </section>
  );
}
