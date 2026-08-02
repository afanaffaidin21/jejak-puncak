"use client";

import { ArrowRight, Compass, Route, Sunrise } from "lucide-react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import * as m from "framer-motion/m";

import { Container } from "@/components/common/container";
import { MotionLink } from "@/components/common/motion-primitives";
import { ScrollReveal } from "@/components/common/scroll-reveal";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

const selectClassName = cn(
  "h-touch w-full rounded-md border border-primary-foreground/35 bg-background/95 px-sm text-body-sm text-text-primary shadow-surface outline-none",
  "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
);

const HERO_ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const HERO_SPRING = {
  damping: 20,
  mass: 0.7,
  stiffness: 145,
  type: "spring" as const,
};

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const heroInitial = reduceMotion ? false : "hidden";
  const heroAnimate = reduceMotion ? undefined : "visible";
  const heroTransition = reduceMotion ? { duration: 0 } : HERO_SPRING;

  return (
    <section
      aria-labelledby="home-hero-heading"
      className="relative -mt-mobile-nav min-h-[calc(100svh-var(--spacing-mobile-nav))] overflow-hidden bg-primary pt-mobile-nav text-primary-foreground"
    >
      <Image
        alt="Matahari terbit di Gunung Prau dengan lautan awan dan siluet pendaki"
        className="object-[68%_center] object-cover lg:object-center"
        fill
        priority
        sizes="100vw"
        src="/images/home/hero-prau.webp"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b from-foreground/20 via-foreground/45 to-foreground/80"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-foreground/75 via-foreground/35 to-transparent"
      />

      <Container className="relative flex min-h-[calc(100svh-var(--spacing-mobile-nav))] items-end py-2xl md:items-center md:py-4xl">
        <div className="min-w-0 w-full max-w-[56rem]">
          <m.p
            animate={heroAnimate}
            className="mb-sm inline-flex items-center gap-2xs rounded-full border border-primary-foreground/30 bg-background/10 px-sm py-2xs text-label font-semibold backdrop-blur"
            initial={heroInitial}
            transition={heroTransition}
            variants={HERO_ITEM_VARIANTS}
          >
            <Compass aria-hidden="true" className="size-sm" />
            Jelajahi gunung Indonesia
          </m.p>
          <m.h1
            animate={heroAnimate}
            className="w-full max-w-[48rem] text-balance font-heading text-display font-semibold text-primary-foreground"
            id="home-hero-heading"
            initial={heroInitial}
            transition={{ ...heroTransition, delay: 0.12 }}
            variants={HERO_ITEM_VARIANTS}
          >
            Temukan puncak yang cocok dengan ceritamu.
          </m.h1>
          <m.p
            animate={heroAnimate}
            className="mt-md w-full max-w-reading text-pretty text-body-lg text-primary-foreground/85"
            initial={heroInitial}
            transition={{ ...heroTransition, delay: 0.24 }}
            variants={HERO_ITEM_VARIANTS}
          >
            Bandingkan karakter jalur, waktu, dan kesiapanmu sebelum mengambil
            langkah pertama.
          </m.p>

          <m.form
            animate={heroAnimate}
            action="/explore"
            className="mt-xl grid gap-sm rounded-xl border border-primary-foreground/25 bg-foreground/35 p-sm shadow-floating backdrop-blur-md sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]"
            initial={heroInitial}
            transition={{ ...heroTransition, delay: 0.38 }}
            variants={HERO_ITEM_VARIANTS}
          >
            <label className="grid gap-3xs text-label font-semibold">
              Wilayah
              <select className={selectClassName} defaultValue="" name="island">
                <option value="">Semua pulau</option>
                <option value="Jawa">Jawa</option>
                <option value="Sumatra">Sumatra</option>
                <option value="Bali">Bali</option>
                <option value="Nusa Tenggara">Nusa Tenggara</option>
              </select>
            </label>
            <label className="grid gap-3xs text-label font-semibold">
              Pengalaman
              <select
                className={selectClassName}
                defaultValue=""
                name="difficulty"
              >
                <option value="">Semua tingkat</option>
                <option value="easy">Mudah</option>
                <option value="moderate">Menengah</option>
                <option value="hard">Sulit</option>
                <option value="extreme">Ekstrem</option>
              </select>
            </label>
            <label className="grid gap-3xs text-label font-semibold">
              Durasi
              <select
                className={selectClassName}
                defaultValue=""
                name="duration"
              >
                <option value="">Fleksibel</option>
                <option value="1">Satu hari</option>
                <option value="2">Maksimal 2 hari</option>
                <option value="3">Maksimal 3 hari</option>
              </select>
            </label>
            <Button
              className="self-end sm:col-span-2 lg:col-span-1"
              size="lg"
              type="submit"
            >
              Lihat pilihan
              <ArrowRight aria-hidden="true" data-icon="inline-end" />
            </Button>
          </m.form>
        </div>
      </Container>

      <p className="absolute right-sm bottom-2xs z-10 max-w-[18rem] text-right text-caption text-primary-foreground/75 sm:right-md">
        Foto{" "}
        <a
          className="rounded-sm underline decoration-primary-foreground/40 underline-offset-2 transition-colors hover:text-primary-foreground"
          href="https://commons.wikimedia.org/wiki/File:Mt._Prau_in_the_morning.png"
          rel="noreferrer"
          target="_blank"
        >
          Itahuljana / Wikimedia Commons
          <span className="sr-only"> (terbuka di tab baru)</span>
        </a>{" "}
        ·{" "}
        <a
          className="rounded-sm underline decoration-primary-foreground/40 underline-offset-2 transition-colors hover:text-primary-foreground"
          href="https://creativecommons.org/licenses/by-sa/4.0/"
          rel="noreferrer"
          target="_blank"
        >
          CC BY-SA 4.0
          <span className="sr-only"> (terbuka di tab baru)</span>
        </a>
      </p>
    </section>
  );
}

