import { allPosts } from "contentlayer/generated";

const SITE_URL = "https://suthankan.dev";

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function cdata(value: string): string {
  return value.replaceAll("]]>", "]]]]><![CDATA[>");
}

export function GET() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Suthankan Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Engineering notes, case studies, and editorial writing from Suthankan.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    ${posts
      .map((post) => {
        const url = `${SITE_URL}/blog/${post.slug}`;

        return `<item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      ${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("\n      ")}
      <content:encoded><![CDATA[${cdata(post.body.raw)}]]></content:encoded>
    </item>`;
      })
      .join("\n    ")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
