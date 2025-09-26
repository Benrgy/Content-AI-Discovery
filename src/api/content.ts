import { mockContent, mockAnalyticsData, mockGeneratedContent, mockGeneratedImages } from "@/data/mockContent";
import { ContentItem, AnalyticsData, ContentGenerationParams, GeneratedContent, GeneratedImage } from "@/types/content";

/**
 * Fetch content discovery data
 */
export const fetchContentDiscoveryData = async (): Promise<ContentItem[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        console.log("API: Fetching content data...", mockContent.length, "items");
        resolve([...mockContent]);
      } catch (error) {
        console.error("Error fetching content data:", error);
        reject(new Error("Failed to fetch content data"));
      }
    }, 500);
  });
};

/**
 * Fetch analytics data
 */
export const fetchAnalyticsData = async (): Promise<AnalyticsData> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // Simulate occasional error (1% chance)
        if (Math.random() < 0.01) {
          throw new Error("Analytics service temporarily unavailable");
        }
        console.log("API: Fetching analytics data...");
        resolve({ ...mockAnalyticsData });
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        reject(error);
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
      try {
        // Validate parameters
        if (!params.prompt || params.prompt.trim().length === 0) {
          throw new Error("Content prompt is required");
        }
        
        if (!params.platform) {
          throw new Error("Platform selection is required");
        }

        // Simulate occasional error (2% chance)
        if (Math.random() < 0.02) {
          throw new Error("Content generation service is temporarily busy. Please try again.");
        }

        const platform = params.platform;
        const mockData = mockGeneratedContent[platform as keyof typeof mockGeneratedContent];
        
        if (!mockData) {
          throw new Error(`Content generation not supported for platform: ${platform}`);
        }
        
        // Customize content based on parameters
        let content = mockData.content;
        
        // Apply tone modifications
        if (params.tone === "humorous") {
          content = content.replace(/productivity/gi, "HILARIOUS productivity 😂");
          content = content.replace(/strategies/gi, "laugh-out-loud strategies");
        } else if (params.tone === "inspirational") {
          content = content.replace(/productivity/gi, "LIFE-CHANGING productivity ✨");
          content = content.replace(/tips/gi, "transformational insights");
        } else if (params.tone === "casual") {
          content = content.replace(/\./g, "! 🎉");
          content = content.replace(/strategies/gi, "tricks");
        }
        
        // Apply length modifications
        if (params.length === "short" && content.length > 200) {
          content = content.substring(0, 200) + "...";
        } else if (params.length === "long" && platform !== "blog") {
          content = content + "\n\nBut wait, there's more! " + content.substring(0, 100) + "...";
        }
        
        // Customize based on prompt
        if (params.prompt.toLowerCase().includes("ai")) {
          content = content.replace(/productivity/gi, "AI-powered productivity");
        }
        
        const result: GeneratedContent = {
          id: `gen-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          platform,
          content,
          hashtags: params.includeHashtags ? [...(mockData.hashtags || [])] : undefined,
          cta: params.includeCTA ? mockData.cta : undefined,
          productionNotes: mockData.productionNotes,
          performanceEstimate: Math.floor(70 + Math.random() * 30)
        };
        
        console.log("API: Content generated successfully", result);
        resolve(result);
      } catch (error) {
        console.error("Error generating content:", error);
        reject(error);
      }
    }, 1500 + Math.random() * 1000);
  });
};

/**
 * Generate images
 */
export const generateImages = async (prompt: string): Promise<GeneratedImage[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // Validate prompt
        if (!prompt || prompt.trim().length === 0) {
          throw new Error("Image prompt cannot be empty");
        }

        // Simulate occasional error (2% chance)
        if (Math.random() < 0.02) {
          throw new Error("Image generation service is temporarily unavailable. Please try again.");
        }

        // Create variations of the mock images with the user's prompt
        const generatedImages = mockGeneratedImages.map((img, index) => ({
          ...img,
          id: `img-${Date.now()}-${index}`,
          prompt: prompt,
          alt: `Generated image: ${prompt}`
        }));

        console.log("API: Images generated successfully", generatedImages.length, "images");
        resolve(generatedImages);
      } catch (error) {
        console.error("Error generating images:", error);
        reject(error);
      }
    }, 2000 + Math.random() * 1000);
  });
};