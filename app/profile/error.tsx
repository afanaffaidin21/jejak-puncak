"use client";

import { Container } from "@/components/common/container";
import { ErrorState } from "@/components/common/error-state";
import { Button } from "@/components/ui/button";

export default function ProfileError({ reset }: { reset: () => void }) {
  return (
    <Container className="py-xl">
      <ErrorState
        action={<Button onClick={reset}>Coba Lagi</Button>}
        description="Profil tidak dapat dimuat. Periksa koneksi lalu coba lagi."
        title="Profile belum dapat dibuka"
      />
    </Container>
  );
}
