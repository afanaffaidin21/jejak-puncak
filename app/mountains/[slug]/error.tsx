"use client";

import Link from "next/link";

import { Container } from "@/components/common/container";
import { ErrorState } from "@/components/common/error-state";
import { Button, buttonVariants } from "@/components/ui/button";

export default function MountainDetailError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="py-4xl">
      <ErrorState
        action={
          <div className="flex flex-wrap gap-xs">
            <Button onClick={reset}>Coba lagi</Button>
            <Link
              className={buttonVariants({ variant: "outline" })}
              href="/explore"
            >
              Kembali ke Explore
            </Link>
          </div>
        }
        description="Data detail belum dapat dijangkau. Periksa koneksi atau coba kembali ke katalog."
        title="Detail gunung belum dapat dimuat"
      />
    </Container>
  );
}
