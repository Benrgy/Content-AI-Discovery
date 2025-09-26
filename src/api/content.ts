import { mockContent, mockAnalyticsData, mockGeneratedContent, mockGeneratedImages } from "@/data/mockContent";
import { ContentItem, AnalyticsData, ContentGenerationParams, GeneratedContent, GeneratedImage } from "@/types/content";

/**
 * Simulates an API call to fetch content discovery data.
 * Includes a simulated delay and a random error chance.
 */
export const fetchContentDiscoveryData = async (): Promise<ContentItem[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate a random error for demonstration (1% chance)
      if (Math.random() < 0.01) {
        reject(new Error("Failed to fetch content. Please try again."));
      } else {
        resolve([...mockContent]); // Return a copy to avoid mutations
      }
    }, 500); // Simulate 500ms loading time
  });
};

/**
 * Simulates an API call to fetch analytics data.
 */
export const fetchAnalyticsData = async (): Promise<AnalyticsData> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate a random error for demonstration (1% chance)
      if (Math.random() < 0.01) {
        reject(new Error("Failed to fetch analytics data. Please try again."));
      } else {
        resolve({ ...mockAnalyticsData }); // Return a copy
      }
    }, 800); // Simulate 800ms loading time
  });
};

/**
 * Simulates an API call to generate content based on parameters.
 */
export const generateContent = async (params: ContentGenerationParams): Promise<GeneratedContent> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Validate parameters
      if (!params.prompt || !params.platform) {
        reject(new Error("Missing required parameters: prompt and platform"));
        return;
      }

      // Simulate a random error for demonstration (2% chance)
      if (Math.random() < 0.02) {
        reject(new Error("Failed to generate content. Please try again."));
        return;
      }

      const platform = params.platform;
      const mockData = mockGeneratedContent[platform as keyof typeof mockGeneratedContent];
      
      if (!mockData) {
        reject(new Error(`Content generation not supported for platform: ${platform}`));
        return;
      }
      
      // Adjust content based on tone and length
      let content = mockData.content;
      
      // Apply tone modifications
      if (params.tone === "humorous") {
        content = content.replace(/productivity/gi, "HILARIOUS productivity 😂");
      } else if (params.tone === "inspirational") {
        content = content.replace(/productivity/gi, "LIFE-CHANGING productivity ✨");
      } else if (params.tone === "casual") {
        content = content.replace(/\./g, "! 🎉");
      }
      
      // Apply length modifications
      if (params.length === "short" && content.length > 200) {
        content = content.substring(0, 200) + "...";
      } else if (params.length === "long" && platform !== "blog") {
        content = content + "\n\nBut wait, there's more! " + content.substring(0, 100) + "...";
      }
      
      resolve({
        id: `gen-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        platform,
        content,
        hashtags: params.includeHashtags ? [...(mockData.hashtags || [])] : undefined,
        cta: params.includeCTA ? mockData.cta : undefined,
        productionNotes: mockData.productionNotes,
        performanceEstimate: Math.floor(70 + Math.random() * 30) // Random score between 70-100
      });
    }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5 seconds
  });
};

/**
 * Simulates an API call to generate images based on a prompt.
 */
export const generateImages = async (prompt: string): Promise<GeneratedImage[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Validate prompt
      if (!prompt || prompt.trim().length === 0) {
        reject(new Error("Image prompt cannot be empty"));
        return;
      }

      // Simulate a random error for demonstration (2% chance)
      if (Math.random() < 0.02) {
        reject(new Error("Failed to generate images. Please try again."));
        return;
      }

      // Create variations of the mock images with the user's prompt
      const generatedImages = mockGeneratedImages.map((img, index) => ({
        ...img,
        id: `img-${Date.now()}-${index}`,
        prompt: prompt,
        alt: `Generated image: ${prompt}`
      }));

      resolve(generatedImages);
    }, 2000 + Math.random() * 1000); // Random delay between 2-3 seconds
  });
};