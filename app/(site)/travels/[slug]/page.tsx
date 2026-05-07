import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TripPageContent } from "../../../../components/travel/TripPageContent";
import { formatTripDateRange, getTripBySlug, trips } from "../../../../lib/data/travels";
import { createOgImageUrl } from "../../../../lib/seo";

type TripPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return trips.map((trip) => ({ slug: trip.slug }));
}

export async function generateMetadata({ params }: TripPageProps): Promise<Metadata> {
  const { slug } = await params;
  const trip = getTripBySlug(slug);

  if (!trip) {
    return {
      title: "Trip not found",
    };
  }

  const ogImage = createOgImageUrl({
    title: trip.destination,
    description: `${trip.country} · ${formatTripDateRange(trip.dateRange)}`,
    type: "travel",
    category: trip.continent,
  });

  return {
    title: `${trip.destination} | Travels`,
    description: trip.excerpt,
    alternates: {
      canonical: `/travels/${trip.slug}`,
    },
    openGraph: {
      title: trip.destination,
      description: trip.excerpt,
      type: "article",
      url: `/travels/${trip.slug}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${trip.destination} travel Open Graph image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: trip.destination,
      description: `${trip.country} · ${formatTripDateRange(trip.dateRange)}`,
      images: [ogImage],
    },
  };
}

export default async function TripPage({ params }: TripPageProps) {
  const { slug } = await params;
  const trip = getTripBySlug(slug);

  if (!trip) {
    notFound();
  }

  const relatedTrips = trips
    .filter((candidate) => candidate.slug !== trip.slug)
    .sort((a, b) => {
      if (a.continent === trip.continent && b.continent !== trip.continent) {
        return -1;
      }

      if (a.continent !== trip.continent && b.continent === trip.continent) {
        return 1;
      }

      return new Date(b.dateRange.start).getTime() - new Date(a.dateRange.start).getTime();
    })
    .slice(0, 3);

  return <TripPageContent trip={trip} relatedTrips={relatedTrips} />;
}
