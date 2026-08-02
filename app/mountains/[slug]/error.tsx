"use client";

import { Container } from "@/components/common/container";
import { ErrorState } from "@/components/common/error-state";
import { MotionLink } from "@/components/common/motion-primitives";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";

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
            <MotionLink
              className={buttonVariants({ variant: "outline" })}
              href="/explore"
            >
              Kembali ke Explore
            </MotionLink>
          </div>
        }
        description="Data detail belum dapat dijangkau. Periksa koneksi atau coba kembali ke katalog."
        title="Detail gunung belum dapat dimuat"
      />
    </Container>
  );
}