export function FinderIntroduction() {
  return (
    <section
      aria-labelledby="finder-introduction-heading"
      className="bg-surface py-3xl md:py-4xl"
    >
      <ScrollReveal>
        <Container>
          <div className="grid items-center gap-2xl lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.75fr)]">
            <div>
              <p className="text-label font-semibold text-primary">
                Jejak Finder
              </p>
              <h2
                className="mt-xs max-w-2xl text-balance font-heading text-h2 font-semibold text-text-primary"
                id="finder-introduction-heading"
              >
                Mulai dari kesiapanmu, bukan sekadar nama gunung.
              </h2>
              <p className="mt-md max-w-reading text-pretty text-body-lg text-text-secondary">
                Ceritakan waktu, pengalaman, dan gaya perjalananmu. Finder akan
                menyusun pilihan berdasarkan kesiapan dan tujuanmu.
              </p>
              <MotionLink
                className={cn(buttonVariants({ variant: "outline" }), "mt-lg")}
                href="/finder"
              >
                Mulai Jejak Finder
                <ArrowRight aria-hidden="true" data-icon="inline-end" />
              </MotionLink>
            </div>

            <div className="grid gap-sm" aria-label="Pertimbangan Jejak Finder">
              {[
                {
                  icon: Route,
                  title: "Waktu perjalanan",
                  description:
                    "Pilih dari perjalanan sehari hingga multi-hari.",
                },
                {
                  icon: Compass,
                  title: "Tingkat pengalaman",
                  description:
                    "Sesuaikan medan dengan kemampuan dan persiapan.",
                },
                {
                  icon: Sunrise,
                  title: "Momen yang dicari",
                  description:
                    "Temukan sabana, kawah, kemah, atau matahari terbit.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    className="flex gap-sm rounded-lg border border-divider bg-surface-elevated p-md shadow-surface"
                    key={item.title}
                  >
                    <span className="flex size-touch shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                      <Icon aria-hidden="true" className="size-sm" />
                    </span>
                    <div>
                      <h3 className="font-heading text-h4 font-semibold text-text-primary">
                        {item.title}
                      </h3>
                      <p className="mt-3xs text-body-sm text-text-secondary">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </ScrollReveal>
    </section>
  );
}
