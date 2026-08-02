import type { Metadata } from "next";

import {
  StaticPageLayout,
  StaticSection,
  staticLinkClassName,
} from "@/components/common/static-page-layout";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Kebijakan Privasi | Jejak Puncak",
  description:
    "Pelajari data yang diproses Jejak Puncak, cara data digunakan dan dilindungi, layanan pihak ketiga, serta pilihan yang tersedia bagi pengguna.",
  robots: { index: true, follow: true },
};

const navigation = [
  { id: "cakupan", label: "Cakupan" },
  { id: "data", label: "Data yang diproses" },
  { id: "penggunaan", label: "Cara kami menggunakan data" },
  { id: "pihak-ketiga", label: "Layanan pihak ketiga" },
  { id: "penyimpanan", label: "Penyimpanan dan keamanan" },
  { id: "hak", label: "Hak dan pilihanmu" },
  { id: "cookie", label: "Cookie dan penyimpanan lokal" },
  { id: "perubahan", label: "Perubahan dan kontak" },
] as const;

const listClassName = "list-disc space-y-xs pl-md marker:text-primary";
const lastUpdated = formatDate("2026-08-02T00:00:00+07:00", {
  dateStyle: "long",
});

export default function PrivacyPage() {
  return (
    <StaticPageLayout
      description="Kebijakan ini menjelaskan data yang diproses saat kamu menggunakan Jejak Puncak, tujuan penggunaannya, dan pilihan yang tersedia bagimu."
      eyebrow="Privasi"
      lastUpdated={lastUpdated}
      navigation={navigation}
      notice="Dokumen ini adalah draf operasional untuk transparansi produk dan belum ditinjau oleh penasihat hukum. Isinya tidak menggantikan nasihat hukum profesional."
      title="Kebijakan Privasi Jejak Puncak"
    >
      <StaticSection id="cakupan" title="1. Cakupan kebijakan">
        <p>
          Kebijakan ini berlaku untuk situs dan fitur Jejak Puncak, termasuk
          Explore, Map, Compare, Jejak Finder, akun, Profile, wishlist, status
          pendakian selesai, serta Jejak Passport.
        </p>
        <p>
          Kami berupaya memproses data secara transparan, terbatas pada tujuan
          yang relevan, dan dengan pengamanan yang wajar. Pendekatan ini
          dirancang agar sejalan dengan prinsip pelindungan data di Indonesia,
          termasuk Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data
          Pribadi. Pernyataan ini bukan sertifikasi kepatuhan atau hasil audit
          hukum.
        </p>
      </StaticSection>

      <StaticSection id="data" title="2. Data yang kami proses">
        <h3 className="font-heading text-h4 font-semibold text-text-primary">
          Data akun dan profil
        </h3>
        <ul className={listClassName}>
          <li>
            alamat email, nama tampilan, identitas akun, dan penyedia login;
          </li>
          <li>
            foto avatar, URL avatar, bio, serta waktu pembuatan dan pembaruan
            profil;
          </li>
          <li>
            pengalaman mendaki, tingkat kebugaran, wilayah pilihan, tujuan
            pendakian, dan satuan pengukuran.
          </li>
        </ul>
        <p>
          Jika kamu masuk dengan Google, Google mengirimkan informasi identitas
          dasar yang kamu izinkan, seperti nama, email, dan foto profil, melalui
          alur OAuth. Jejak Puncak tidak menerima kata sandi akun Google-mu.
        </p>

        <h3 className="pt-xs font-heading text-h4 font-semibold text-text-primary">
          Aktivitas di Jejak Puncak
        </h3>
        <ul className={listClassName}>
          <li>
            gunung yang masuk wishlist, gunung yang ditandai selesai, dan waktu
            penyelesaiannya;
          </li>
          <li>
            jawaban Finder, rekomendasi teratas, dan snapshot hasil rekomendasi;
          </li>
          <li>
            untuk pengguna tanpa akun, hasil Finder dapat disimpan tanpa
            identitas pengguna agar fitur tetap berjalan.
          </li>
        </ul>

        <h3 className="pt-xs font-heading text-h4 font-semibold text-text-primary">
          Data teknis
        </h3>
        <p>
          Penyedia infrastruktur dapat memproses alamat IP, jenis perangkat dan
          browser, waktu permintaan, cookie sesi, serta log keamanan atau error
          ketika kamu mengakses layanan. Jejak Puncak saat ini tidak memasang
          cookie iklan atau menjual profil perilaku untuk periklanan.
        </p>
      </StaticSection>

      <StaticSection id="penggunaan" title="3. Cara kami menggunakan data">
        <p>Kami menggunakan data tersebut untuk:</p>
        <ul className={listClassName}>
          <li>membuat akun, memverifikasi sesi, dan mengelola Profile;</li>
          <li>
            menyesuaikan Finder dan menyusun rekomendasi berdasarkan jawabanmu;
          </li>
          <li>
            menyimpan wishlist, riwayat gunung selesai, statistik, dan Passport;
          </li>
          <li>
            memberikan penjelasan hasil Finder atau Compare jika fitur AI
            dikonfigurasi;
          </li>
          <li>
            menjaga keamanan, mendiagnosis gangguan, mencegah penyalahgunaan,
            dan meningkatkan layanan;
          </li>
          <li>memenuhi kewajiban hukum yang berlaku.</li>
        </ul>
        <p>
          Kami tidak menjual data pribadimu. Kami juga tidak membagikannya untuk
          iklan lintas layanan. Data hanya diteruskan kepada penyedia yang
          diperlukan untuk menjalankan fitur, atas instruksi pengguna, atau jika
          diwajibkan oleh hukum.
        </p>
      </StaticSection>

      <StaticSection id="pihak-ketiga" title="4. Layanan pihak ketiga">
        <ul className={listClassName}>
          <li>
            <strong className="text-text-primary">Supabase</strong> menyediakan
            database, autentikasi, dan penyimpanan avatar. Baca{" "}
            <a
              className={staticLinkClassName}
              href="https://supabase.com/privacy"
              rel="noreferrer"
              target="_blank"
            >
              Kebijakan Privasi Supabase
              <span className="sr-only"> (terbuka di tab baru)</span>
            </a>
            .
          </li>
          <li>
            <strong className="text-text-primary">Google</strong> memproses
            login jika kamu memilih Google OAuth. Baca{" "}
            <a
              className={staticLinkClassName}
              href="https://policies.google.com/privacy"
              rel="noreferrer"
              target="_blank"
            >
              Kebijakan Privasi Google
              <span className="sr-only"> (terbuka di tab baru)</span>
            </a>
            .
          </li>
          <li>
            <strong className="text-text-primary">Mapbox</strong> menyediakan
            basemap interaktif dan dapat menerima data teknis serta interaksi
            peta. Baca{" "}
            <a
              className={staticLinkClassName}
              href="https://www.mapbox.com/legal/privacy"
              rel="noreferrer"
              target="_blank"
            >
              Kebijakan Privasi Mapbox
              <span className="sr-only"> (terbuka di tab baru)</span>
            </a>
            .
          </li>
          <li>
            <strong className="text-text-primary">Vercel</strong> menyediakan
            hosting dan jaringan pengiriman aplikasi. Baca{" "}
            <a
              className={staticLinkClassName}
              href="https://vercel.com/legal/privacy-notice"
              rel="noreferrer"
              target="_blank"
            >
              Kebijakan Privasi Vercel
              <span className="sr-only"> (terbuka di tab baru)</span>
            </a>
            .
          </li>
          <li>
            <strong className="text-text-primary">Penyedia AI</strong> dapat
            berupa OpenAI atau Anthropic, sesuai konfigurasi layanan. Saat
            penjelasan AI diminta, kami mengirimkan jawaban Finder atau data
            perbandingan yang relevan, skor, dan atribut gunung—bukan password
            atau data akun yang tidak diperlukan. Narasi AI tidak disimpan dalam
            tabel hasil Finder Jejak Puncak, tetapi penyedia dapat memproses
            data sesuai kebijakan dan ketentuan mereka. Baca kebijakan privasi{" "}
            <a
              className={staticLinkClassName}
              href="https://openai.com/policies/privacy-policy/"
              rel="noreferrer"
              target="_blank"
            >
              OpenAI
              <span className="sr-only"> (terbuka di tab baru)</span>
            </a>{" "}
            atau{" "}
            <a
              className={staticLinkClassName}
              href="https://www.anthropic.com/legal/privacy"
              rel="noreferrer"
              target="_blank"
            >
              Anthropic
              <span className="sr-only"> (terbuka di tab baru)</span>
            </a>
            .
          </li>
        </ul>
        <p>
          Setiap penyedia dapat memproses data di negara lain dan memiliki masa
          retensi sendiri. Kami menyarankan kamu membaca kebijakan penyedia
          sebelum menggunakan fitur terkait.
        </p>
      </StaticSection>

      <StaticSection
        id="penyimpanan"
        title="5. Penyimpanan, retensi, dan keamanan"
      >
        <p>
          Data aplikasi disimpan melalui Supabase dan infrastruktur pendukung.
          Tabel profil, wishlist, status selesai, serta hasil Finder yang
          terkait akun dilindungi dengan kebijakan Row Level Security yang
          membatasi operasi aplikasi berdasarkan pemilik data. RLS adalah salah
          satu lapis kontrol akses, bukan jaminan bahwa risiko keamanan dapat
          dihilangkan sepenuhnya.
        </p>
        <p>
          Avatar disimpan di bucket publik agar dapat ditampilkan melalui URL.
          Jangan unggah gambar yang mengandung informasi sensitif atau yang
          tidak ingin kamu tampilkan. Kebijakan akses tetap membatasi operasi
          unggah, ubah, dan hapus ke folder milik pengguna yang masuk.
        </p>
        <p>
          Data akun disimpan selama akun aktif atau selama diperlukan untuk
          menyediakan layanan dan memenuhi kewajiban yang berlaku. Saat akun
          dihapus melalui aplikasi, profil, wishlist, dan status selesai yang
          dimiliki akun ikut dihapus; snapshot Finder dilepas dari pengenal akun
          dan menjadi data tanpa identitas pengguna. File avatar, backup, atau
          log penyedia dapat memerlukan masa retensi atau proses penghapusan
          tambahan. Hubungi kami bila kamu meminta penghapusan menyeluruh yang
          dapat kami tindak lanjuti.
        </p>
      </StaticSection>

      <StaticSection id="hak" title="6. Hak dan pilihanmu">
        <p>Kamu dapat:</p>
        <ul className={listClassName}>
          <li>melihat dan memperbarui nama, bio, avatar, serta preferensi;</li>
          <li>menghapus item wishlist atau mengubah status pendakian;</li>
          <li>
            keluar untuk mengakhiri penggunaan sesi pada perangkat tersebut;
          </li>
          <li>
            menghapus akun dari tab Account di Profile; tindakan ini tidak dapat
            dibatalkan;
          </li>
          <li>
            meminta informasi, koreksi, atau penghapusan melalui alamat kontak
            di bawah, sepanjang dapat kami verifikasi dan tidak bertentangan
            dengan kewajiban hukum atau keamanan.
          </li>
        </ul>
      </StaticSection>

      <StaticSection id="cookie" title="7. Cookie dan penyimpanan lokal">
        <p>
          Jejak Puncak menggunakan cookie yang diperlukan untuk menjaga sesi
          Supabase Auth dan menghubungkan permintaan browser dengan akun yang
          benar. Menonaktifkan cookie tersebut dapat membuat login dan fitur
          personal tidak berfungsi.
        </p>
        <p>
          Progres Finder yang belum selesai dapat disimpan sementara di
          <span translate="no"> sessionStorage</span> browser. Data ini berada
          di perangkat dan umumnya hilang saat sesi tab berakhir. Kami akan
          memperbarui kebijakan ini sebelum menggunakan cookie analitik atau
          pemasaran yang tidak esensial.
        </p>
      </StaticSection>

      <StaticSection id="perubahan" title="8. Perubahan kebijakan dan kontak">
        <p>
          Kami dapat memperbarui kebijakan ini ketika fitur, penyedia, atau
          kewajiban hukum berubah. Tanggal pembaruan terbaru akan ditampilkan di
          bagian atas halaman ini. Perubahan material sebaiknya diberitahukan
          melalui aplikasi atau kanal yang wajar sebelum berlaku.
        </p>
        <p>
          Untuk pertanyaan atau permintaan terkait privasi, hubungi{" "}
          <a
            className={staticLinkClassName}
            href="mailto:privasi@jejakpuncak.example"
          >
            privasi@jejakpuncak.example
          </a>
          . Alamat ini adalah <strong>placeholder</strong> dan wajib diganti
          dengan alamat operasional sebelum peluncuran publik.
        </p>
      </StaticSection>
    </StaticPageLayout>
  );
}
