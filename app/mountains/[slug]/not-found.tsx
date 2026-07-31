import Link from "next/link";

import { Container } from "@/components/common/container";
import { EmptyState } from "@/components/common/empty-state";
import { buttonVariants } from "@/components/ui/button";

export default function MountainNotFound() {
  return (
    <Container className="py-4xl">
      <EmptyState
        action={
          <Link className={buttonVariants()} href="/explore">
            Cari gunung lain
          </Link>
        }
        description="Slug ini tidak tersedia atau belum berstatus terbit."
        title="Gunung tidak ditemukan"
      />
    </Container>
  );
}
