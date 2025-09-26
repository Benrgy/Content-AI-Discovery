import { mockContent, mockAnalyticsData, mockGeneratedContent, mockGeneratedImages } from "@/data/mockContent";
import { ContentItem, AnalyticsData, ContentGenerationParams, GeneratedContent, GeneratedImage } from "@/types/content";

/**
 * Simulates an API call to fetch content discovery data.
 * Includes a simulated delay and a random error chance.
 */
export const fetchContentDiscoveryData = async (): Promise<ContentItem[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate a random error for demonstration (5% chance)
      if (Math.random() < 0.05) {
        reject(new Error("Failed to fetch content. Please try again."));
      } else {
        resolve(mockContent);
      }
    }, 1000); // Simulate 1 second loading time
  });
};

/**
 * Simulates an API call to fetch analytics data.
 */
export const fetchAnalyticsData = async (): Promise<AnalyticsData> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate a random error for demonstration (5% chance)
      if (Math.random() < 0.05) {
        reject(new Error("Failed to fetch analytics data. Please try again."));
      } else {
        resolve(mockAnalyticsData);
      }
    }, 1500); // Simulate 1.5 second loading time
  });
};

/**
 * Simulates an API call to generate content based on parameters.
 */
export const generateContent = async (params: ContentGenerationParams): Promise<GeneratedContent> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate a random error for demonstration (5% chance)
      if (Math.random() < 0.05) {
        reject(new Error("Failed to generate content. Please try again."));
      } else {
        const platform = params.platform;
        const mockData = mockGeneratedContent[platform as keyof typeof mockGeneratedContent];
        
        if (!mockData) {
          reject(new Error(`No mock data available for platform: ${platform}`));
          return;
        }
        
        // Adjust content based on tone and length
        let content = mockData.content;
        if (params.tone === "humorous") {
          content = content.replace("productivity hacks", "HILARIOUS productivity hacks 😂");
        } else if (params.tone === "inspirational") {
          content = content.replace("productivity hacks", "LIFE-CHANGING productivity hacks ✨");
        }
        
        if (params.length === "short" && content.length > 200) {
          content = content.substring(0, 200) + "...";
        } else if (params.length === "long" && platform !== "blog") {
          content = content + "\n\nBut wait, there's more! " + content.substring(0, 100);
        }
        
        resolve({
          id: `gen-${Date.now()}`,
          platform,
          content,
          hashtags: params.includeHashtags ? mockData.hashtags : undefined,
          cta: params.includeCTA ? mockData.cta : undefined,
          productionNotes: mockData.productionNotes,
          performanceEstimate: Math.floor(70 + Math.random() * 30) // Random score between 70-100
        });
      }
    }, 2000); // Simulate 2 second generation time
  });
};

/**
 * Simulates an API call to generate images based on a prompt.
 */
export const generateImages = async (prompt: string): Promise<GeneratedImage[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate a random error for demonstration (5% chance)
      if (Math.random() < 0.05) {
        reject(new Error("Failed to generate images. Please try again."));
      } else {
        resolve(mockGeneratedImages);
      }
    }, 3000); // Simulate 3 second generation time
  });
};