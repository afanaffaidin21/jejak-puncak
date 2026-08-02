import { Container } from "@/components/common/container";
import { EmptyState } from "@/components/common/empty-state";
import { MotionLink } from "@/components/common/motion-primitives";
import { buttonVariants } from "@/components/ui/button-variants";

export default function MountainNotFound() {
  return (
    <Container className="py-4xl">
      <EmptyState
        action={
          <MotionLink className={buttonVariants()} href="/explore">
            Cari gunung lain
          </MotionLink>
        }
        description="Slug ini tidak tersedia atau belum berstatus terbit."
        title="Gunung tidak ditemukan"
      />
    </Container>
  );
}
