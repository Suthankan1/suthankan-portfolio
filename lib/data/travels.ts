export type Trip = {
  slug: string;
  destination: string;
  city: string;
  country: string;
  countryCode: string;
  continent: "Asia" | "Europe" | "Africa" | "North America" | "South America" | "Oceania";
  dateRange: {
    start: string;
    end: string;
  };
  heroImage: string;
  photos: string[];
  excerpt: string;
  story: string[];
  tags: string[];
  featured: boolean;
  tips: Array<{
    title: string;
    detail: string;
  }>;
  mapEmbedUrl: string;
};

export const trips: Trip[] = [];

export function getTripBySlug(slug: string): Trip | undefined {
  return trips.find((trip) => trip.slug === slug);
}

export function formatTripDateRange(dateRange: Trip["dateRange"]): string {
  const formatter = new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return `${formatter.format(new Date(dateRange.start))} - ${formatter.format(new Date(dateRange.end))}`;
}

export function getTripYear(trip: Trip): string {
  return new Date(trip.dateRange.start).getFullYear().toString();
}

export function countryCodeToFlag(countryCode: string): string {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}
