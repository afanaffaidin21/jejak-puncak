"use client";

import { Container } from "@/components/common/container";
import { ErrorState } from "@/components/common/error-state";
import { Button } from "@/components/ui/button";

export default function ExploreError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="py-3xl">
      <ErrorState
        action={<Button onClick={reset}>Coba lagi</Button>}
        description="Terjadi kendala saat menyiapkan katalog Explore."
        title="Explore belum dapat ditampilkan"
      />
    </Container>
  );
}
