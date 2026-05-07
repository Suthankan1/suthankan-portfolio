"use client";

import { useEffect, useState } from "react";
import { Music2 } from "lucide-react";
import { cn } from "../../lib/utils";

type NowPlayingResponse = {
  isPlaying: boolean;
  track: {
    name: string;
    artist: string;
    url?: string;
    albumImageUrl?: string;
  } | null;
  error?: string;
};

export function NowPlaying() {
  const [data, setData] = useState<NowPlayingResponse | null>(null);

  useEffect(() => {
    let active = true;

    async function loadNowPlaying() {
      try {
        const response = await fetch("/api/spotify");
        const payload = (await response.json()) as NowPlayingResponse;

        if (active) {
          setData(payload);
        }
      } catch {
        if (active) {
          setData({
            isPlaying: false,
            track: null,
            error: "Unable to load Spotify.",
          });
        }
      }
    }

    void loadNowPlaying();

    return () => {
      active = false;
    };
  }, []);

  const content = data?.isPlaying && data.track ? (
    <>
      <span className="truncate font-medium text-text-primary">{data.track.name}</span>
      <span className="truncate text-text-muted">by {data.track.artist}</span>
    </>
  ) : (
    <>
      <span className="font-medium text-text-primary">Not playing</span>
      <span className="text-text-muted">Spotify is quiet right now</span>
    </>
  );

  const className = cn(
    "group flex w-full max-w-xs items-center gap-3 rounded-lg border border-border bg-bg-primary/70 px-3 py-3 text-left text-xs shadow-sm backdrop-blur-xl transition hover:border-accent-primary/60",
  );

  if (data?.isPlaying && data.track?.url) {
    return (
      <a href={data.track.url} target="_blank" rel="noopener noreferrer" className={className}>
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[color-mix(in_srgb,var(--accent-primary)_12%,transparent)] text-accent-primary">
          <Music2 className="h-4 w-4" />
        </span>
        <span className="grid min-w-0 gap-0.5">{content}</span>
      </a>
    );
  }

  return (
    <div className={className} aria-live="polite">
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[color-mix(in_srgb,var(--accent-primary)_12%,transparent)] text-accent-primary">
        <Music2 className="h-4 w-4" />
      </span>
      <span className="grid min-w-0 gap-0.5">{content}</span>
    </div>
  );
}
