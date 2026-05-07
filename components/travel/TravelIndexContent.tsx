"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Camera, Globe2, MapPin } from "lucide-react";
import { useCountUp } from "../../lib/hooks/useCountUp";
import {
  countryCodeToFlag,
  formatTripDateRange,
  getTripYear,
  type Trip,
} from "../../lib/data/travels";
import { cn } from "../../lib/utils";

const BLUR_PLACEHOLDER =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN89h8AAqABfQ9ch6wAAAAASUVORK5CYII=";

type CountryShape = {
  code: string;
  name: string;
  path: string;
  labelX: number;
  labelY: number;
};

const COUNTRY_SHAPES: CountryShape[] = [
  {
    code: "LK",
    name: "Sri Lanka",
    path: "M590 314 l10 18 l-7 19 l-12 -13 l2 -18 z",
    labelX: 600,
    labelY: 302,
  },
  {
    code: "SG",
    name: "Singapore",
    path: "M646 347 l18 0 l4 8 l-18 3 z",
    labelX: 660,
    labelY: 338,
  },
  {
    code: "TH",
    name: "Thailand",
    path: "M610 250 l35 18 l-4 42 l23 29 l-19 10 l-32 -43 l-18 -24 z",
    labelX: 650,
    labelY: 244,
  },
];

function AnimatedStat({ label, value, icon: Icon }: { label: string; value: number; icon: typeof Globe2 }) {
  const { count, targetRef } = useCountUp({ end: value, duration: 1100 });

  return (
    <div ref={targetRef as React.RefObject<HTMLDivElement>} className="border-l border-border px-5 py-4 first:border-l-0">
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-accent-primary" />
        <p className="font-display text-4xl font-semibold tracking-[-0.04em]">{count}</p>
      </div>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">{label}</p>
    </div>
  );
}

function WorldMap({
  selectedCountry,
  trips,
  onSelectCountry,
}: {
  selectedCountry: string | null;
  trips: Trip[];
  onSelectCountry: (countryCode: string | null) => void;
}) {
  const visitedCountries = new Set(trips.map((trip) => trip.countryCode));
  const [tooltip, setTooltip] = useState<{ x: number; y: number; name: string } | null>(null);

  return (
    <div className="relative overflow-hidden rounded-[var(--radius-md)] border border-border bg-bg-secondary p-4 shadow-[var(--shadow-sm)]">
      <svg viewBox="0 0 960 500" role="img" aria-label="Interactive world map" className="h-auto w-full">
        <path
          d="M98 128 C150 85 240 86 296 133 C342 171 335 237 288 264 C230 299 147 271 105 225 C75 193 67 153 98 128 Z"
          className="fill-bg-tertiary stroke-border"
          strokeWidth="2"
        />
        <path
          d="M248 300 C303 270 371 283 400 330 C426 372 404 438 351 459 C300 480 240 447 228 394 C219 356 222 319 248 300 Z"
          className="fill-bg-tertiary stroke-border"
          strokeWidth="2"
        />
        <path
          d="M438 112 C506 74 612 93 653 148 C700 211 641 284 558 276 C485 269 413 233 402 176 C396 148 411 128 438 112 Z"
          className="fill-bg-tertiary stroke-border"
          strokeWidth="2"
        />
        <path
          d="M504 272 C553 253 609 273 632 318 C659 371 620 444 561 449 C507 453 477 403 486 347 C490 316 482 287 504 272 Z"
          className="fill-bg-tertiary stroke-border"
          strokeWidth="2"
        />
        <path
          d="M654 142 C738 98 844 128 886 194 C925 256 875 327 786 321 C704 316 624 284 610 218 C603 184 620 160 654 142 Z"
          className="fill-bg-tertiary stroke-border"
          strokeWidth="2"
        />
        <path
          d="M748 340 C794 313 856 333 878 380 C897 420 871 466 819 466 C773 466 732 433 728 389 C726 369 733 351 748 340 Z"
          className="fill-bg-tertiary stroke-border"
          strokeWidth="2"
        />

        {COUNTRY_SHAPES.map((shape) => {
          const visited = visitedCountries.has(shape.code);
          const selected = selectedCountry === shape.code;

          return (
            <g key={shape.code}>
              <path
                d={shape.path}
                tabIndex={visited ? 0 : -1}
                role={visited ? "button" : "img"}
                aria-label={shape.name}
                onMouseEnter={() => setTooltip({ x: shape.labelX, y: shape.labelY, name: shape.name })}
                onMouseLeave={() => setTooltip(null)}
                onFocus={() => setTooltip({ x: shape.labelX, y: shape.labelY, name: shape.name })}
                onBlur={() => setTooltip(null)}
                onClick={() => visited && onSelectCountry(selected ? null : shape.code)}
                onKeyDown={(event) => {
                  if (visited && (event.key === "Enter" || event.key === " ")) {
                    onSelectCountry(selected ? null : shape.code);
                  }
                }}
                className={cn(
                  "stroke-[var(--bg-primary)] stroke-2 transition-colors outline-none",
                  visited
                    ? "cursor-pointer fill-[var(--accent-primary)] hover:fill-[var(--accent-secondary)] focus:fill-[var(--accent-secondary)]"
                    : "fill-bg-tertiary",
                  selected ? "fill-[var(--accent-secondary)]" : "",
                )}
              />
              {visited ? (
                <circle
                  cx={shape.labelX}
                  cy={shape.labelY + 16}
                  r="4"
                  className="fill-[var(--accent-secondary)]"
                />
              ) : null}
            </g>
          );
        })}

        {tooltip ? (
          <g pointerEvents="none">
            <rect
              x={tooltip.x - 48}
              y={tooltip.y - 27}
              width="96"
              height="26"
              rx="13"
              className="fill-[var(--text-primary)]"
            />
            <text
              x={tooltip.x}
              y={tooltip.y - 10}
              textAnchor="middle"
              className="fill-[var(--bg-primary)] text-[11px] font-semibold"
            >
              {tooltip.name}
            </text>
          </g>
        ) : null}
      </svg>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
        <span>Visited countries are highlighted</span>
        {selectedCountry ? (
          <button type="button" onClick={() => onSelectCountry(null)} className="text-accent-primary">
            Clear country
          </button>
        ) : null}
      </div>
    </div>
  );
}

