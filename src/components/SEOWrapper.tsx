"use client";

import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { seoConfigs, getDefaultSEO, generateStructuredData } from "@/utils/seoConfig";
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
        {/* Basic Meta Tags */}
        <title>{seoConfig.title}</title>
        <meta name="description" content={seoConfig.description} />
        <meta name="keywords" content={seoConfig.keywords} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://contentai-app.com${location.pathname}`} />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={seoConfig.ogTitle} />
        <meta property="og:description" content={seoConfig.ogDescription} />
        <meta property="og:url" content={`https://contentai-app.com${location.pathname}`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://contentai-app.com/og-image.png" />
        <meta property="og:site_name" content="ContentAI" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:title" content={seoConfig.twitterTitle} />
        <meta name="twitter:description" content={seoConfig.twitterDescription} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@contentai_app" />
        <meta name="twitter:creator" content="@contentai_app" />
        <meta name="twitter:image" content="https://contentai-app.com/twitter-image.png" />
        
        {/* Additional Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="apple-mobile-web-app-title" content="ContentAI" />
        <meta name="application-name" content="ContentAI" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        
        {/* Structured Data (JSON-LD) */}
        {seoConfig.structuredData && (
          <script type="application/ld+json">
            {generateStructuredData(seoConfig.structuredData)}
          </script>
        )}
        
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Helmet>
      {children}
    </>
  );
};