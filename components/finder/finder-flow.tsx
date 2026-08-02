"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  Compass,
  Dumbbell,
  MapPinned,
  Mountain,
  Sparkles,
  Target,
  Timer,
  WalletCards,
} from "lucide-react";
import { useReducedMotion } from "framer-motion";
import * as m from "framer-motion/m";
import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/common/container";
import { CARD_SPRING, MotionLink } from "@/components/common/motion-primitives";
import { FinderResults } from "@/components/finder/finder-results";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import { Spinner } from "@/components/ui/spinner";
import { parseFinderAnswers } from "@/lib/finder-validation";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import type { FinderAnswers, FinderResultPayload } from "@/types/finder";

type FinderPhase = "welcome" | "questions" | "processing" | "ready" | "error";

type FinderQuestion = {
  key: keyof FinderAnswers;
  eyebrow: string;
  question: string;
  hint: string;
  icon: typeof Compass;
  options: readonly { label: string; description: string; value: string }[];
};

const SESSION_KEY = "jejak-puncak:finder-progress:v1";

const QUESTIONS: readonly FinderQuestion[] = [
  {
    key: "experience",
    eyebrow: "Pengalaman",
    question: "Seberapa sering kamu mendaki gunung?",
    hint: "Pilih yang paling menggambarkan pengalamanmu saat ini.",
    icon: Mountain,
    options: [
      {
        value: "beginner",
        label: "Pemula",
        description: "Belum pernah atau baru beberapa kali mendaki.",
      },
      {
        value: "intermediate",
        label: "Menengah",
        description: "Terbiasa dengan pendakian satu hingga dua hari.",
      },
      {
        value: "advanced",
        label: "Mahir",
        description: "Berpengalaman menghadapi medan dan perjalanan panjang.",
      },
    ],
  },
  {
    key: "fitness",
    eyebrow: "Kebugaran",
    question: "Bagaimana tingkat kebugaranmu saat ini?",
    hint: "Jawab dengan realistis agar rekomendasi lebih nyaman direncanakan.",
    icon: Dumbbell,
    options: [
      {
        value: "low",
        label: "Ringan",
        description: "Aktivitas fisik belum menjadi rutinitas.",
      },
      {
        value: "moderate",
        label: "Sedang",
        description: "Berolahraga atau berjalan jauh secara berkala.",
      },
      {
        value: "high",
        label: "Tinggi",
        description: "Terbiasa dengan latihan intens atau aktivitas panjang.",
      },
    ],
  },
  {
    key: "availableTime",
    eyebrow: "Waktu tersedia",
    question: "Berapa lama waktu yang kamu siapkan?",
    hint: "Waktu ini akan menjadi batas durasi rekomendasi.",
    icon: Timer,
    options: [
      {
        value: "1-day",
        label: "1 hari",
        description: "Perjalanan singkat tanpa menginap.",
      },
      {
        value: "2-days",
        label: "2 hari",
        description: "Cukup untuk satu malam perjalanan.",
      },
      {
        value: "3-plus-days",
        label: "3+ hari",
        description: "Fleksibel untuk perjalanan multi-hari.",
      },
    ],
  },
  {
    key: "preferredRegion",
    eyebrow: "Wilayah pilihan",
    question: "Wilayah mana yang ingin kamu jelajahi?",
    hint: "Pilihan wilayah akan menjadi filter utama, kecuali kamu memilih bebas.",
    icon: MapPinned,
    options: [
      { value: "jawa", label: "Jawa", description: "Gunung di Pulau Jawa." },
      {
        value: "sumatera",
        label: "Sumatera",
        description: "Gunung di Pulau Sumatera.",
      },
      {
        value: "bali-nusa-tenggara",
        label: "Bali & Nusa Tenggara",
        description: "Pilihan dari Bali hingga kepulauan Nusa Tenggara.",
      },
      {
        value: "kalimantan",
        label: "Kalimantan",
        description: "Gunung di Pulau Kalimantan.",
      },
      {
        value: "sulawesi",
        label: "Sulawesi",
        description: "Gunung di Pulau Sulawesi.",
      },
      {
        value: "anywhere",
        label: "Bebas",
        description: "Tampilkan pilihan terbaik dari seluruh Indonesia.",
      },
    ],
  },
  {
    key: "goal",
    eyebrow: "Tujuan utama",
    question: "Pengalaman apa yang paling kamu cari?",
    hint: "Kami akan mencocokkannya dengan atribut gunung yang tersedia.",
    icon: Target,
    options: [
      {
        value: "sunrise",
        label: "Matahari terbit",
        description: "Mengejar momen pagi dari ketinggian.",
      },
      {
        value: "first-summit",
        label: "Puncak pertama",
        description: "Memulai pengalaman pendakian dengan lebih terukur.",
      },
      {
        value: "challenge",
        label: "Tantangan",
        description: "Mencari medan yang menguji kemampuan.",
      },
      {
        value: "photography",
        label: "Fotografi",
        description: "Mengutamakan peluang lanskap dan momen visual.",
      },
      {
        value: "nature",
        label: "Alam",
        description: "Menikmati kemah dan pengalaman dekat dengan alam.",
      },
    ],
  },
  {
    key: "budget",
    eyebrow: "Anggaran",
    question: "Rentang anggaran mana yang paling sesuai?",
    hint: "Ini membantu mengurutkan pilihan, bukan menghitung biaya perjalanan.",
    icon: WalletCards,
    options: [
      {
        value: "low",
        label: "Hemat",
        description: "Mengutamakan kategori biaya yang lebih rendah.",
      },
      {
        value: "medium",
        label: "Menengah",
        description: "Fleksibel pada kategori biaya rendah hingga menengah.",
      },
      {
        value: "flexible",
        label: "Fleksibel",
        description: "Anggaran bukan pertimbangan utama.",
      },
    ],
  },
];

