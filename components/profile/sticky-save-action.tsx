import { Button } from "@/components/ui/button";

export function StickySaveAction({
  disabled,
  isLoading,
}: {
  disabled?: boolean;
  isLoading: boolean;
}) {
  return (
    <div className="sticky bottom-[calc(var(--spacing-mobile-nav)+var(--spacing-safe-area))] z-sticky -mx-sm border-t border-divider bg-background/95 px-sm py-xs backdrop-blur lg:static lg:mx-0 lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none">
      <Button
        className="w-full lg:w-auto"
        disabled={disabled}
        isLoading={isLoading}
        loadingLabel="Menyimpan…"
        size="lg"
        type="submit"
      >
        Simpan perubahan
      </Button>
    </div>
  );
}
