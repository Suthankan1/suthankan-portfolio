import type { Metadata } from "next";
import { TravelIndexContent } from "../../../components/travel/TravelIndexContent";
import { trips } from "../../../lib/data/travels";
import { createSiteMetadata } from "../../../lib/seo";

export const metadata: Metadata = createSiteMetadata({
  title: "Travels | Suthankan",
  description:
    "A cinematic travel journal from Suthankan, documenting cities, coastlines, cultures, and the personal perspective behind the portfolio.",
  path: "/travels",
});

export default function TravelsPage() {
  return <TravelIndexContent trips={trips} />;
}
