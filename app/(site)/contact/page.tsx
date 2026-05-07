import type { Metadata } from "next";
import { ContactPageContent } from "../../../components/sections/contact/ContactPageContent";
import { createSiteMetadata } from "../../../lib/seo";

export const metadata: Metadata = createSiteMetadata({
  title: "Let's talk",
  description:
    "Get in touch with Suthankan for job opportunities, freelance projects, collaborations, and technical discussions.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactPageContent />;
}
