"use client";

import { ListFilter, Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { trackEvent } from "@/lib/analytics";
import {
  ELEVATION_BANDS,
  EXPLORE_ISLANDS,
  EXPLORE_PROVINCES,
} from "@/lib/mountain-search";
import { DIFFICULTY_LABELS } from "@/lib/mountains";
import { MOUNTAIN_DIFFICULTIES, type MountainSort } from "@/types/mountain";

const ELEVATION_LABELS = {
  "under-2500": "Di bawah 2.500 mdpl",
  "2500-3000": "2.500–2.999 mdpl",
  "over-3000": "3.000 mdpl ke atas",
} as const;

const SORT_OPTIONS: Array<{ label: string; value: MountainSort }> = [
  { label: "Paling populer", value: "popular" },
  { label: "Nama A–Z", value: "name-asc" },
  { label: "Elevasi terendah", value: "elevation-asc" },
  { label: "Elevasi tertinggi", value: "elevation-desc" },
  { label: "Durasi terpendek", value: "duration-asc" },
  { label: "Paling ramah pemula", value: "beginner-desc" },
];

function selectedValues(searchParams: URLSearchParams, key: string) {
  return searchParams
    .getAll(key)
    .flatMap((value) => value.split(","))
    .filter(Boolean);
}

function controlId(prefix: string, value: string) {
  return `${prefix}-${value.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`;
}

type ExploreShellProps = {
  children: ReactNode;
  resultCount: number;
};

export function ExploreShell({ children, resultCount }: ExploreShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("search") ?? "";
  const [searchValue, setSearchValue] = useState(currentSearch);

  const replaceParams = useCallback(
    (update: (params: URLSearchParams) => void) => {
      const nextParams = new URLSearchParams(searchParams.toString());
      update(nextParams);
      nextParams.delete("page");
      const query = nextParams.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    const normalizedSearch = searchValue.trim();

    if (normalizedSearch === currentSearch) {
      return;
    }

    const timeout = window.setTimeout(() => {
      replaceParams((params) => {
        if (normalizedSearch) {
          params.set("search", normalizedSearch);
        } else {
          params.delete("search");
        }
      });
      trackEvent("explore_search", { query: normalizedSearch });
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [currentSearch, replaceParams, searchValue]);

  const toggleValue = useCallback(
    (key: string, value: string, checked: boolean) => {
      replaceParams((params) => {
        const values = new Set(selectedValues(params, key));
        if (checked) {
          values.add(value);
        } else {
          values.delete(value);
        }

        if (values.size) {
          params.set(key, [...values].sort().join(","));
        } else {
          params.delete(key);
        }
      });
      trackEvent("explore_filter", { filter: key, value });
    },
    [replaceParams],
  );

  const toggleBoolean = useCallback(
    (key: string, checked: boolean) => {
      replaceParams((params) => {
        if (checked) {
          params.set(key, "true");
        } else {
          params.delete(key);
        }
      });
      trackEvent("explore_filter", { filter: key, value: checked });
    },
    [replaceParams],
  );

  const clearFilters = useCallback(() => {
    setSearchValue("");
    router.replace(pathname, { scroll: false });
    trackEvent("explore_filter", { filter: "all", value: "reset" });
  }, [pathname, router]);

  const activeFilterCount = useMemo(() => {
    const trackedKeys = [
      "province",
      "island",
      "difficulty",
      "duration",
      "elevation",
      "beginner",
      "camping",
      "sunrise",
    ];

    return trackedKeys.reduce((count, key) => {
      const values = selectedValues(searchParams, key);
      return count + values.length;
    }, 0);
  }, [searchParams]);

  const filterPanel = (
    <FieldGroup className="gap-lg">
      <FieldSet>
        <FieldLegend>Provinsi</FieldLegend>
        <div className="grid gap-xs">
          {EXPLORE_PROVINCES.map((province) => (
            <Field key={province} orientation="horizontal">
              <Checkbox
                checked={selectedValues(searchParams, "province").includes(
                  province,
                )}
                id={controlId("province", province)}
                onCheckedChange={(checked) =>
                  toggleValue("province", province, checked)
                }
              />
              <FieldLabel htmlFor={controlId("province", province)}>
                {province}
              </FieldLabel>
            </Field>
          ))}
        </div>
      </FieldSet>

      <FieldSet>
        <FieldLegend>Pulau</FieldLegend>
        <div className="grid gap-xs">
          {EXPLORE_ISLANDS.map((island) => (
            <Field key={island} orientation="horizontal">
              <Checkbox
                checked={selectedValues(searchParams, "island").includes(
                  island,
                )}
                id={controlId("island", island)}
                onCheckedChange={(checked) =>
                  toggleValue("island", island, checked)
                }
              />
              <FieldLabel htmlFor={controlId("island", island)}>
                {island}
              </FieldLabel>
            </Field>
          ))}
        </div>
      </FieldSet>

      <FieldSet>
        <FieldLegend>Tingkat kesulitan</FieldLegend>
        <div className="grid gap-xs">
          {MOUNTAIN_DIFFICULTIES.map((difficulty) => (
            <Field key={difficulty} orientation="horizontal">
              <Checkbox
                checked={selectedValues(searchParams, "difficulty").includes(
                  difficulty,
                )}
                id={`difficulty-${difficulty}`}
                onCheckedChange={(checked) =>
                  toggleValue("difficulty", difficulty, checked)
                }
              />
              <FieldLabel htmlFor={`difficulty-${difficulty}`}>
                {DIFFICULTY_LABELS[difficulty]}
              </FieldLabel>
            </Field>
          ))}
        </div>
      </FieldSet>

      <FieldSet>
        <FieldLegend>Durasi maksimal</FieldLegend>
        <div className="grid gap-xs">
          {["1", "2", "3"].map((duration) => (
            <Field key={duration} orientation="horizontal">
              <Checkbox
                checked={selectedValues(searchParams, "duration").includes(
                  duration,
                )}
                id={`duration-${duration}`}
                onCheckedChange={(checked) =>
                  toggleValue("duration", duration, checked)
                }
              />
              <FieldLabel htmlFor={`duration-${duration}`}>
                {duration} {duration === "1" ? "hari" : "hari atau kurang"}
              </FieldLabel>
            </Field>
          ))}
        </div>
      </FieldSet>

      <FieldSet>
        <FieldLegend>Elevasi</FieldLegend>
        <div className="grid gap-xs">
          {ELEVATION_BANDS.map((band) => (
            <Field key={band} orientation="horizontal">
              <Checkbox
                checked={selectedValues(searchParams, "elevation").includes(
                  band,
                )}
                id={`elevation-${band}`}
                onCheckedChange={(checked) =>
                  toggleValue("elevation", band, checked)
                }
              />
              <FieldLabel htmlFor={`elevation-${band}`}>
                {ELEVATION_LABELS[band]}
              </FieldLabel>
            </Field>
          ))}
        </div>
      </FieldSet>

      <FieldSet>
        <FieldLegend>Karakter perjalanan</FieldLegend>
        <div className="grid gap-xs">
          {[
            {
              key: "beginner",
              label: "Ramah pemula",
            },
            {
              key: "camping",
              label: "Bisa berkemah",
            },
            {
              key: "sunrise",
              label: "Sunrise rating 4+",
            },
          ].map((option) => (
            <Field key={option.key} orientation="horizontal">
              <Checkbox
                checked={searchParams.get(option.key) === "true"}
                id={option.key}
                onCheckedChange={(checked) =>
                  toggleBoolean(option.key, checked)
                }
              />
              <FieldLabel htmlFor={option.key}>{option.label}</FieldLabel>
            </Field>
          ))}
        </div>
      </FieldSet>
    </FieldGroup>
  );

  return (
    <div className="grid gap-xl lg:grid-cols-[17rem_minmax(0,1fr)]">
      <aside
        aria-label="Filter gunung"
        className="hidden self-start rounded-xl border border-divider bg-surface-elevated p-md shadow-surface lg:sticky lg:top-[calc(var(--spacing-mobile-nav)+var(--spacing-sm))] lg:block"
      >
        <div className="mb-md flex items-center justify-between gap-sm">
          <h2 className="font-heading text-h4 font-semibold">Filter</h2>
          {activeFilterCount ? (
            <Button onClick={clearFilters} size="xs" variant="ghost">
              Reset
            </Button>
          ) : null}
        </div>
        {filterPanel}
      </aside>

      <div className="min-w-0">
        <div className="mb-lg grid gap-sm sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:items-end">
          <label className="grid gap-3xs text-label font-semibold">
            Cari gunung
            <span className="relative">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-sm size-sm -translate-y-1/2 text-text-muted"
              />
              <Input
                autoComplete="off"
                className="pr-touch pl-xl"
                name="search"
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Contoh: Rinjani…"
                type="search"
                value={searchValue}
              />
              {searchValue ? (
                <button
                  aria-label="Hapus pencarian"
                  className="absolute top-1/2 right-2xs flex size-touch -translate-y-1/2 items-center justify-center rounded-md text-text-muted hover:text-text-primary"
                  onClick={() => setSearchValue("")}
                  type="button"
                >
                  <X aria-hidden="true" className="size-sm" />
                </button>
              ) : null}
            </span>
          </label>

          <Sheet>
            <SheetTrigger
              render={
                <Button className="lg:hidden" variant="outline">
                  <ListFilter aria-hidden="true" data-icon="inline-start" />
                  Filter
                  {activeFilterCount ? ` (${activeFilterCount})` : ""}
                </Button>
              }
            />
            <SheetContent side="bottom">
              <SheetHeader>
                <SheetTitle>Filter gunung</SheetTitle>
                <SheetDescription>
                  Pilih satu atau beberapa kriteria. Hasil diperbarui otomatis.
                </SheetDescription>
              </SheetHeader>
              <div className="p-md">{filterPanel}</div>
              <SheetFooter>
                <Button onClick={clearFilters} variant="outline">
                  Hapus semua filter
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          <label className="grid gap-3xs text-label font-semibold">
            Urutkan
            <Select
              onValueChange={(value) => {
                if (!value) {
                  return;
                }
                replaceParams((params) => {
                  if (value === "popular") {
                    params.delete("sort");
                  } else {
                    params.set("sort", value);
                  }
                });
                trackEvent("explore_sort", { sort: value });
              }}
              value={searchParams.get("sort") ?? "popular"}
            >
              <SelectTrigger className="h-touch w-full sm:w-52">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="end">
                {SORT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>
        </div>

        <div className="mb-md flex items-center justify-between gap-sm">
          <p aria-live="polite" className="text-body-sm text-text-secondary">
            <strong className="font-semibold tabular-nums text-text-primary">
              {resultCount}
            </strong>{" "}
            gunung ditemukan
          </p>
          {activeFilterCount ? (
            <Button
              className="lg:hidden"
              onClick={clearFilters}
              size="xs"
              variant="ghost"
            >
              Reset
            </Button>
          ) : null}
        </div>
        {children}
      </div>
    </div>
  );
}
