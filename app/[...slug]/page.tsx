import { notFound } from "next/navigation";
import { getManagedEntryBySlug } from "../../cms";
import { GuidedInnerPage } from "../components/GuidedInnerPage";

export const dynamic = "force-dynamic";

const knownSlugs = [
  "our-courses",
  "country",
  "fee",
  "childrens-section",
  "e-books",
  "islamic-education-part-one-english",
  "islamic-education-part-two-english",
  "living-an-islamic-way-of-life-english",
  "islamic-manners-english",
  "contact-us",
  "about-us",
  "blog",
  "noorani-qaida-online-for-beginners",
  "online-quran-tafseer-course",
  "qirat-course",
  "learn-quran-with-tajweed-online",
  "learn-quran-reading-online",
  "female-quran-teacher",
  "online-quran-memorization-program",
  "benefits-of-surah-kahf",
  "sunnah-foods-for-sehri-and-iftar",
  "difference-between-zakat-sadaqah-and-fitrana",
  "childrens-section-course",
  "one-to-one-quran-classes",
];

type PageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

export function generateStaticParams() {
  return knownSlugs.map((slug) => ({
    slug: [slug],
  }));
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const path = slug.join("/");

  if (!path || path === "alsaifquranacademy.com") {
    notFound();
  }

  const customPage = await getManagedEntryBySlug(path);

  if (customPage) {
    return (
      <GuidedInnerPage
        title={customPage.title}
        subtitle={customPage.subtitle}
        introTitle={customPage.introTitle}
        intro={customPage.intro}
        pointsTitle={customPage.pointsTitle}
        points={customPage.points}
        ctaTitle={customPage.ctaTitle}
        ctaText={customPage.ctaText}
        image={customPage.image}
      />
    );
  }

  notFound();
}
