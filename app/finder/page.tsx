import type { Metadata } from "next";

import { FinderFlow } from "@/components/finder/finder-flow";

export const metadata: Metadata = {
  title: "Jejak Finder | Temukan Gunung yang Cocok",
  description:
    "Temukan rekomendasi gunung berdasarkan pengalaman, tujuan, dan preferensi pendakian.",
};

export default function FinderPage() {
  return <FinderFlow />;
}
