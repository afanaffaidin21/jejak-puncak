"use client";

import { AnimatePresence, useReducedMotion } from "framer-motion";
import * as m from "framer-motion/m";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type FaqItem = {
  answer: string;
  question: string;
};

const FAQ_SPRING = {
  damping: 24,
  mass: 0.7,
  stiffness: 220,
  type: "spring" as const,
};

export function HomeFaqAccordion({ items }: { items: readonly FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion ? { duration: 0 } : FAQ_SPRING;

  return (
    <div className="rounded-xl border border-divider bg-surface-elevated px-md shadow-surface">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const answerId = `home-faq-answer-${index}`;

        return (
          <div className="not-last:border-b" key={item.question}>
            <h3 className="flex">
              <button
                aria-controls={answerId}
                aria-expanded={isOpen}
                className="group/accordion-trigger relative flex flex-1 items-start justify-between rounded-lg border border-transparent py-md text-left text-body font-medium transition-[background-color,border-color,box-shadow,color] outline-none hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                type="button"
              >
                {item.question}
                <m.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  aria-hidden="true"
                  className="pointer-events-none shrink-0"
                  transition={transition}
                >
                  <ChevronDown className="size-4 text-muted-foreground" />
                </m.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <m.div
                  animate={{ height: "auto", opacity: 1 }}
                  className="overflow-hidden"
                  exit={{ height: 0, opacity: 0 }}
                  id={answerId}
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  transition={transition}
                >
                  <div className="pb-md text-body-sm text-text-secondary">
                    {item.answer}
                  </div>
                </m.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
