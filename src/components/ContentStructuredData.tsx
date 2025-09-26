"use client";

import { Helmet } from "react-helmet-async";
import { ContentItem } from "@/types/content";
import { generateStructuredData } from "@/utils/seoConfig";

interface ContentStructuredDataProps {
  content: ContentItem;
}

export const ContentStructuredData = ({ content }: ContentStructuredDataProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": content.title,
    "description": content.description,
    "datePublished": content.publishedAt,
    "author": {
      "@type": "Person",
      "name": content.author?.name || "ContentAI Author"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ContentAI",
      "logo": {
        "@type": "ImageObject",
        "url": "https://contentai-app.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://contentai-app.com/content/${content.id}`
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {generateStructuredData(structuredData)}
      </script>
    </Helmet>
  );
};