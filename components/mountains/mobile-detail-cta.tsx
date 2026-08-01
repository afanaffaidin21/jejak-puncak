import { Container } from "@/components/common/container";
import { DetailActions } from "@/components/mountains/detail-actions";

type MobileDetailCtaProps = {
  id: string;
  name: string;
  slug: string;
};

export function MobileDetailCta({ id, name, slug }: MobileDetailCtaProps) {
  return (
    <>
      <div className="h-mobile-nav lg:hidden" />
      <div className="fixed inset-x-0 bottom-[calc(var(--spacing-mobile-nav)+var(--spacing-safe-area))] z-sticky border-t border-divider bg-background/95 py-xs shadow-floating backdrop-blur lg:hidden">
        <Container>
          <DetailActions
            className="grid grid-cols-2 gap-xs [&>*]:w-full"
            id={id}
            name={name}
            slug={slug}
          />
        </Container>
      </div>
    </>
  );
}
