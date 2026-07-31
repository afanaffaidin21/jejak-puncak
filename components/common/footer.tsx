import { CodeXml, MountainSnow } from "lucide-react";
import Link from "next/link";

const SECONDARY_NAV_ITEMS = [
  { href: "/explore", label: "Jelajahi gunung" },
  { href: "/compare", label: "Bandingkan" },
  { href: "/finder", label: "Jejak Finder" },
  { href: "/map", label: "Peta pendakian" },
  { href: "/passport", label: "Jejak Passport" },
  { href: "/about", label: "Tentang kami" },
] as const;

const LEGAL_NAV_ITEMS = [
  { href: "/privacy", label: "Privasi" },
  { href: "/terms", label: "Ketentuan" },
] as const;

const footerLinkClassName =
  "rounded-sm text-body-sm text-text-secondary transition-colors duration-fast ease-standard hover:text-text-primary";

export function Footer() {
  return (
    <footer className="border-t border-divider bg-surface">
      <div className="mx-auto w-full max-w-content px-sm py-2xl sm:px-md md:py-3xl lg:px-lg">
        <div className="grid grid-cols-4 gap-x-md gap-y-2xl md:grid-cols-8 lg:grid-cols-12">
          <div className="col-span-4 lg:col-span-5">
            <Link
              className="inline-flex items-center gap-2xs rounded-md font-heading text-h4 font-semibold text-text-primary"
              href="/"
            >
              <MountainSnow
                aria-hidden="true"
                className="size-md"
                strokeWidth={1.8}
              />
              Jejak Puncak
            </Link>
            <p className="mt-sm max-w-reading text-body-sm text-text-secondary">
              Ruang tenang untuk menemukan, membandingkan, dan mencatat
              perjalanan mendaki gunung di Indonesia.
            </p>
          </div>

          <nav
            aria-labelledby="footer-navigation-heading"
            className="col-span-2 lg:col-span-4"
          >
            <h2
              className="font-heading text-label font-semibold text-text-primary"
              id="footer-navigation-heading"
            >
              Jelajahi
            </h2>
            <ul className="mt-sm grid gap-xs sm:grid-cols-2">
              {SECONDARY_NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link className={footerLinkClassName} href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav
            aria-labelledby="footer-social-heading"
            className="col-span-2 lg:col-span-3"
          >
            <h2
              className="font-heading text-label font-semibold text-text-primary"
              id="footer-social-heading"
            >
              Ikuti perkembangan
            </h2>
            <a
              className="mt-sm inline-flex min-h-touch items-center gap-2xs rounded-md text-body-sm text-text-secondary transition-colors duration-fast ease-standard hover:text-text-primary"
              href="https://github.com/afanaffaidin21/jejak-puncak"
              rel="noreferrer"
              target="_blank"
            >
              <CodeXml
                aria-hidden="true"
                className="size-sm"
                strokeWidth={1.8}
              />
              GitHub
              <span className="sr-only">(terbuka di tab baru)</span>
            </a>
          </nav>
        </div>

        <div className="mt-2xl flex flex-col gap-sm border-t border-divider pt-md text-caption text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} Jejak Puncak. Hak cipta
            dilindungi.
          </p>
          <nav aria-label="Informasi legal">
            <ul className="flex flex-wrap items-center gap-md">
              {LEGAL_NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link className={footerLinkClassName} href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
