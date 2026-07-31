import {
  Banknote,
  CalendarCheck,
  Droplets,
  Gauge,
  Sparkles,
  Sunrise,
  TentTree,
} from "lucide-react";

import { Container } from "@/components/common/container";
import { Badge } from "@/components/ui/badge";
import { BUDGET_LABELS, formatDuration } from "@/lib/mountains";
import type { Mountain } from "@/types/mountain";

export function DecisionSummary({ mountain }: { mountain: Mountain }) {
  const decisionItems = [
    {
      icon: Gauge,
      label: "Skor pemula",
      value: `${mountain.beginnerScore}/100`,
    },
    {
      icon: CalendarCheck,
      label: "Durasi",
      value: formatDuration(mountain.durationDays),
    },
    {
      icon: Banknote,
      label: "Kategori biaya",
      value: BUDGET_LABELS[mountain.budgetCategory] ?? mountain.budgetCategory,
    },
    {
      icon: Sunrise,
      label: "Sunrise",
      value: `${mountain.sunriseRating}/5`,
    },
    {
      icon: TentTree,
      label: "Berkemah",
      value: mountain.campingAvailable ? "Tersedia" : "Tidak tersedia",
    },
    {
      icon: Droplets,
      label: "Sumber air",
      value: mountain.waterSource ? "Tercatat" : "Tidak tercatat",
    },
  ] as const;

  return (
    <section
      aria-labelledby="decision-summary-heading"
      className="bg-surface py-2xl md:py-3xl"
    >
      <Container>
        <div className="grid gap-xl lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.45fr)]">
          <div>
            <p className="text-label font-semibold text-primary">
              Ringkasan keputusan
            </p>
            <h2
              className="mt-xs text-balance font-heading text-h2 font-semibold text-text-primary"
              id="decision-summary-heading"
            >
              Gambaran cepat sebelum membaca lebih jauh.
            </h2>
            <dl className="mt-lg grid gap-sm sm:grid-cols-2 xl:grid-cols-3">
              {decisionItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    className="rounded-lg border border-divider bg-surface-elevated p-md shadow-surface"
                    key={item.label}
                  >
                    <dt className="flex items-center gap-2xs text-caption text-text-muted">
                      <Icon
                        aria-hidden="true"
                        className="size-sm text-primary"
                      />
                      {item.label}
                    </dt>
                    <dd className="mt-xs font-heading text-h4 font-semibold tabular-nums text-text-primary">
                      {item.value}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>

          <aside className="rounded-xl border border-accent bg-accent/45 p-lg">
            <Badge variant="outline">
              <Sparkles aria-hidden="true" data-icon="inline-start" />
              Preview AI
            </Badge>
            <h3 className="mt-md font-heading text-h3 font-semibold text-text-primary">
              Insight personal belum aktif.
            </h3>
            <p className="mt-xs text-body-sm text-text-secondary">
              Pada fase ini kami belum menghasilkan rekomendasi AI. Gunakan data
              rute dan ringkasan editorial sebagai bahan eksplorasi, lalu
              validasi dengan sumber resmi.
            </p>
          </aside>
        </div>
      </Container>
    </section>
  );
}
