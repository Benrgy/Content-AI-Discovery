export interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
}

export const seoConfigs: Record<string, SEOConfig> = {
  '/': {
    title: 'ContentAI - AI-Powered Content Discovery & Generation Platform',
    description: 'Discover viral trends and create platform-optimized content with our AI assistant. Find high-performing social media content and generate engaging posts.',
    keywords: 'content creation, AI content, social media, content discovery, viral content, content generation, marketing tools',
    ogTitle: 'ContentAI - Discover & Create Viral Content',
    ogDescription: 'AI-powered platform to discover trending content and generate optimized posts for all social platforms',
    twitterTitle: 'ContentAI - AI Content Discovery & Generation',
    twitterDescription: 'Discover viral trends and create optimized content with AI'
  },
  '/discover': {
    title: 'Content Discovery - Find Viral Content | ContentAI',
    description: 'Discover high-performing content across LinkedIn, TikTok, Twitter, Instagram, YouTube, and blogs with real engagement metrics.',
    keywords: 'content discovery, viral content, social media trends, content research, trending posts',
    ogTitle: 'Discover Viral Content - ContentAI',
    ogDescription: 'Find high-performing content across all major social platforms with engagement analytics',
    twitterTitle: 'Content Discovery - Find Trending Posts',
    twitterDescription: 'Discover viral content across multiple platforms with ContentAI'
  },
  '/generate': {
    title: 'AI Content Generation - Create Optimized Posts | ContentAI',
    description: 'Generate platform-specific content with advanced AI. Create posts for LinkedIn, TikTok, Twitter, Instagram, YouTube, and blogs with optimal formatting.',
    keywords: 'AI content generation, content creation, social media posts, automated content, AI writing',
    ogTitle: 'AI Content Generation - ContentAI',
    ogDescription: 'Create platform-optimized content with our advanced AI generation tools',
    twitterTitle: 'AI Content Generation Tool',
    twitterDescription: 'Generate optimized content for all social platforms with AI'
  },
  '/analytics': {
    title: 'Content Analytics Dashboard - Performance Metrics | ContentAI',
    description: 'Track engagement metrics, analyze content performance, and identify viral patterns across platforms with detailed analytics.',
    keywords: 'content analytics, performance metrics, engagement analysis, content insights, social media analytics',
    ogTitle: 'Content Analytics Dashboard - ContentAI',
    ogDescription: 'Analyze content performance and identify viral patterns with detailed metrics',
    twitterTitle: 'Content Performance Analytics',
    twitterDescription: 'Track and analyze content engagement metrics'
  },
  '/saved': {
    title: 'Saved Content - Your Bookmarked Posts | ContentAI',
    description: 'Access your saved content library with all bookmarked posts and generated content for easy reference and reuse.',
    keywords: 'saved content, bookmarks, content library, saved posts, content collection',
    ogTitle: 'Saved Content Library - ContentAI',
    ogDescription: 'Access your bookmarked content and generated posts in one place',
    twitterTitle: 'Saved Content Library',
    twitterDescription: 'Manage your bookmarked and generated content'
  },
  '/content/:id': {
    title: 'Content Details - Performance Analysis | ContentAI',
    description: 'Detailed analysis of content performance including engagement metrics, platform insights, and performance scores.',
    keywords: 'content details, performance analysis, engagement metrics, content insights',
    ogTitle: 'Content Performance Analysis - ContentAI',
    ogDescription: 'Detailed analysis of content performance and engagement metrics',
    twitterTitle: 'Content Performance Details',
    twitterDescription: 'Analyze detailed content performance metrics'
  }
};

export const getDefaultSEO = (): SEOConfig => seoConfigs['/'];