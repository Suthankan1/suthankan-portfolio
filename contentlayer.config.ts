import { defineDocumentType, makeSource } from "contentlayer2/source-files";

const BLOG_CATEGORIES = [
  "Case Study",
  "UI Engineering",
  "Backend",
  "Full-Stack",
  "Travel",
  "Personal Notes",
] as const;

function calculateReadingTime(rawContent: string): number {
  const words = rawContent.trim().split(/\s+/).filter(Boolean);
  return Math.max(1, Math.ceil(words.length / 200));
}

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "blog/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    date: {
      type: "date",
      required: true,
    },
    category: {
      type: "enum",
      options: [...BLOG_CATEGORIES],
      required: true,
    },
    tags: {
      type: "list",
      of: { type: "string" },
      required: true,
    },
    coverImage: {
      type: "string",
      default:
        "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1600&q=80",
    },
    excerpt: {
      type: "string",
      default: "",
    },
    featured: {
      type: "boolean",
      default: false,
    },
    published: {
      type: "boolean",
      default: true,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (post) => post._raw.flattenedPath.replace(/^blog\//, ""),
    },
    readingTime: {
      type: "number",
      resolve: (post) => calculateReadingTime(post.body.raw),
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
});
