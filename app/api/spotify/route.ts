import { NextResponse } from "next/server";

// Spotify OAuth setup:
// 1. Create an app at https://developer.spotify.com/dashboard.
// 2. Add a local redirect URI, then request the user-read-currently-playing scope.
// 3. Exchange the authorization code for a refresh token.
// 4. Set SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, and SPOTIFY_REFRESH_TOKEN in Vercel.

export const runtime = "nodejs";
export const revalidate = 30;

type SpotifyTokenResponse = {
  access_token?: string;
  error?: string;
};

type SpotifyImage = {
  url: string;
};

type SpotifyArtist = {
  name: string;
};

type SpotifyTrack = {
  name: string;
  artists: SpotifyArtist[];
  external_urls?: {
    spotify?: string;
  };
  album?: {
    images?: SpotifyImage[];
  };
};

type SpotifyCurrentlyPlayingResponse = {
  is_playing?: boolean;
  item?: SpotifyTrack | null;
};

type NowPlayingPayload = {
  isPlaying: boolean;
  track: {
    name: string;
    artist: string;
    url?: string;
    albumImageUrl?: string;
  } | null;
  error?: string;
};

function json(payload: NowPlayingPayload, init?: ResponseInit) {
  return NextResponse.json(payload, {
    ...init,
    headers: {
      "Cache-Control": "s-maxage=30, stale-while-revalidate=60",
      ...init?.headers,
    },
  });
}

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return json({
      isPlaying: false,
      track: null,
      error: "Spotify is not configured.",
    });
  }

  try {
    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
      cache: "no-store",
    });

    if (!tokenResponse.ok) {
      return json({
        isPlaying: false,
        track: null,
        error: "Unable to refresh Spotify token.",
      });
    }

    const tokenData = (await tokenResponse.json()) as SpotifyTokenResponse;

    if (!tokenData.access_token) {
      return json({
        isPlaying: false,
        track: null,
        error: "Spotify token response did not include an access token.",
      });
    }

    const currentlyPlayingResponse = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
      next: {
        revalidate: 30,
      },
    });

    if (currentlyPlayingResponse.status === 204 || currentlyPlayingResponse.status === 202) {
      return json({
        isPlaying: false,
        track: null,
      });
    }

    if (!currentlyPlayingResponse.ok) {
      return json({
        isPlaying: false,
        track: null,
        error: "Unable to read Spotify now playing.",
      });
    }

    const playingData = (await currentlyPlayingResponse.json()) as SpotifyCurrentlyPlayingResponse;
    const item = playingData.item;

    if (!playingData.is_playing || !item) {
      return json({
        isPlaying: false,
        track: null,
      });
    }

    return json({
      isPlaying: true,
      track: {
        name: item.name,
        artist: item.artists.map((artist) => artist.name).join(", "),
        url: item.external_urls?.spotify,
        albumImageUrl: item.album?.images?.[0]?.url,
      },
    });
  } catch (error) {
    console.error("Spotify route error:", error);
    return json(
      {
        isPlaying: false,
        track: null,
        error: "Unable to read Spotify now playing.",
      },
      { status: 500 },
    );
  }
}
