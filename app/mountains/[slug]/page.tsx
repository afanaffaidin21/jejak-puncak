import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DecisionSummary } from "@/components/mountains/decision-summary";
import { DetailHero } from "@/components/mountains/detail-hero";
import { MountainViewTracker } from "@/components/mountains/mountain-view-tracker";
import { getAllMountains, getMountainBySlug } from "@/services/mountains";

type MountainDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const result = await getAllMountains({ pageSize: 48 }).catch(() => null);

  return result?.mountains.map((mountain) => ({ slug: mountain.slug })) ?? [];
}

export async function generateMetadata({
  params,
}: MountainDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const mountain = await getMountainBySlug(slug).catch(() => null);

  if (!mountain) {
    return {
      title: "Gunung tidak ditemukan | Jejak Puncak",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${mountain.name}: Rute dan Panduan Awal | Jejak Puncak`,
    description: mountain.summary,
    alternates: {
      canonical: `/mountains/${mountain.slug}`,
    },
    openGraph: {
      title: mountain.name,
      description: mountain.summary,
      images: [{ url: mountain.heroImage }],
      type: "website",
    },
  };
}

export default async function MountainDetailPage({
  params,
}: MountainDetailPageProps) {
  const { slug } = await params;
  const mountain = await getMountainBySlug(slug);

  if (!mountain) {
    notFound();
  }

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "TouristAttraction",
      name: mountain.name,
      description: mountain.summary,
      image: `https://jejak-puncak.vercel.app${mountain.heroImage}`,
      url: `https://jejak-puncak.vercel.app/mountains/${mountain.slug}`,
      geo: {
        "@type": "GeoCoordinates",
        latitude: mountain.latitude,
        longitude: mountain.longitude,
      },
      address: {
        "@type": "PostalAddress",
        addressRegion: mountain.province,
        addressCountry: "ID",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Beranda",
          item: "https://jejak-puncak.vercel.app",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Explore",
          item: "https://jejak-puncak.vercel.app/explore",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: mountain.name,
          item: `https://jejak-puncak.vercel.app/mountains/${mountain.slug}`,
        },
      ],
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
      <MountainViewTracker slug={mountain.slug} />
      <DetailHero mountain={mountain} />
      <DecisionSummary mountain={mountain} />
    </>
  );
}
