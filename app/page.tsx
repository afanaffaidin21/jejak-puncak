import { Container } from "@/components/common/container";
import { ResponsiveGrid } from "@/components/common/responsive-grid";

export default function Home() {
  return (
    <section
      aria-labelledby="foundation-heading"
      className="bg-background py-4xl md:py-5xl"
    >
      <Container>
        <ResponsiveGrid>
          <div className="col-span-4 text-center md:col-span-6 md:col-start-2 lg:col-span-8 lg:col-start-3">
            <p className="text-label font-semibold text-primary">
              Fondasi Jejak Puncak
            </p>
            <h1
              className="mt-sm text-balance font-heading text-h1 font-semibold text-text-primary"
              id="foundation-heading"
            >
              Siap untuk perjalanan berikutnya.
            </h1>
            <p className="mx-auto mt-md max-w-reading text-pretty text-body-lg text-text-secondary">
              Design system dan layout bersama sudah siap untuk pengembangan
              fitur secara bertahap.
            </p>
          </div>
        </ResponsiveGrid>
      </Container>
    </section>
  );
}
