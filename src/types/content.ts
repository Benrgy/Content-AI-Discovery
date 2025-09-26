export interface ContentItem {
  id: string;
  title: string;
  description: string;
  platform: string;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    views?: number;
  };
  imageUrl?: string;
  link: string;
}