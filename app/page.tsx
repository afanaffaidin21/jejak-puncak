import type { Metadata } from "next";

import {
  FinderIntroduction,
  HeroSection,
} from "@/components/home/hero-section";
import {
  CollectionsSection,
  HOME_FAQS,
  HomeFaqSection,
  MapIntroductionSection,
  PassportSection,
  PopularMountainsSection,
} from "@/components/home/discovery-sections";

export const metadata: Metadata = {
  title: "Jejak Puncak — Temukan Gunung Indonesia",
  description:
    "Jelajahi gunung Indonesia berdasarkan wilayah, tingkat kesulitan, dan durasi perjalanan.",
};

export default function HomePage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Jejak Puncak",
      url: "https://jejak-puncak.vercel.app",
      logo: "https://jejak-puncak.vercel.app/icon",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Jejak Puncak",
      url: "https://jejak-puncak.vercel.app",
      potentialAction: {
        "@type": "SearchAction",
        target:
          "https://jejak-puncak.vercel.app/explore?search={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: HOME_FAQS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c"),
        }}
        type="application/ld+json"
      />
      <HeroSection />
      <FinderIntroduction />
      <PopularMountainsSection />
      <MapIntroductionSection />
      <CollectionsSection />
      <PassportSection />
      <HomeFaqSection />
    </>
  );
}
