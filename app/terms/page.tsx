import type { Metadata } from "next";
import Link from "next/link";

import {
  StaticPageLayout,
  StaticSection,
  staticLinkClassName,
} from "@/components/common/static-page-layout";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Ketentuan Penggunaan | Jejak Puncak",
  description:
    "Baca ketentuan penggunaan Jejak Puncak, batasan rekomendasi dan informasi pendakian, tanggung jawab pengguna, serta aturan konten dan akun.",
  robots: { index: true, follow: true },
};

const navigation = [
  { id: "persetujuan", label: "Persetujuan" },
  { id: "layanan", label: "Sifat layanan" },
  { id: "keselamatan", label: "Keselamatan" },
  { id: "rekomendasi", label: "Finder dan AI" },
  { id: "tanggung-jawab", label: "Tanggung jawab pengguna" },
  { id: "akun", label: "Akun" },
  { id: "konten", label: "Konten dan kekayaan intelektual" },
  { id: "ketersediaan", label: "Ketersediaan dan tanggung jawab" },
  { id: "perubahan", label: "Perubahan dan kontak" },
] as const;

const listClassName = "list-disc space-y-xs pl-md marker:text-primary";
const lastUpdated = formatDate("2026-08-02T00:00:00+07:00", {
  dateStyle: "long",
});

