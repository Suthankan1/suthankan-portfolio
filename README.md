# Suthankan Portfolio

Premium editorial portfolio for Suthankan: IT undergraduate, full-stack developer, technical writer, and traveller from Sri Lanka. The site is built to showcase serious engineering depth through case studies, MDX writing, travel journals, certificates, services, and a polished contact funnel.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 App Router |
| Language | TypeScript strict mode |
| Styling | Tailwind CSS v4 with CSS variables |
| Animation | Framer Motion |
| Content | MDX with Contentlayer2 |
| Search | Fuse.js |
| Email | Resend |
| Counters | Upstash Redis |
| Media | Next/Image, Unsplash, Cloudinary-ready |
| Comments | Giscus |
| Analytics | Vercel Analytics |
| OG Images | Satori on Vercel Edge |
| Deployment | Vercel, Singapore region |

## Local Setup

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev
npm run lint
npm run type-check
npm run build
npm run start
```

Run bundle analysis with:

```bash
ANALYZE=true npm run build
```

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill only the services you use.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL, for metadata and feeds |
| `RESEND_API_KEY` | Contact form email delivery |
| `CONTACT_TO_EMAIL` | Inbox that receives contact form submissions |
| `CONTACT_FROM_EMAIL` | Verified sender address for contact form emails |
| `RESEND_AUDIENCE_ID` | Resend audience ID for newsletter subscribers |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST endpoint for counters |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST token for counters |
| `NEXT_PUBLIC_GISCUS_REPO` | GitHub repo used by Giscus comments |
| `NEXT_PUBLIC_GISCUS_REPO_ID` | Giscus repository ID |
| `NEXT_PUBLIC_GISCUS_CATEGORY` | Giscus discussion category |
| `NEXT_PUBLIC_GISCUS_CATEGORY_ID` | Giscus category ID |
| `CLOUDINARY_CLOUD_NAME` | Optional Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Optional Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Optional Cloudinary API secret |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps key for travel embeds |
| `CALENDLY_URL` | Booking URL for service calls |
| `SPOTIFY_CLIENT_ID` | Spotify app client ID for now playing |
| `SPOTIFY_CLIENT_SECRET` | Spotify app client secret for now playing |
| `SPOTIFY_REFRESH_TOKEN` | Spotify refresh token with `user-read-currently-playing` scope |
| `WAKATIME_USERNAME` | WakaTime username for coding stats |
| `WAKATIME_API_KEY` | WakaTime API key for stats reads |

Never commit real `.env.local` values.

## Deployment

This project is configured for Vercel through `vercel.json`.

- Build command: `npm run build`
- Preferred function region: `sin1` for low-latency access from Sri Lanka and South Asia
- `www.suthankan.dev` redirects permanently to `suthankan.dev`
- Static assets are cached for one year
- HTML/page responses are marked `no-cache`
- Security headers are set in both `next.config.ts` and `vercel.json`

Before deploying:

```bash
npm run lint
npm run type-check
npm run build
```

## Content

Blog posts live in `content/blog` as MDX and are typed by `contentlayer.config.ts`. Project and travel data currently live in `lib/data`.

## Contact

Suthankan  
Email: `Suthankanbala2019@gmail.com`  
Phone: `+94 71 938 6979`  
GitHub: `https://github.com/Suthankan1`  
LinkedIn: `https://www.linkedin.com/in/suthankan/`
