"use client";

import { Container } from "@/components/common/container";
import { ErrorState } from "@/components/common/error-state";
import { Button } from "@/components/ui/button";

export default function PassportError({ reset }: { reset: () => void }) {
  return (
    <Container className="py-xl">
      <ErrorState
        action={<Button onClick={reset}>Coba Lagi</Button>}
        description="Data Passport tidak dapat dimuat. Periksa koneksi lalu coba lagi."
        title="Passport belum dapat dibuka"
      />
    </Container>
  );
}
