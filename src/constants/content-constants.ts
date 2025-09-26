"use client";

import {
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Rss,
  Play,
  BarChart,
  Clock,
  Hash,
  Lightbulb,
  Megaphone,
  Heart,
  type LucideIcon
} from "lucide-react";

export const contentPlatforms = [
  { value: "linkedin", label: "LinkedIn" },
  { value: "tiktok", label: "TikTok" },
  { value: "twitter", label: "Twitter" },
  { value: "instagram", label: "Instagram" },
  { value: "youtube", label: "YouTube" },
  { value: "blog", label: "Blog Post" },
];

export const contentCategories = [
  { value: "productivity", label: "Productivity" },
  { value: "social media", label: "Social Media" },
  { value: "marketing", label: "Marketing" },
  { value: "technology", label: "Technology" },
  { value: "health", label: "Health & Wellness" },
  { value: "content creation", label: "Content Creation" },
  { value: "personal branding", label: "Personal Branding" },
  { value: "psychology", label: "Psychology" },
];

export const contentTones = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "humorous", label: "Humorous" },
  { value: "informative", label: "Informative" },
  { value: "inspirational", label: "Inspirational" },
  { value: "controversial", label: "Controversial" },
  { value: "educational", label: "Educational" },
  { value: "storytelling", label: "Storytelling" },
];

export const contentLengths = [
  { value: "short", label: "Short" },
  { value: "medium", label: "Medium" },
  { value: "long", label: "Long" },
];

export const platformIconMap: { [key: string]: LucideIcon } = {
  linkedin: Linkedin,
  tiktok: Play,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  blog: Rss,
};

export const categoryIconMap: { [key: string]: LucideIcon } = {
  productivity: Clock,
  "social media": Hash,
  marketing: Megaphone,
  technology: Lightbulb,
  health: Heart,
  "content creation": Play,
  "personal branding": Linkedin,
  psychology: BarChart,
};

export const performanceScoreColors = {
  high: "text-green-500",
  medium: "text-amber-500",
  low: "text-red-500"
};

export const getPerformanceColor = (score: number): string => {
  if (score >= 85) return performanceScoreColors.high;
  if (score >= 70) return performanceScoreColors.medium;
  return performanceScoreColors.low;
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};