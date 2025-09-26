"use client";

import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { seoConfigs, getDefaultSEO } from "@/utils/seoConfig";
import { useEffect } from "react";

export const SEOWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  // Get the base path without parameters for SEO config lookup
  const basePath = location.pathname.split('/').slice(0, 2).join('/') || '/';
  const seoConfig = seoConfigs[basePath] || getDefaultSEO();

  // Update document title immediately for better UX
  useEffect(() => {
    document.title = seoConfig.title;
  }, [seoConfig.title]);

  return (
    <>
      <Helmet>
        <title>{seoConfig.title}</title>
        <meta name="description" content={seoConfig.description} />
        <meta name="keywords" content={seoConfig.keywords} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://contentai-app.com${location.pathname}`} />
        
        <meta property="og:title" content={seoConfig.ogTitle} />
        <meta property="og:description" content={seoConfig.ogDescription} />
        <meta property="og:url" content={`https://contentai-app.com${location.pathname}`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://contentai-app.com/og-image.png" />
        
        <meta name="twitter:title" content={seoConfig.twitterTitle} />
        <meta name="twitter:description" content={seoConfig.twitterDescription} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@contentai_app" />
        <meta name="twitter:image" content="https://contentai-app.com/twitter-image.png" />
      </Helmet>
      {children}
    </>
  );
};