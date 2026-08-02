import type { Metadata } from "next";
import { ArrowRight, Compass, Database, ShieldCheck } from "lucide-react";
import Link from "next/link";

import {
  StaticPageLayout,
  StaticSection,
  staticLinkClassName,
} from "@/components/common/static-page-layout";
import { MotionLink } from "@/components/common/motion-primitives";
import { buttonVariants } from "@/components/ui/button-variants";

export const metadata: Metadata = {
  title: "Tentang Jejak Puncak | Platform Pendakian Indonesia",
  description:
    "Kenali misi Jejak Puncak dalam membantu pendaki menemukan, membandingkan, dan mencatat perjalanan gunung dengan data yang dikurasi.",
  robots: { index: true, follow: true },
};

const navigation = [
  { id: "misi", label: "Misi kami" },
  { id: "cara-kerja", label: "Cara kami membantu" },
  { id: "data", label: "Data dan sumber" },
  { id: "keselamatan", label: "Keselamatan lebih dulu" },
] as const;

const principles = [
  {
    description:
      "Finder dan Compare mengubah banyak atribut menjadi pilihan yang lebih mudah dipahami.",
    icon: Compass,
    title: "Membantu mengambil keputusan",
  },
  {
    description:
      "Data gunung, rute, serta atribut editorial disusun agar dapat dibandingkan secara konsisten.",
    icon: Database,
    title: "Berangkat dari data",
  },
  {
    description:
      "Rekomendasi tidak pernah menggantikan pemeriksaan kondisi resmi, persiapan, atau penilaian pribadi.",
    icon: ShieldCheck,
    title: "Keselamatan lebih dulu",
  },
] as const;

export default function AboutPage() {
  return (
    <StaticPageLayout
      description="Jejak Puncak membantu pendaki Indonesia menyaring pilihan, memahami perbedaan, dan menyimpan progres—tanpa membuat prosesnya terasa rumit."
      eyebrow="Tentang Jejak Puncak"
      navigation={navigation}
      title="Keputusan pendakian yang lebih jernih dimulai dari informasi yang tertata."
    >
      <StaticSection id="misi" title="Misi kami">
        <p>
          Informasi pendakian sering tersebar di banyak tempat, menggunakan
          istilah yang berbeda, dan sulit dibandingkan. Jejak Puncak hadir
          sebagai ruang yang tenang untuk membantu calon pendaki menemukan
          gunung yang realistis bagi waktu, pengalaman, kebugaran, tujuan, dan
          anggaran mereka.
        </p>
        <p>
          Kami membangun platform ini dengan prinsip <em>decision first</em>:
          data bukan sekadar ditampilkan, tetapi disusun untuk membantu orang
          memahami pilihan dan langkah berikutnya. Keputusan akhir tetap berada
          pada pengguna.
        </p>
      </StaticSection>

      <StaticSection id="cara-kerja" title="Cara kami membantu">
        <div className="grid gap-sm sm:grid-cols-3">
          {principles.map((principle) => {
            const Icon = principle.icon;

            return (
              <div
                className="rounded-xl border border-divider bg-surface-elevated p-md shadow-flat"
                key={principle.title}
              >
                <Icon
                  aria-hidden="true"
                  className="size-md text-primary"
                  strokeWidth={1.8}
                />
                <h3 className="mt-sm font-heading text-h4 font-semibold text-text-primary">
                  {principle.title}
                </h3>
                <p className="mt-xs text-body-sm text-text-secondary">
                  {principle.description}
                </p>
              </div>
            );
          })}
        </div>
        <p>
          Explore dan peta membantu penemuan; Finder memberi rekomendasi
          deterministik beserta alasan dan trade-off; Compare memperjelas
          perbedaan; sedangkan Passport menyimpan wishlist, pendakian yang
          selesai, dan progres pribadi.
        </p>
      </StaticSection>

      <StaticSection
        id="data"
        title="Data yang dikurasi, sumber yang dapat ditelusuri"
      >
        <p>
          Data dasar seperti elevasi dan lokasi terutama diperiksa silang dengan
          profil gunung{" "}
          <a
            className={staticLinkClassName}
            href="https://volcano.si.edu/"
            rel="noreferrer"
            target="_blank"
          >
            Smithsonian Institution Global Volcanism Program
            <span className="sr-only"> (terbuka di tab baru)</span>
          </a>{" "}
          serta sumber pengelola taman atau destinasi resmi jika tersedia.
          Estimasi rute dirangkum sebagai referensi perencanaan; tingkat
          kesulitan, durasi, musim, skor pemula, dan atribut rekomendasi
          merupakan kurasi editorial Jejak Puncak, bukan pengukuran resmi.
        </p>
        <p>
          Foto berasal dari koleksi berlisensi di{" "}
          <a
            className={staticLinkClassName}
            href="https://commons.wikimedia.org/"
            rel="noreferrer"
            target="_blank"
          >
            Wikimedia Commons
            <span className="sr-only"> (terbuka di tab baru)</span>
          </a>{" "}
          dan{" "}
          <a
            className={staticLinkClassName}
            href="https://unsplash.com/"
            rel="noreferrer"
            target="_blank"
          >
            Unsplash
            <span className="sr-only"> (terbuka di tab baru)</span>
          </a>
          . Kredit fotografer, tautan sumber, dan lisensi ditampilkan pada
          halaman detail gunung saat tersedia. Hak atas foto tetap berada pada
          pemilik atau pemberi lisensinya masing-masing.
        </p>
        <p>
          Karena jalur, kuota, izin, harga, dan kondisi alam dapat berubah,
          katalog kami bukan sumber data operasional langsung. Jika menemukan
          informasi atau atribusi yang perlu dikoreksi, hubungi kami melalui
          kanal kontak yang dicantumkan pada halaman kebijakan.
        </p>
      </StaticSection>

      <StaticSection id="keselamatan" title="Keselamatan lebih dulu">
        <div className="rounded-xl border border-warning/35 bg-warning/10 p-md text-text-primary">
          <p>
            Jejak Puncak bukan operator tur, pemandu, layanan navigasi GPS,
            layanan cuaca, atau sumber status jalur dan aktivitas vulkanik
            real-time. Selalu periksa informasi terbaru dari pengelola kawasan
            dan otoritas terkait sebelum berangkat.
          </p>
        </div>
        <p>
          Rekomendasi Finder dan penjelasan berbantuan AI hanya membantu
          memahami kecocokan berdasarkan data yang tersedia. Keduanya tidak
          memprediksi keselamatan, cuaca, kondisi kesehatan, atau keadaan
          darurat. Baca batasan lengkapnya di{" "}
          <Link className={staticLinkClassName} href="/terms">
            Ketentuan Penggunaan
          </Link>
          .
        </p>
        <div className="flex flex-col gap-sm pt-xs sm:flex-row">
          <MotionLink className={buttonVariants()} href="/explore">
            Jelajahi gunung
            <ArrowRight aria-hidden="true" />
          </MotionLink>
          <MotionLink
            className={buttonVariants({ variant: "outline" })}
            href="/finder"
          >
            Mulai Finder
          </MotionLink>
        </div>
      </StaticSection>
    </StaticPageLayout>
  );
}
