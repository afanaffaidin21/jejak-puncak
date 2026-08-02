import type { ReactNode } from "react";

import { Container } from "@/components/common/container";
import { cn } from "@/lib/utils";

type NavigationItem = {
  id: string;
  label: string;
};

type StaticPageLayoutProps = {
  children: ReactNode;
  description: string;
  eyebrow: string;
  lastUpdated?: string;
  navigation: readonly NavigationItem[];
  notice?: string;
  title: string;
};

type StaticSectionProps = {
  children: ReactNode;
  className?: string;
  id: string;
  title: string;
};

export const staticLinkClassName =
  "rounded-sm font-medium text-primary underline decoration-primary/35 underline-offset-4 transition-colors duration-fast ease-standard hover:text-primary-hover hover:decoration-primary";

export function StaticPageLayout({
  children,
  description,
  eyebrow,
  lastUpdated,
  navigation,
  notice,
  title,
}: StaticPageLayoutProps) {
  return (
    <>
      <header className="border-b border-divider bg-surface py-2xl md:py-3xl">
        <Container>
          <p className="text-label font-semibold text-primary">{eyebrow}</p>
          <h1 className="mt-xs max-w-4xl text-balance font-heading text-h1 font-semibold text-text-primary">
            {title}
          </h1>
          <p className="mt-md max-w-2xl text-pretty text-body-lg text-text-secondary">
            {description}
          </p>
          {lastUpdated ? (
            <p className="mt-sm text-caption text-text-muted">
              Terakhir diperbarui: {lastUpdated}
            </p>
          ) : null}
        </Container>
      </header>

      <Container className="grid gap-xl py-2xl md:py-3xl lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-2xl">
        <aside className="lg:col-start-2 lg:row-start-1">
          <nav
            aria-label="Daftar isi halaman"
            className="rounded-xl border border-divider bg-surface-elevated p-md shadow-flat lg:sticky lg:top-24"
          >
            <h2 className="font-heading text-h4 font-semibold text-text-primary">
              Di halaman ini
            </h2>
            <ul className="mt-sm space-y-2xs">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a
                    className="inline-flex min-h-touch w-full items-center rounded-md px-xs py-2xs text-body-sm text-text-secondary transition-colors duration-fast ease-standard hover:bg-muted hover:text-text-primary"
                    href={`#${item.id}`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <article className="min-w-0 max-w-3xl space-y-2xl lg:col-start-1 lg:row-start-1">
          {notice ? (
            <div className="rounded-xl border border-warning/35 bg-warning/10 p-md text-body-sm text-text-primary">
              <p>{notice}</p>
            </div>
          ) : null}
          {children}
        </article>
      </Container>
    </>
  );
}

export function StaticSection({
  children,
  className,
  id,
  title,
}: StaticSectionProps) {
  return (
    <section className={cn("scroll-mt-28 space-y-sm", className)} id={id}>
      <h2 className="text-balance font-heading text-h3 font-semibold text-text-primary">
        {title}
      </h2>
      <div className="space-y-sm text-pretty text-body text-text-secondary">
        {children}
      </div>
    </section>
  );
}
