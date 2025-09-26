import { mockContent, mockAnalyticsData, mockGeneratedContent, mockGeneratedImages } from "@/data/mockContent";
import { ContentItem, AnalyticsData, ContentGenerationParams, GeneratedContent, GeneratedImage } from "@/types/content";

/**
 * Fetch content discovery data
 */
export const fetchContentDiscoveryData = async (): Promise<ContentItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("API: Fetching content data...", mockContent.length, "items");
      resolve([...mockContent]);
    }, 300);
  });
};

/**
 * Fetch analytics data
 */
export const fetchAnalyticsData = async (): Promise<AnalyticsData> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.02) {
        reject(new Error("Failed to fetch analytics data"));
      } else {
        resolve({ ...mockAnalyticsData });
      }
    }, 800);
  });
};

/**
 * Generate content
 */
export const generateContent = async (params: ContentGenerationParams): Promise<GeneratedContent> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!params.prompt || !params.platform) {
        reject(new Error("Missing required parameters"));
        return;
      }

      if (Math.random() < 0.02) {
        reject(new Error("Failed to generate content"));
        return;
      }

      const platform = params.platform;
      const mockData = mockGeneratedContent[platform as keyof typeof mockGeneratedContent];
      
      if (!mockData) {
        reject(new Error(`Platform not supported: ${platform}`));
        return;
      }
      
      let content = mockData.content;
      
      if (params.tone === "humorous") {
        content = content.replace(/productivity/gi, "HILARIOUS productivity 😂");
      } else if (params.tone === "inspirational") {
        content = content.replace(/productivity/gi, "LIFE-CHANGING productivity ✨");
      }
      
      if (params.length === "short" && content.length > 200) {
        content = content.substring(0, 200) + "...";
      }
      
      resolve({
        id: `gen-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        platform,
        content,
        hashtags: params.includeHashtags ? [...(mockData.hashtags || [])] : undefined,
        cta: params.includeCTA ? mockData.cta : undefined,
        productionNotes: mockData.productionNotes,
        performanceEstimate: Math.floor(70 + Math.random() * 30)
      });
    }, 1500);
  });
};

/**
 * Generate images
 */
export const generateImages = async (prompt: string): Promise<GeneratedImage[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!prompt?.trim()) {
        reject(new Error("Image prompt cannot be empty"));
        return;
      }

      if (Math.random() < 0.02) {
        reject(new Error("Failed to generate images"));
        return;
      }

      const generatedImages = mockGeneratedImages.map((img, index) => ({
        ...img,
        id: `img-${Date.now()}-${index}`,
        prompt: prompt,
        alt: `Generated image: ${prompt}`
      }));

      resolve(generatedImages);
    }, 2000);
  });
};