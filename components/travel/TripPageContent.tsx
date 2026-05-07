"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import "yet-another-react-lightbox/styles.css";
import { ChevronDown, ExternalLink, MapPin } from "lucide-react";
import {
  countryCodeToFlag,
  formatTripDateRange,
  type Trip,
} from "../../lib/data/travels";
import { BLUR_DATA_URL } from "../../lib/images";
import { cn } from "../../lib/utils";

const Lightbox = dynamic(() => import("yet-another-react-lightbox"), {
  ssr: false,
});

function TravelTips({ trip }: { trip: Trip }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="mx-auto w-full max-w-5xl px-5 py-14 sm:px-6 lg:px-8">
      <div className="mb-7">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-primary">Practical Notes</p>
        <h2 className="mt-2 font-display text-5xl font-semibold tracking-[-0.05em]">Travel tips</h2>
      </div>
      <div className="divide-y divide-border rounded-[var(--radius-md)] border border-border bg-bg-secondary">
        {trip.tips.map((tip, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={tip.title}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
              >
                <span className="font-display text-2xl font-semibold tracking-[-0.03em]">{tip.title}</span>
                <ChevronDown
                  className={cn("h-5 w-5 shrink-0 text-accent-primary transition-transform", isOpen ? "rotate-180" : "")}
                />
              </button>
              <div
                className={cn(
                  "grid transition-all duration-300 motion-reduce:transition-none",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 leading-relaxed text-text-secondary">{tip.detail}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function PhotoGallery({ trip }: { trip: Trip }) {
  const [index, setIndex] = useState(-1);
  const slides = useMemo(
    () =>
      trip.photos.map((photo, photoIndex) => ({
        src: photo,
        title: `${trip.destination} frame ${photoIndex + 1}`,
        description: trip.excerpt,
      })),
    [trip],
  );

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
      <div className="mb-8 grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-primary">Photo Journal</p>
          <h2 className="mt-2 font-display text-5xl font-semibold tracking-[-0.05em]">Frames from the trip</h2>
        </div>
        <p className="max-w-2xl text-text-secondary md:justify-self-end">
          A loose visual diary of textures, streets, skies, food stops, and the little in-between moments.
        </p>
      </div>

      <div className="columns-1 gap-5 md:columns-2 lg:columns-3">
        {trip.photos.map((photo, photoIndex) => (
          <button
            key={photo}
            type="button"
            onClick={() => setIndex(photoIndex)}
            className={cn(
              "group mb-5 block w-full break-inside-avoid overflow-hidden rounded-[var(--radius-md)] border border-border bg-bg-tertiary text-left shadow-[var(--shadow-sm)]",
              "transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-primary)] motion-reduce:transition-none motion-reduce:hover:translate-y-0",
            )}
          >
            <div className={cn("relative", photoIndex % 3 === 0 ? "aspect-[4/5]" : "aspect-[4/3]")}>
              <Image
                src={photo}
                alt={`${trip.destination} photo ${photoIndex + 1}`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
            </div>
            <p className="px-4 py-3 text-sm text-text-muted">{trip.destination} · Frame {photoIndex + 1}</p>
          </button>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides}
      />
    </section>
  );
}

function RelatedTrips({ trips }: { trips: Trip[] }) {
  if (trips.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
      <div className="mb-7">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-primary">Related Trips</p>
        <h2 className="mt-2 font-display text-5xl font-semibold tracking-[-0.05em]">Nearby in spirit</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {trips.map((trip) => (
          <Link
            key={trip.slug}
            href={`/travels/${trip.slug}`}
            className="group overflow-hidden rounded-[var(--radius-md)] border border-border bg-bg-secondary transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-primary)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <div className="relative h-52 bg-bg-tertiary">
              <Image
                src={trip.heroImage}
                alt={`${trip.destination}, ${trip.country}`}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
            </div>
            <div className="space-y-3 p-5">
              <p className="text-2xl" aria-hidden="true">
                {countryCodeToFlag(trip.countryCode)}
              </p>
              <h3 className="font-display text-3xl font-semibold leading-tight tracking-[-0.04em]">{trip.destination}</h3>
              <p className="line-clamp-2 text-sm leading-relaxed text-text-secondary">{trip.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function TripPageContent({ trip, relatedTrips }: { trip: Trip; relatedTrips: Trip[] }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="bg-bg-primary">
      <section className="relative flex min-h-screen items-end overflow-hidden">
        <Image
          src={trip.heroImage}
          alt={`${trip.destination}, ${trip.country}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,13,13,0.12)_0%,rgba(13,13,13,0.42)_42%,rgba(13,13,13,0.88)_100%)]" />
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 26 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 text-white sm:px-6 lg:px-8"
        >
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="text-4xl" aria-hidden="true">
              {countryCodeToFlag(trip.countryCode)}
            </span>
            <span className="rounded-full border border-white/24 bg-white/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur">
              {trip.country}
            </span>
            <span className="rounded-full border border-white/24 bg-white/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/82 backdrop-blur">
              {formatTripDateRange(trip.dateRange)}
            </span>
          </div>
          <h1 className="max-w-5xl font-display text-[clamp(4rem,11vw,10.5rem)] font-semibold leading-[0.82] tracking-[-0.06em] text-white">
            {trip.destination}
          </h1>
          <p className="mt-6 flex items-center gap-2 text-lg font-medium text-white/82">
            <MapPin className="h-5 w-5" />
            {trip.city}
          </p>
        </motion.div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-16 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-primary">Trip Story</p>
          <h2 className="mt-2 font-display text-5xl font-semibold tracking-[-0.05em]">What stayed with me</h2>
        </div>
        <div className="space-y-6">
          {trip.story.map((paragraph) => (
            <p key={paragraph} className="text-lg leading-8 text-text-secondary">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <PhotoGallery trip={trip} />
      <TravelTips trip={trip} />

      <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-primary">Map</p>
            <h2 className="mt-2 font-display text-5xl font-semibold tracking-[-0.05em]">Where it happened</h2>
          </div>
          <a
            href={trip.mapEmbedUrl.replace("/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=", "/search/?api=1&query=")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-secondary px-4 py-2 text-sm font-semibold text-text-secondary transition-colors hover:border-[var(--accent-primary)] hover:text-text-primary"
          >
            Open map
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
        <div className="overflow-hidden rounded-[var(--radius-md)] border border-border bg-bg-secondary">
          <iframe
            title={`${trip.destination} map`}
            src={trip.mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[420px] w-full border-0"
          />
        </div>
      </section>

      <RelatedTrips trips={relatedTrips} />
    </main>
  );
}
