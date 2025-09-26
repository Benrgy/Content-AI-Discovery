export interface ContentItem {
  id: string;
  title: string;
  description: string;
  platform: string;
  category?: string;
  tags?: string[];
  performanceScore?: number;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    views?: number;
    engagementRate?: number;
  };
  imageUrl?: string;
  link: string;
  publishedAt?: string;
  author?: {
    name: string;
    avatar?: string;
    followers?: number;
  };
}

export interface AnalyticsData {
  totalEngagement: number;
  averagePerformanceScore: number;
  platformDistribution: Record<string, number>;
  topPerformingContent: ContentItem[];
  engagementOverTime: {
    date: string;
    value: number;
  }[];
  categoryPerformance: {
    category: string;
    performanceScore: number;
    count: number;
  }[];
}

export interface ContentGenerationParams {
  prompt: string;
  platform: string;
  tone: string;
  length: string;
  includeHashtags?: boolean;
  includeCTA?: boolean;
}

export interface GeneratedContent {
  id: string;
  platform: string;
  content: string;
  hashtags?: string[];
  cta?: string;
  productionNotes?: string;
  performanceEstimate?: number;
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  alt: string;
}