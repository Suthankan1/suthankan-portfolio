"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpDown, ExternalLink, ShieldCheck } from "lucide-react";
import {
  certificateCategories,
  certificates,
  formatCertificateDate,
  type Certificate,
  type CertificateCategory,
  type CertificateStatus,
} from "../../../lib/data/certificates";
import { cn } from "../../../lib/utils";

type SortOption = "Most Recent" | "Alphabetical" | "Issuer";

const sortOptions: SortOption[] = ["Most Recent", "Alphabetical", "Issuer"];

const statusClassName: Record<CertificateStatus, string> = {
  Valid:
    "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  Expired:
    "border-red-500/40 bg-red-500/10 text-red-700 dark:text-red-300",
  "In Progress":
    "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300",
};

function CertificateCard({ certificate, index }: { certificate: Certificate; index: number }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
      animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className={cn(
        "group flex min-h-full flex-col rounded-[var(--radius-md)] border bg-bg-secondary p-5 shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)] motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        certificate.featured
          ? "border-[color-mix(in_srgb,var(--accent-primary)_48%,var(--border))] md:col-span-2 xl:col-span-1"
          : "border-border",
      )}
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[var(--radius-md)] border border-[color-mix(in_srgb,var(--accent-primary)_28%,var(--border))] bg-bg-primary font-display text-lg font-semibold tracking-[-0.04em] text-accent-primary">
          {certificate.issuerLogo}
        </div>
        <span className={cn("rounded-full border px-3 py-1 text-xs font-semibold", statusClassName[certificate.status])}>
          {certificate.status}
        </span>
      </div>

      <div className="flex-1">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-border bg-bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-[0.13em] text-text-muted">
            {certificate.category}
          </span>
          {certificate.featured ? (
            <span className="rounded-full border border-[color-mix(in_srgb,var(--accent-secondary)_55%,var(--border))] bg-[color-mix(in_srgb,var(--accent-secondary)_14%,transparent)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.13em] text-text-primary">
              Featured
            </span>
          ) : null}
        </div>
        <h2 className="font-display text-2xl font-semibold leading-tight tracking-[-0.03em]">
          {certificate.name}
        </h2>
        <p className="mt-3 text-sm font-medium text-text-secondary">{certificate.issuer}</p>
        <div className="mt-5 grid gap-2 text-sm text-text-muted">
          <p>Issued {formatCertificateDate(certificate.issueDate)}</p>
          {certificate.expiryDate ? <p>Expires {formatCertificateDate(certificate.expiryDate)}</p> : null}
          <p className="font-mono text-xs uppercase tracking-[0.12em]">{certificate.credentialId}</p>
        </div>
      </div>

      {certificate.verifyUrl ? (
        <a
          href={certificate.verifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-between rounded-full border border-border bg-bg-primary px-4 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:border-[var(--accent-primary)]"
        >
          Verify
          <ExternalLink className="h-4 w-4" />
        </a>
      ) : (
        <div className="mt-6 rounded-full border border-border bg-bg-primary px-4 py-2.5 text-center text-sm font-semibold text-text-muted">
          Verification link unavailable
        </div>
      )}
    </motion.article>
  );
}

export function CertificatesPageContent() {
  const [selectedCategories, setSelectedCategories] = useState<CertificateCategory[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("Most Recent");

  const stats = useMemo(
    () => ({
      total: certificates.length,
      valid: certificates.filter((certificate) => certificate.status === "Valid").length,
      inProgress: certificates.filter((certificate) => certificate.status === "In Progress").length,
    }),
    [],
  );

  const visibleCertificates = useMemo(() => {
    const filtered =
      selectedCategories.length === 0
        ? certificates
        : certificates.filter((certificate) => selectedCategories.includes(certificate.category));

    return [...filtered].sort((a, b) => {
      if (sortBy === "Alphabetical") {
        return a.name.localeCompare(b.name);
      }

      if (sortBy === "Issuer") {
        return a.issuer.localeCompare(b.issuer);
      }

      return new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime();
    });
  }, [selectedCategories, sortBy]);

  function toggleCategory(category: CertificateCategory) {
    setSelectedCategories((current) =>
      current.includes(category) ? current.filter((item) => item !== category) : [...current, category],
    );
  }

  return (
    <main className="bg-bg-primary">
      <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-accent-primary">
              Credentials
            </p>
            <h1 className="font-display text-[clamp(3.4rem,10vw,8.5rem)] font-semibold leading-[0.84] tracking-[-0.06em]">
              Certificates
            </h1>
          </div>
          <div className="max-w-2xl lg:justify-self-end">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--accent-primary)_32%,var(--border))] bg-[color-mix(in_srgb,var(--accent-primary)_10%,transparent)] px-4 py-2 text-sm font-semibold text-text-primary">
              <ShieldCheck className="h-4 w-4 text-accent-primary" />
              {stats.total} total certificates
            </div>
            <p className="text-lg leading-relaxed text-text-secondary">
              A curated record of professional learning across cloud, data, web engineering, university work, and
              competitive problem solving.
            </p>
          </div>
        </div>

        <div className="mt-10 grid divide-y divide-border rounded-[var(--radius-md)] border border-border bg-bg-secondary sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            ["Total", stats.total],
            ["Valid", stats.valid],
            ["In Progress", stats.inProgress],
          ].map(([label, value]) => (
            <div key={label} className="px-5 py-5">
              <p className="font-display text-5xl font-semibold tracking-[-0.05em]">{value}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-bg-secondary">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-5 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-2 text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">Filter</span>
            {certificateCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => toggleCategory(category)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                  selectedCategories.includes(category)
                    ? "border-[var(--accent-primary)] bg-[var(--accent-primary)] text-[var(--bg-primary)]"
                    : "border-border bg-bg-primary text-text-secondary hover:border-[var(--accent-primary)] hover:text-text-primary",
                )}
              >
                {category}
              </button>
            ))}
            {selectedCategories.length > 0 ? (
              <button
                type="button"
                onClick={() => setSelectedCategories([])}
                className="rounded-full px-4 py-2 text-sm font-semibold text-accent-primary"
              >
                Clear
              </button>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
              <ArrowUpDown className="h-4 w-4" />
              Sort
            </span>
            {sortOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setSortBy(option)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                  sortBy === option
                    ? "border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--bg-primary)]"
                    : "border-border bg-bg-primary text-text-secondary hover:text-text-primary",
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
        {visibleCertificates.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visibleCertificates.map((certificate, index) => (
              <CertificateCard key={certificate.id} certificate={certificate} index={index} />
            ))}
          </div>
        ) : (
          <div className="rounded-[var(--radius-md)] border border-dashed border-[color-mix(in_srgb,var(--accent-primary)_35%,var(--border))] bg-bg-secondary px-6 py-16 text-center">
            <ShieldCheck className="mx-auto h-10 w-10 text-accent-primary" />
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.04em]">
              No real certificates added yet.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-text-secondary">
              The placeholder credentials have been cleared. Verified certificates will appear here once you provide the real details.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