export default function TermsPage() {
  return (
    <StaticPageLayout
      description="Ketentuan ini menetapkan batas layanan Jejak Puncak dan tanggung jawab yang menyertai penggunaan informasi, rekomendasi, akun, serta fitur personal."
      eyebrow="Ketentuan"
      lastUpdated={lastUpdated}
      navigation={navigation}
      notice="Dokumen ini adalah draf operasional dan belum ditinjau oleh penasihat hukum. Isi final perlu disesuaikan dengan badan usaha, yurisdiksi, dan proses operasional sebelum peluncuran publik."
      title="Ketentuan Penggunaan Jejak Puncak"
    >
      <StaticSection id="persetujuan" title="1. Persetujuan atas ketentuan">
        <p>
          Dengan mengakses atau menggunakan Jejak Puncak, kamu menyatakan telah
          membaca dan menyetujui ketentuan ini serta{" "}
          <Link className={staticLinkClassName} href="/privacy">
            Kebijakan Privasi
          </Link>
          . Jika tidak setuju, jangan gunakan layanan atau fitur akun.
        </p>
      </StaticSection>

      <StaticSection id="layanan" title="2. Sifat dan batas layanan">
        <p>
          Jejak Puncak adalah platform informasi dan rekomendasi untuk membantu
          pengguna menemukan, membandingkan, dan mencatat perjalanan gunung.
          Jejak Puncak bukan operator tur, agen perjalanan, pengelola kawasan,
          pemandu gunung, penyedia porter, layanan navigasi GPS, layanan
          darurat, atau penjamin keselamatan.
        </p>
        <p>
          Informasi tentang elevasi, rute, durasi, biaya, fasilitas, musim, dan
          tingkat kesulitan merupakan referensi perencanaan. Sebagian atribut
          adalah kurasi editorial. Informasi dapat tidak lengkap, berubah, atau
          berbeda dari kondisi di lapangan dan ketentuan pengelola terbaru.
        </p>
      </StaticSection>

      <StaticSection id="keselamatan" title="3. Peringatan keselamatan penting">
        <div className="rounded-xl border border-danger/30 bg-danger/10 p-md text-text-primary">
          <p className="font-semibold">
            Aktivitas pendakian mengandung risiko serius, termasuk cedera,
            tersesat, cuaca ekstrem, aktivitas vulkanik, dan kematian. Tidak ada
            halaman, skor, label “pemula”, peta, atau penjelasan AI di Jejak
            Puncak yang merupakan jaminan bahwa pendakian aman atau sesuai untuk
            kondisi seseorang.
          </p>
        </div>
        <p>
          Sebelum berangkat, periksa status pembukaan jalur, izin, kuota, cuaca,
          aktivitas vulkanik, dan pengumuman darurat langsung dari pengelola
          kawasan serta otoritas pemerintah yang relevan. Ikuti penutupan dan
          instruksi petugas di lapangan meskipun berbeda dari informasi pada
          Jejak Puncak.
        </p>
        <p>
          Pertimbangkan kondisi kesehatan dan kebugaran secara pribadi. Jika
          ragu, mintalah penilaian tenaga kesehatan atau pendamping profesional
          yang berkualifikasi. Jejak Puncak tidak memberikan saran medis,
          prediksi cuaca, penilaian risiko real-time, atau instruksi keadaan
          darurat.
        </p>
      </StaticSection>

      <StaticSection
        id="rekomendasi"
        title="4. Finder, skor, dan penjelasan AI"
      >
        <p>
          Ranking Finder dihitung oleh mesin scoring deterministik dari jawaban
          pengguna dan atribut gunung yang tersedia. Skor adalah alat bantu
          perbandingan, bukan ukuran keselamatan, kelayakan medis, atau
          kepastian pengalaman di lapangan.
        </p>
        <p>
          Jika tersedia, AI hanya menyusun penjelasan dari hasil scoring dan
          data terstruktur. AI tidak seharusnya mengubah ranking, menciptakan
          fakta gunung, menjamin keselamatan, memprediksi cuaca, atau memberi
          saran medis dan darurat. Output AI dapat salah atau tidak lengkap;
          verifikasi selalu dengan sumber resmi.
        </p>
      </StaticSection>

      <StaticSection id="tanggung-jawab" title="5. Tanggung jawab pengguna">
        <p>Dengan menggunakan layanan, kamu bertanggung jawab untuk:</p>
        <ul className={listClassName}>
          <li>
            memeriksa informasi terkini, izin, persyaratan, dan penutupan jalur;
          </li>
          <li>
            menilai kemampuan, kesehatan, pengalaman, perlengkapan, dan waktu
            yang diperlukan;
          </li>
          <li>
            memilih pemandu atau operator berizin bila dibutuhkan dan menilai
            layanan mereka secara mandiri;
          </li>
          <li>
            membuat rencana komunikasi dan darurat, memberi tahu orang
            tepercaya, serta mematuhi arahan petugas;
          </li>
          <li>
            menjaga lingkungan, menghormati masyarakat setempat, dan mematuhi
            hukum serta aturan kawasan;
          </li>
          <li>
            tidak menyalahgunakan layanan, mencoba mengakses akun atau data
            orang lain, mengganggu sistem, atau menggunakan data secara melawan
            hukum.
          </li>
        </ul>
      </StaticSection>

      <StaticSection id="akun" title="6. Akun dan akses">
        <p>
          Kamu bertanggung jawab menjaga akses ke akun Google, email, perangkat,
          dan sesi browser yang digunakan untuk masuk. Berikan data yang wajar
          dan jangan menyamar sebagai orang lain. Segera keluar dari perangkat
          bersama atau yang tidak lagi kamu kuasai.
        </p>
        <p>
          Kami dapat membatasi atau menghentikan akses jika diperlukan untuk
          keamanan, pemeliharaan, kepatuhan hukum, atau penanganan
          penyalahgunaan. Kamu dapat menghapus akun melalui Profile. Dampak
          pemrosesan data dijelaskan lebih lanjut dalam Kebijakan Privasi.
        </p>
      </StaticSection>

      <StaticSection id="konten" title="7. Konten dan kekayaan intelektual">
        <p>
          Nama, antarmuka, tulisan editorial, struktur rekomendasi, dan aset
          orisinal Jejak Puncak dilindungi oleh hak yang berlaku. Kamu boleh
          menggunakan layanan untuk kebutuhan pribadi yang sah, tetapi tidak
          boleh menyalin, menjual, melakukan scraping berlebihan, atau
          mendistribusikan ulang bagian substansial tanpa izin.
        </p>
        <p>
          Foto dan materi pihak ketiga tetap menjadi milik pemegang hak
          masing-masing dan digunakan sesuai lisensi yang dicantumkan, termasuk
          lisensi Wikimedia Commons dan Unsplash. Kredit dan tautan lisensi pada
          halaman detail merupakan bagian dari penggunaan materi tersebut dan
          tidak boleh dihapus saat penggunaan ulang memerlukan atribusi.
        </p>
        <p>
          Nama layanan pihak ketiga, peta, dan data sumber dimiliki oleh pihak
          terkait. Penyebutan atau penautan tidak berarti mereka mendukung Jejak
          Puncak.
        </p>
      </StaticSection>

      <StaticSection
        id="ketersediaan"
        title="8. Ketersediaan, perubahan, dan batas tanggung jawab"
      >
        <p>
          Layanan disediakan “sebagaimana adanya” dan “sebagaimana tersedia”.
          Kami berupaya menjaga akurasi dan ketersediaan, tetapi tidak menjamin
          bahwa seluruh data selalu lengkap, mutakhir, bebas error, atau dapat
          diakses tanpa gangguan. Fitur dapat diubah, ditangguhkan, atau
          dihentikan untuk pemeliharaan dan pengembangan.
        </p>
        <p>
          Sejauh diizinkan oleh hukum yang berlaku, Jejak Puncak tidak
          bertanggung jawab atas keputusan pendakian, tindakan pihak ketiga,
          kondisi alam, kehilangan data tidak langsung, atau kerugian yang
          timbul karena mengandalkan informasi sebagai pengganti verifikasi
          resmi. Ketentuan ini tidak membatasi hak atau tanggung jawab yang
          secara hukum tidak dapat dikesampingkan.
        </p>
        <p>
          Ketentuan ini ditafsirkan berdasarkan hukum Republik Indonesia. Forum
          dan mekanisme penyelesaian sengketa final harus dikonfirmasi setelah
          identitas badan usaha dan domisili operasional ditetapkan.
        </p>
      </StaticSection>

      <StaticSection id="perubahan" title="9. Perubahan ketentuan dan kontak">
        <p>
          Kami dapat memperbarui ketentuan ini untuk mencerminkan perubahan
          layanan, risiko, atau hukum. Tanggal terbaru akan ditampilkan di
          bagian atas. Penggunaan berlanjut setelah perubahan berlaku berarti
          kamu menerima versi terbaru, sepanjang pemberitahuan dan persetujuan
          tambahan tidak diwajibkan oleh hukum.
        </p>
        <p>
          Untuk pertanyaan mengenai ketentuan ini, hubungi{" "}
          <a
            className={staticLinkClassName}
            href="mailto:legal@jejakpuncak.example"
          >
            legal@jejakpuncak.example
          </a>
          . Alamat ini adalah <strong>placeholder</strong> dan wajib diganti
          dengan alamat operasional sebelum peluncuran publik.
        </p>
      </StaticSection>
    </StaticPageLayout>
  );
}
