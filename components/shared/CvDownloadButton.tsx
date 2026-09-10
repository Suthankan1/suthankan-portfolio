"use client";

import { useState, useRef, useEffect } from "react";
import { FileText, ChevronDown, ExternalLink, Download } from "lucide-react";
import { RESUME_LIST, type ResumeTrack } from "../../lib/cv";
import { Button } from "../ui/Button";

interface CvDownloadButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  align?: "left" | "right";
}

export function CvDownloadButton({
  variant = "ghost",
  size = "lg",
  className = "",
  align = "right",
}: CvDownloadButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      <Button
        variant={variant}
        size={size}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Download Curriculum Vitae options"
      >
        <span>Download CV</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </Button>

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className={`absolute z-50 mt-2 w-80 sm:w-96 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] backdrop-blur-xl shadow-2xl p-3 text-left animate-in fade-in zoom-in-95 duration-150 ${
            align === "left" ? "left-0" : "right-0"
          }`}
        >
          <div className="px-3 py-2 border-b border-[var(--border)] mb-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Curriculum Vitae Tracks
            </p>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Select a specialized resume tailored for your role
            </p>
          </div>

          <div className="space-y-2">
            {RESUME_LIST.map((track: ResumeTrack) => (
              <div
                key={track.id}
                className="group rounded-xl p-3 transition-colors duration-150 hover:bg-[color-mix(in_srgb,var(--text-primary)_4%,transparent)] border border-transparent hover:border-[var(--border)]"
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                      {track.title}
                    </h3>
                    <span className="inline-block mt-0.5 text-[11px] font-medium px-2 py-0.5 rounded-full bg-[color-mix(in_srgb,var(--accent-primary)_12%,transparent)] text-[var(--accent-primary)]">
                      {track.badge}
                    </span>
                  </div>
                  <FileText className="h-4 w-4 text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] transition-colors mt-0.5 shrink-0" />
                </div>

                <p className="text-xs text-[var(--text-secondary)] line-clamp-2 my-2 leading-relaxed">
                  {track.shortDescription}
                </p>

                <div className="flex items-center gap-2 pt-1">
                  {/* View in new tab */}
                  <a
                    href={track.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-[var(--border)] bg-transparent text-[var(--text-primary)] hover:border-[var(--accent-primary)] hover:bg-[color-mix(in_srgb,var(--accent-primary)_8%,transparent)] transition-colors"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Preview
                  </a>

                  {/* Direct download */}
                  <a
                    href={track.path}
                    download={track.filename}
                    onClick={() => setIsOpen(false)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[var(--accent-primary)] text-white hover:opacity-90 transition-opacity shadow-sm"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-2 pt-2 border-t border-[var(--border)] px-3 flex items-center justify-between text-[11px] text-[var(--text-muted)]">
            <span>Suthankan Balenthiran</span>
            <span>UoM IT · 2026</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default CvDownloadButton;