function FinderProgress({ step }: { step: number }) {
  const progress = Math.round((step / QUESTIONS.length) * 100);

  return (
    <div aria-label={`Progres Jejak Finder: ${step} dari ${QUESTIONS.length}`}>
      <div className="mb-2xs flex items-center justify-between gap-sm text-caption font-medium text-text-secondary">
        <span>
          Pertanyaan {step} dari {QUESTIONS.length}
        </span>
        <span>{progress}%</span>
      </div>
      <div
        aria-valuemax={QUESTIONS.length}
        aria-valuemin={0}
        aria-valuenow={step}
        aria-valuetext={`${step} dari ${QUESTIONS.length} pertanyaan selesai`}
        className="h-2 overflow-hidden rounded-full bg-muted"
        role="progressbar"
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-normal ease-standard"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export function FinderFlow() {
  const [phase, setPhase] = useState<FinderPhase>("welcome");
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<FinderAnswers>>({});
  const [result, setResult] = useState<FinderResultPayload | null>(null);
  const hasTrackedView = useRef(false);
  const reduceMotion = useReducedMotion();

  const question = QUESTIONS[stepIndex];
  const selectedValue = question ? answers[question.key] : undefined;

  useEffect(() => {
    if (!hasTrackedView.current) {
      trackEvent("finder_view");
      hasTrackedView.current = true;
    }

    let restoreFrame: number | undefined;

    try {
      const stored = window.sessionStorage.getItem(SESSION_KEY);
      if (!stored) return;

      const progress = JSON.parse(stored) as {
        answers?: unknown;
        stepIndex?: unknown;
      };
      const restoredAnswers =
        progress.answers &&
        typeof progress.answers === "object" &&
        !Array.isArray(progress.answers)
          ? (progress.answers as Partial<FinderAnswers>)
          : {};
      const restoredStep =
        typeof progress.stepIndex === "number"
          ? Math.min(
              Math.max(Math.floor(progress.stepIndex), 0),
              QUESTIONS.length - 1,
            )
          : 0;

      restoreFrame = window.requestAnimationFrame(() => {
        setAnswers(restoredAnswers);
        setStepIndex(restoredStep);
        setPhase("questions");
      });
    } catch {
      window.sessionStorage.removeItem(SESSION_KEY);
    }

    return () => {
      if (restoreFrame !== undefined) {
        window.cancelAnimationFrame(restoreFrame);
      }
    };
  }, []);

  useEffect(() => {
    if (phase !== "questions") return;

    window.sessionStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ answers, stepIndex }),
    );
  }, [answers, phase, stepIndex]);

  function startFinder() {
    setPhase("questions");
    trackEvent("finder_started");
  }

  function chooseAnswer(value: string) {
    if (!question) return;

    setAnswers((current) => ({ ...current, [question.key]: value }));
    trackEvent("question_answered", {
      question: question.key,
      step: stepIndex + 1,
    });
  }

  function goBack() {
    if (stepIndex === 0) {
      setPhase("welcome");
      return;
    }

    setStepIndex((current) => current - 1);
  }

  async function goNext() {
    if (!selectedValue) return;

    if (stepIndex < QUESTIONS.length - 1) {
      setStepIndex((current) => current + 1);
      return;
    }

    const completeAnswers = parseFinderAnswers(answers);
    if (!completeAnswers) return;

    setPhase("processing");

    try {
      const response = await fetch("/api/finder/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(completeAnswers),
      });
      const payload = (await response.json()) as FinderResultPayload & {
        error?: string;
      };

      if (!response.ok || !Array.isArray(payload.recommendations)) {
        throw new Error(payload.error ?? "Rekomendasi tidak dapat diproses.");
      }

      setResult(payload);
      setPhase("ready");
      window.sessionStorage.removeItem(SESSION_KEY);
      trackEvent("finder_completed", {
        recommendationCount: payload.recommendations.length,
      });
    } catch {
      setPhase("error");
    }
  }

  function restartFinder() {
    setAnswers({});
    setStepIndex(0);
    setResult(null);
    setPhase("questions");
    window.sessionStorage.removeItem(SESSION_KEY);
    trackEvent("restart_finder");
  }

  if (phase === "welcome") {
    return (
      <section className="relative isolate overflow-hidden bg-surface py-3xl md:py-5xl">
        <Container>
          <div className="grid items-center gap-2xl lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-4xl">
            <div className="max-w-3xl">
              <p className="text-label font-semibold text-primary">
                Jejak Finder
              </p>
              <h1 className="mt-xs text-balance font-heading text-h1 font-semibold text-text-primary">
                Temukan gunung yang cocok dengan kesiapanmu.
              </h1>
              <p className="mt-md max-w-2xl text-pretty text-body-lg text-text-secondary">
                Jawab enam pertanyaan singkat tentang pengalaman, waktu, dan
                tujuanmu. Kami akan menyusun hingga tiga rekomendasi untuk
                langkah berikutnya.
              </p>
              <div className="mt-lg flex flex-wrap items-center gap-sm">
                <Button onClick={startFinder} size="lg">
                  Mulai Finder
                  <ArrowRight aria-hidden="true" data-icon="inline-end" />
                </Button>
                <span className="text-body-sm text-text-muted">
                  Sekitar 2 menit
                </span>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="relative mx-auto grid size-64 place-items-center lg:size-80"
            >
              <div className="absolute inset-0 rounded-full border border-primary/15" />
              <div className="absolute inset-md rounded-full border border-primary/20" />
              <div className="grid size-32 place-items-center rounded-full bg-primary text-primary-foreground shadow-floating">
                <Compass className="size-16" strokeWidth={1.35} />
              </div>
              <Sparkles
                className="absolute top-lg right-lg size-lg text-primary"
                strokeWidth={1.5}
              />
              <Mountain
                className="absolute bottom-lg left-lg size-xl text-primary"
                strokeWidth={1.5}
              />
            </div>
          </div>
        </Container>
      </section>
    );
  }

  if (phase === "processing") {
    return (
      <section className="bg-surface py-3xl md:py-5xl">
        <Container className="max-w-3xl">
          <FinderProgress step={QUESTIONS.length} />
          <div className="mt-2xl flex min-h-80 flex-col items-center justify-center rounded-2xl border border-border bg-card p-lg text-center shadow-surface">
            <span className="grid size-16 place-items-center rounded-full bg-primary/10 text-primary">
              <Spinner className="size-lg" />
            </span>
            <h1 className="mt-md font-heading text-h3 font-semibold text-text-primary">
              Menyusun rekomendasimu…
            </h1>
            <p className="mt-xs max-w-md text-pretty text-text-secondary">
              Kami sedang mencocokkan jawabanmu dengan data gunung yang
              tersedia.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  if (phase === "error") {
    return (
      <section className="bg-surface py-3xl md:py-5xl">
        <Container className="max-w-2xl">
          <Alert variant="destructive">
            <AlertTitle>Rekomendasi tidak dapat diproses.</AlertTitle>
            <AlertDescription>
              Jawabanmu masih tersimpan. Coba proses kembali atau jelajahi
              katalog gunung.
            </AlertDescription>
          </Alert>
          <div className="mt-md flex flex-wrap gap-xs">
            <Button onClick={() => void goNext()}>Coba Lagi</Button>
            <MotionLink
              className={buttonVariants({ variant: "outline" })}
              href="/explore"
            >
              Kembali ke Explore
            </MotionLink>
          </div>
        </Container>
      </section>
    );
  }

  if (phase === "ready") {
    return result ? (
      <FinderResults onRestart={restartFinder} result={result} />
    ) : null;
  }

  if (!question) return null;

  const QuestionIcon = question.icon;

  return (
    <section className="bg-surface py-xl md:py-3xl">
      <Container className="max-w-5xl">
        <FinderProgress step={stepIndex + 1} />

        <div className="mt-lg grid overflow-hidden rounded-2xl border border-border bg-card shadow-surface lg:grid-cols-[minmax(0,1fr)_18rem]">
          <form
            className="min-w-0 p-sm sm:p-lg lg:p-2xl"
            onSubmit={(event) => {
              event.preventDefault();
              void goNext();
            }}
          >
            <fieldset>
              <legend className="w-full">
                <span className="text-label font-semibold text-primary">
                  {question.eyebrow}
                </span>
                <span
                  className="mt-xs block text-balance font-heading text-h2 font-semibold text-text-primary"
                  aria-live="polite"
                >
                  {question.question}
                </span>
                <span className="mt-xs block max-w-2xl text-pretty text-text-secondary">
                  {question.hint}
                </span>
              </legend>

              <div className="mt-lg grid gap-xs sm:grid-cols-2">
                {question.options.map((option) => {
                  const selected = selectedValue === option.value;
                  const inputId = `finder-${question.key}-${option.value}`;

                  return (
                    <m.label
                      className={cn(
                        "relative flex min-h-20 cursor-pointer items-start gap-xs rounded-lg border bg-background p-sm hover:border-primary/55 hover:shadow-floating",
                        "has-focus-visible:ring-2 has-focus-visible:ring-ring has-focus-visible:ring-offset-2 has-focus-visible:ring-offset-background",
                        selected &&
                          "border-primary bg-primary/5 shadow-surface",
                      )}
                      htmlFor={inputId}
                      key={option.value}
                      transition={reduceMotion ? { duration: 0 } : CARD_SPRING}
                      whileHover={reduceMotion ? undefined : { y: -8 }}
                      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                    >
                      <input
                        checked={selected}
                        className="peer sr-only"
                        id={inputId}
                        name={question.key}
                        onChange={() => chooseAnswer(option.value)}
                        type="radio"
                        value={option.value}
                      />
                      <span
                        aria-hidden="true"
                        className={cn(
                          "mt-3xs grid size-md shrink-0 place-items-center rounded-full border border-input text-primary",
                          selected &&
                            "border-primary bg-primary text-primary-foreground",
                        )}
                      >
                        {selected ? (
                          <Check className="size-xs" strokeWidth={2.5} />
                        ) : null}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-semibold text-text-primary">
                          {option.label}
                        </span>
                        <span className="mt-3xs block text-body-sm text-text-secondary">
                          {option.description}
                        </span>
                      </span>
                    </m.label>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-xl flex items-center justify-between gap-xs border-t border-divider pt-md">
              <Button onClick={goBack} type="button" variant="ghost">
                <ArrowLeft aria-hidden="true" data-icon="inline-start" />
                Kembali
              </Button>
              <Button disabled={!selectedValue} type="submit">
                {stepIndex === QUESTIONS.length - 1
                  ? "Lihat rekomendasi"
                  : "Lanjut"}
                <ArrowRight aria-hidden="true" data-icon="inline-end" />
              </Button>
            </div>
          </form>

          <aside
            aria-hidden="true"
            className="hidden border-l border-divider bg-primary p-lg text-primary-foreground lg:flex lg:flex-col lg:justify-between"
          >
            <QuestionIcon className="size-12" strokeWidth={1.35} />
            <div>
              <p className="text-caption font-semibold tracking-wider text-primary-foreground/70 uppercase">
                Jejak Finder
              </p>
              <p className="mt-xs font-heading text-h3 font-semibold">
                Jawabanmu tetap tersimpan selama sesi ini.
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
