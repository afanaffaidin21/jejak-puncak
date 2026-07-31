import { LockKeyhole } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/common/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LoginPlaceholderPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function LoginPlaceholderPage({
  searchParams,
}: LoginPlaceholderPageProps) {
  const { next } = await searchParams;

  return (
    <section className="bg-surface py-4xl md:py-5xl">
      <Container className="max-w-2xl text-center">
        <span className="mx-auto flex size-2xl items-center justify-center rounded-full bg-accent text-accent-foreground">
          <LockKeyhole aria-hidden="true" className="size-md" />
        </span>
        <p className="mt-lg text-label font-semibold text-primary">
          Placeholder autentikasi
        </p>
        <h1 className="mt-xs text-balance font-heading text-h1 font-semibold text-text-primary">
          Login hadir pada fase berikutnya.
        </h1>
        <p className="mt-md text-pretty text-body-lg text-text-secondary">
          Wishlist dan Passport membutuhkan akun. Halaman ini sengaja tidak
          mengimplementasikan autentikasi pada Phase 2.
        </p>
        <Link
          className={cn(buttonVariants({ variant: "outline" }), "mt-lg")}
          href={next?.startsWith("/") ? next : "/explore"}
        >
          Kembali menjelajah
        </Link>
      </Container>
    </section>
  );
}
