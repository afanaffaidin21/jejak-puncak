import type { Metadata } from "next";

import {
  FinderIntroduction,
  HeroSection,
} from "@/components/home/hero-section";

export const metadata: Metadata = {
  title: "Jejak Puncak — Temukan Gunung Indonesia",
  description:
    "Jelajahi gunung Indonesia berdasarkan wilayah, tingkat kesulitan, dan durasi perjalanan.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FinderIntroduction />
    </>
  );
}
