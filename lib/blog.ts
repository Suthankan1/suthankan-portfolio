export type TocHeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

export function slugifyHeading(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function extractTocHeadings(rawContent: string): TocHeading[] {
  const headings: TocHeading[] = [];
  const headingPattern = /^(##|###)\s+(.+)$/gm;

  for (const match of rawContent.matchAll(headingPattern)) {
    const marker = match[1];
    const text = match[2]?.replace(/[`*_~]/g, "").trim();

    if (!text) {
      continue;
    }

    headings.push({
      id: slugifyHeading(text),
      text,
      level: marker === "##" ? 2 : 3,
    });
  }

  return headings;
}

export function formatPostDate(date: string): string {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}
