"use client";

import { ChevronLeft, ChevronRight, Images } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import * as m from "framer-motion/m";

import { CARD_SPRING } from "@/components/common/motion-primitives";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { trackEvent } from "@/lib/analytics";

type GalleryItem = {
  alt: string;
  caption: string;
  src: string;
};

type MountainGalleryProps = {
  mountainName: string;
  slug: string;
};

export function MountainGallery({ mountainName, slug }: MountainGalleryProps) {
  const galleryItems: GalleryItem[] = [
    {
      src: "/images/mountains/placeholder-mountain.svg",
      alt: `Ilustrasi sementara panorama ${mountainName}`,
      caption: "Panorama gunung — foto berlisensi belum tersedia.",
    },
    {
      src: "/images/mountains/placeholder-trail.svg",
      alt: `Ilustrasi sementara jalur ${mountainName}`,
      caption: "Karakter jalur — ilustrasi placeholder.",
    },
    {
      src: "/images/mountains/placeholder-camp.svg",
      alt: `Ilustrasi sementara suasana fajar di ${mountainName}`,
      caption: "Suasana perjalanan — ilustrasi placeholder.",
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();

  const showImage = (index: number) => {
    setActiveIndex((index + galleryItems.length) % galleryItems.length);
  };

  const openGallery = (index: number) => {
    showImage(index);
    setIsOpen(true);
    trackEvent("gallery_open", { index, mountain: slug });
  };

  const activeItem = galleryItems[activeIndex];

  return (
    <>
      <div className="grid gap-sm sm:grid-cols-2 lg:grid-cols-3">
        {galleryItems.map((item, index) => (
          <button
            className="group relative aspect-4/3 overflow-hidden rounded-lg border border-divider bg-muted text-left shadow-surface"
            key={item.src}
            onClick={() => openGallery(index)}
            type="button"
          >
            <m.div
              className="absolute inset-0"
              transition={reduceMotion ? { duration: 0 } : CARD_SPRING}
              whileHover={reduceMotion ? undefined : { scale: 1.05 }}
            >
              <Image
                alt={item.alt}
                className="object-cover"
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                src={item.src}
              />
            </m.div>
            <span className="absolute right-sm bottom-sm flex size-touch items-center justify-center rounded-full bg-background/90 text-text-primary shadow-floating">
              <Images aria-hidden="true" className="size-sm" />
              <span className="sr-only">Buka gambar {index + 1}</span>
            </span>
          </button>
        ))}
      </div>

      <Dialog onOpenChange={setIsOpen} open={isOpen}>
        <DialogContent className="bg-background">
          <DialogHeader>
            <DialogTitle>Galeri {mountainName}</DialogTitle>
            <DialogDescription>
              Ilustrasi placeholder {activeIndex + 1} dari {galleryItems.length}
              . Geser pada layar sentuh atau gunakan tombol panah.
            </DialogDescription>
          </DialogHeader>
          <div
            className="relative aspect-16/10 overflow-hidden rounded-lg bg-muted"
            onTouchEnd={(event) => {
              const startX = touchStartX.current;
              const endX = event.changedTouches[0]?.clientX;
              touchStartX.current = null;

              if (startX === null || endX === undefined) {
                return;
              }

              if (startX - endX > 50) {
                showImage(activeIndex + 1);
              } else if (endX - startX > 50) {
                showImage(activeIndex - 1);
              }
            }}
            onTouchStart={(event) => {
              touchStartX.current = event.touches[0]?.clientX ?? null;
            }}
          >
            <Image
              alt={activeItem.alt}
              className="object-contain"
              fill
              priority
              sizes="(min-width: 1024px) 64rem, 100vw"
              src={activeItem.src}
            />
            <Button
              aria-label="Gambar sebelumnya"
              className="absolute top-1/2 left-sm -translate-y-1/2 bg-background/90"
              onClick={() => showImage(activeIndex - 1)}
              size="icon"
              variant="outline"
            >
              <ChevronLeft aria-hidden="true" />
            </Button>
            <Button
              aria-label="Gambar berikutnya"
              className="absolute top-1/2 right-sm -translate-y-1/2 bg-background/90"
              onClick={() => showImage(activeIndex + 1)}
              size="icon"
              variant="outline"
            >
              <ChevronRight aria-hidden="true" />
            </Button>
          </div>
          <p
            aria-live="polite"
            className="text-center text-body-sm text-text-secondary"
          >
            {activeItem.caption}
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}