function TripCard({ trip, large = false }: { trip: Trip; large?: boolean }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      className={cn(
        "group break-inside-avoid overflow-hidden rounded-[var(--radius-md)] border border-border bg-bg-secondary shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--accent-primary)_34%,var(--border))] hover:shadow-[var(--shadow-md)] motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        large ? "grid gap-0 md:grid-cols-[1.2fr_0.8fr]" : "mb-5",
      )}
    >
      <Link href={`/travels/${trip.slug}`} className={cn("block", large ? "contents" : "")}>
        <div className={cn("relative overflow-hidden bg-bg-tertiary", large ? "min-h-[420px]" : "h-72")}>
          <Image
            src={trip.heroImage}
            alt={`${trip.destination}, ${trip.country}`}
            fill
            priority={large}
            sizes={large ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
            className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
          />
        </div>
        <div className={cn("space-y-5 p-5", large ? "flex flex-col justify-between p-7 lg:p-9" : "")}>
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="text-2xl" aria-hidden="true">
                {countryCodeToFlag(trip.countryCode)}
              </span>
              <span className="rounded-full border border-border bg-bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-[0.13em] text-text-secondary">
                {trip.continent}
              </span>
              {trip.featured ? (
                <span className="rounded-full border border-[color-mix(in_srgb,var(--accent-secondary)_60%,var(--border))] bg-[color-mix(in_srgb,var(--accent-secondary)_14%,transparent)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.13em] text-text-primary">
                  Featured
                </span>
              ) : null}
            </div>
            <h2 className={cn("font-display font-semibold leading-tight tracking-[-0.04em]", large ? "text-5xl" : "text-3xl")}>
              {trip.destination}
            </h2>
            <p className="mt-3 flex items-center gap-2 text-sm font-medium text-text-muted">
              <MapPin className="h-4 w-4 text-accent-primary" />
              {trip.country} · {formatTripDateRange(trip.dateRange)}
            </p>
            <p className={cn("mt-4 text-text-secondary", large ? "text-lg leading-8" : "line-clamp-1 text-sm")}>
              {trip.excerpt}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {trip.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-border bg-bg-primary px-3 py-1 text-xs text-text-secondary">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export function TravelIndexContent({ trips }: { trips: Trip[] }) {
  const [continent, setContinent] = useState("All");
  const [year, setYear] = useState("All");
  const [countryCode, setCountryCode] = useState<string | null>(null);

  const continents = useMemo(() => ["All", ...Array.from(new Set(trips.map((trip) => trip.continent)))], [trips]);
  const years = useMemo(() => ["All", ...Array.from(new Set(trips.map(getTripYear))).sort((a, b) => Number(b) - Number(a))], [trips]);
  const featuredTrip = trips.find((trip) => trip.featured) ?? trips[0];
  const totalPhotos = trips.reduce((sum, trip) => sum + trip.photos.length, 0);
  const countries = new Set(trips.map((trip) => trip.countryCode)).size;
  const cities = new Set(trips.flatMap((trip) => trip.city.split(",").map((city) => city.trim()))).size;

  const filteredTrips = trips.filter((trip) => {
    const matchesContinent = continent === "All" || trip.continent === continent;
    const matchesYear = year === "All" || getTripYear(trip) === year;
    const matchesCountry = countryCode ? trip.countryCode === countryCode : true;

    return matchesContinent && matchesYear && matchesCountry;
  });

  const standardTrips = featuredTrip ? filteredTrips.filter((trip) => trip.slug !== featuredTrip.slug) : filteredTrips;

  return (
    <main className="bg-bg-primary">
      <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-accent-primary">
              Travel Journal
            </p>
            <h1 className="font-display text-[clamp(4rem,12vw,11rem)] font-semibold leading-[0.8] tracking-[-0.06em]">
              Around the world
            </h1>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-text-secondary lg:justify-self-end">
            A personal atlas of cities, coastlines, food stops, quiet streets, and the small visual details that
            make travel feel worth remembering.
          </p>
        </div>

        <div className="mt-10 grid divide-y divide-border rounded-[var(--radius-md)] border border-border bg-bg-secondary sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <AnimatedStat label="Countries" value={countries} icon={Globe2} />
          <AnimatedStat label="Cities" value={cities} icon={MapPin} />
          <AnimatedStat label="Photos taken" value={totalPhotos} icon={Camera} />
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 pb-12 sm:px-6 lg:px-8">
        <WorldMap selectedCountry={countryCode} trips={trips} onSelectCountry={setCountryCode} />
      </section>

      <section className="border-y border-border bg-bg-secondary">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-5 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-2 text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">Continent</span>
            {continents.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setContinent(item)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                  continent === item
                    ? "border-[var(--accent-primary)] bg-[var(--accent-primary)] text-[var(--bg-primary)]"
                    : "border-border bg-bg-primary text-text-secondary hover:border-[var(--accent-primary)] hover:text-text-primary",
                )}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-2 text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">Year</span>
            {years.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setYear(item)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                  year === item
                    ? "border-[var(--accent-primary)] bg-[var(--accent-primary)] text-[var(--bg-primary)]"
                    : "border-border bg-bg-primary text-text-secondary hover:border-[var(--accent-primary)] hover:text-text-primary",
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
        {trips.length === 0 ? (
          <div className="rounded-[var(--radius-md)] border border-dashed border-[color-mix(in_srgb,var(--accent-primary)_35%,var(--border))] bg-bg-secondary px-6 py-16 text-center">
            <Globe2 className="mx-auto h-10 w-10 text-accent-primary" />
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.04em]">No real trips added yet.</h2>
            <p className="mx-auto mt-3 max-w-md text-text-secondary">
              The placeholder travel journal has been cleared. Real destinations, photos, and stories will appear here once they are added.
            </p>
          </div>
        ) : featuredTrip && filteredTrips.some((trip) => trip.slug === featuredTrip.slug) ? (
          <div className="mb-8">
            <TripCard trip={featuredTrip} large />
          </div>
        ) : null}

        {standardTrips.length > 0 ? (
          <div className="columns-1 gap-5 md:columns-2 xl:columns-3">
            {standardTrips.map((trip) => (
              <TripCard key={trip.slug} trip={trip} />
            ))}
          </div>
        ) : filteredTrips.length === 0 ? (
          <div className="rounded-[var(--radius-md)] border border-dashed border-[color-mix(in_srgb,var(--accent-primary)_35%,var(--border))] bg-bg-secondary px-6 py-16 text-center">
            <h2 className="font-display text-4xl font-semibold tracking-[-0.04em]">No trips in this view.</h2>
            <p className="mx-auto mt-3 max-w-md text-text-secondary">
              Clear a filter or pick another region to continue exploring the journal.
            </p>
            <button
              type="button"
              onClick={() => {
                setContinent("All");
                setYear("All");
                setCountryCode(null);
              }}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-bg-primary px-5 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-[var(--accent-primary)]"
            >
              Reset filters
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ) : null}
      </section>
    </main>
  );
}
