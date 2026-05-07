import type { Metadata } from "next";
import { CertificatesPageContent } from "../../../components/sections/certificates/CertificatesPageContent";
import { createSiteMetadata } from "../../../lib/seo";

export const metadata: Metadata = createSiteMetadata({
  title: "Certificates | Suthankan",
  description:
    "Professional certificates and learning credentials across cloud, data, web development, databases, university work, and competitive coding.",
  path: "/certificates",
});

export default function CertificatesPage() {
  return <CertificatesPageContent />;
}
