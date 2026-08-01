"use client";

import "mapbox-gl/dist/mapbox-gl.css";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Map as MapboxMap, Marker } from "mapbox-gl";
import { ExternalLink, List, MapPinned, RotateCcw } from "lucide-react";

import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import type { MapMountain } from "@/types/map";
import { DIFFICULTY_LABELS } from "@/types/compare";

type MountainMapProps = { mountains: MapMountain[] };

const DEFAULT_CENTER: [number, number] = [117, -2];
const DEFAULT_ZOOM = 4.2;

function uniqueValues(mountains: MapMountain[], key: "island" | "province") {
  return [...new Set(mountains.map((mountain) => mountain[key]))].sort((a, b) => a.localeCompare(b));
}

function MountainPreview({ mountain }: { mountain: MapMountain }) {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[16/8] bg-muted">
        <Image alt="" className="object-cover" fill sizes="(min-width: 1024px) 28vw, 100vw" src={mountain.heroImage} unoptimized />
      </div>
      <CardHeader className="gap-2xs">
        <div className="flex items-start justify-between gap-xs"><CardTitle className="text-h4">{mountain.name}</CardTitle><Badge variant="secondary">{DIFFICULTY_LABELS[mountain.difficulty]}</Badge></div>
        <p className="text-body-sm text-text-secondary">{mountain.province} · {mountain.island}</p>
      </CardHeader>
      <CardContent className="space-y-sm">
        <p className="line-clamp-2 text-body-sm text-text-secondary">{mountain.summary}</p>
        <div className="flex flex-wrap gap-xs text-caption text-text-secondary"><span>{mountain.elevation.toLocaleString("id-ID")} mdpl</span><span>·</span><span>{mountain.durationDays} hari</span></div>
        <div className="flex flex-wrap gap-xs">
          <Link className={buttonVariants({ size: "sm" })} href={`/mountains/${mountain.slug}`} onClick={() => trackEvent("detail_click", { mountain: mountain.slug })}>Lihat detail <ExternalLink aria-hidden="true" data-icon="inline-end" /></Link>
          <Button onClick={() => { trackEvent("wishlist_click", { mountain: mountain.slug }); router.push(`/login?next=${encodeURIComponent(pathname)}`); }} size="sm" type="button" variant="outline">Simpan</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function MountainMap({ mountains }: MountainMapProps) {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapboxMap | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const allBoundsRef = useRef<[[number, number], [number, number]] | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [mobilePreviewOpen, setMobilePreviewOpen] = useState(false);
  const [island, setIsland] = useState("all");
  const [province, setProvince] = useState("all");
  const [difficulty, setDifficulty] = useState("all");

  const visibleMountains = useMemo(() => mountains.filter((mountain) =>
    (island === "all" || mountain.island === island) &&
    (province === "all" || mountain.province === province) &&
    (difficulty === "all" || mountain.difficulty === difficulty),
  ), [difficulty, island, mountains, province]);
  const selectedMountain = mountains.find((mountain) => mountain.slug === selectedSlug) ?? null;
  const islands = useMemo(() => uniqueValues(mountains, "island"), [mountains]);
  const provinces = useMemo(() => uniqueValues(mountains, "province"), [mountains]);

  useEffect(() => {
    trackEvent("map_view", { count: mountains.length });
  }, [mountains.length]);

  useEffect(() => {
    if (!token || !mapContainerRef.current || mapRef.current) return;
    let disposed = false;
    void import("mapbox-gl").then(({ default: mapboxgl }) => {
      if (disposed || !mapContainerRef.current) return;
      mapboxgl.accessToken = token;
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/outdoors-v12",
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        attributionControl: true,
      });
      map.addControl(new mapboxgl.NavigationControl({ showCompass: true }), "top-right");
      map.on("error", () => setMapError(true));
      map.on("load", () => setMapReady(true));
      mapRef.current = map;
    }).catch(() => setMapError(true));
    return () => {
      disposed = true;
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [token]);

  useEffect(() => {
    if (!mapReady || !mapRef.current) return;
    void import("mapbox-gl").then(({ default: mapboxgl }) => {
      if (!mapRef.current) return;
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = visibleMountains.map((mountain) => {
        const element = document.createElement("button");
        element.type = "button";
        element.className = "map-mountain-marker";
        element.setAttribute("aria-label", `Buka preview ${mountain.name}`);
        element.title = mountain.name;
        element.addEventListener("click", () => {
          setSelectedSlug(mountain.slug);
          setMobilePreviewOpen(true);
          trackEvent("marker_click", { mountain: mountain.slug });
          trackEvent("preview_open", { mountain: mountain.slug });
        });
        return new mapboxgl.Marker({ element, anchor: "bottom" })
          .setLngLat([mountain.longitude, mountain.latitude])
          .addTo(mapRef.current!);
      });

      if (visibleMountains.length) {
        const bounds = visibleMountains.reduce((bounds, mountain) => bounds.extend([mountain.longitude, mountain.latitude]), new mapboxgl.LngLatBounds([visibleMountains[0].longitude, visibleMountains[0].latitude], [visibleMountains[0].longitude, visibleMountains[0].latitude]));
        allBoundsRef.current = [[bounds.getWest(), bounds.getSouth()], [bounds.getEast(), bounds.getNorth()]];
        mapRef.current.fitBounds(bounds, { padding: 56, maxZoom: 8, duration: 450 });
      }
    });
    if (island !== "all" || province !== "all" || difficulty !== "all") trackEvent("filter_region", { island, province, difficulty });
  }, [difficulty, island, mapReady, province, visibleMountains]);

  const resetMap = () => {
    setIsland("all"); setProvince("all"); setDifficulty("all"); setSelectedSlug(null);
    if (mapRef.current && allBoundsRef.current) {
      mapRef.current.fitBounds(allBoundsRef.current, { padding: 56, maxZoom: 8, duration: 450 });
    }
    trackEvent("reset_map");
  };

  const filterClass = "h-10 w-full rounded-md border border-divider bg-background px-sm text-body-sm text-text-primary outline-none focus-visible:ring-2 focus-visible:ring-primary";

  return (
    <div className="space-y-md">
      <div className="grid gap-xs rounded-xl border border-divider bg-surface p-sm sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]">
        <label className="text-body-sm text-text-secondary">Pulau<select className={filterClass} onChange={(event) => setIsland(event.target.value)} value={island}><option value="all">Semua pulau</option>{islands.map((value) => <option key={value}>{value}</option>)}</select></label>
        <label className="text-body-sm text-text-secondary">Provinsi<select className={filterClass} onChange={(event) => setProvince(event.target.value)} value={province}><option value="all">Semua provinsi</option>{provinces.map((value) => <option key={value}>{value}</option>)}</select></label>
        <label className="text-body-sm text-text-secondary">Kesulitan<select className={filterClass} onChange={(event) => setDifficulty(event.target.value)} value={difficulty}><option value="all">Semua tingkat</option>{Object.entries(DIFFICULTY_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
        <Button className="self-end" onClick={resetMap} size="sm" type="button" variant="outline"><RotateCcw aria-hidden="true" /> Reset</Button>
      </div>

      {!token ? (
        <Empty className="min-h-96 border-divider bg-surface">
          <EmptyHeader><EmptyMedia variant="icon"><MapPinned aria-hidden="true" /></EmptyMedia><EmptyTitle>Peta interaktif memerlukan konfigurasi</EmptyTitle><EmptyDescription>Tambahkan <code>NEXT_PUBLIC_MAPBOX_TOKEN</code> (token publik Mapbox) di environment untuk mengaktifkan peta.</EmptyDescription></EmptyHeader>
        </Empty>
      ) : (
        <div className="grid gap-md lg:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)]">
          <div className="relative min-h-[28rem] overflow-hidden rounded-xl border border-divider bg-accent lg:min-h-[36rem]">
            <div aria-label="Peta gunung Indonesia" className="absolute inset-0" ref={mapContainerRef} role="application" />
            {mapError ? <div className="absolute inset-x-sm top-sm rounded-md bg-destructive/10 p-sm text-body-sm text-destructive">Peta belum dapat dimuat. Periksa token Mapbox dan koneksi jaringan.</div> : null}
            <div className="absolute bottom-sm left-sm rounded-md bg-surface-elevated/95 px-sm py-xs text-caption text-text-secondary shadow-surface"><span className="inline-block size-2 rounded-full bg-primary align-middle" /> <span className="ml-2xs">Lokasi gunung · {visibleMountains.length} tampil</span></div>
          </div>
          <aside className="hidden space-y-sm lg:block" aria-label="Daftar gunung di peta"><div className="flex items-center gap-xs"><List aria-hidden="true" className="size-4 text-primary" /><h2 className="font-heading text-h4 font-semibold text-text-primary">Daftar gunung</h2></div>{selectedMountain ? <MountainPreview mountain={selectedMountain} /> : <p className="rounded-lg border border-dashed border-divider p-md text-body-sm text-text-secondary">Pilih marker untuk melihat preview.</p>}{visibleMountains.map((mountain) => <button className={cn("w-full rounded-md border border-divider bg-surface p-sm text-left text-body-sm transition-colors hover:border-primary/40", selectedSlug === mountain.slug && "border-primary bg-primary/5")} key={mountain.slug} onClick={() => { setSelectedSlug(mountain.slug); trackEvent("preview_open", { mountain: mountain.slug }); }} type="button"><span className="font-medium text-text-primary">{mountain.name}</span><span className="mt-2xs block text-caption text-text-secondary">{mountain.province} · {DIFFICULTY_LABELS[mountain.difficulty]}</span></button>)}</aside>
        </div>
      )}

      <section aria-labelledby="map-list-heading" className="space-y-sm lg:hidden"><h2 className="flex items-center gap-xs font-heading text-h4 font-semibold text-text-primary" id="map-list-heading"><List aria-hidden="true" className="size-4 text-primary" />Daftar gunung</h2><ol className="grid gap-xs sm:grid-cols-2">{visibleMountains.map((mountain) => <li key={mountain.slug}><button className="w-full rounded-md border border-divider bg-surface p-sm text-left text-body-sm" onClick={() => { setSelectedSlug(mountain.slug); setMobilePreviewOpen(true); trackEvent("preview_open", { mountain: mountain.slug }); }} type="button"><span className="font-medium text-text-primary">{mountain.name}</span><span className="mt-2xs block text-caption text-text-secondary">{mountain.province} · {DIFFICULTY_LABELS[mountain.difficulty]}</span></button></li>)}</ol></section>
      <Sheet onOpenChange={setMobilePreviewOpen} open={mobilePreviewOpen && Boolean(selectedMountain)}><SheetContent className="p-0" side="bottom"><SheetHeader><SheetTitle>Preview gunung</SheetTitle><SheetDescription>Ringkasan singkat dari marker yang dipilih.</SheetDescription></SheetHeader>{selectedMountain ? <div className="p-md"><MountainPreview mountain={selectedMountain} /></div> : null}</SheetContent></Sheet>
    </div>
  );
}

