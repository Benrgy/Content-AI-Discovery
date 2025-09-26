import { mockContent, mockAnalyticsData, mockGeneratedContent, mockGeneratedImages } from "@/data/mockContent";
import { ContentItem, AnalyticsData, ContentGenerationParams, GeneratedContent, GeneratedImage } from "@/types/content";

export const fetchContentDiscoveryData = async (): Promise<ContentItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("✅ API: Content data loaded successfully");
      resolve([...mockContent]);
    }, 300);
  });
};

export const fetchAnalyticsData = async (): Promise<AnalyticsData> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.02) {
        reject(new Error("Failed to load analytics"));
        return;
      }
      console.log("✅ API: Analytics data loaded successfully");
      resolve({ ...mockAnalyticsData });
    }, 500);
  });
};

export const generateContent = async (params: ContentGenerationParams): Promise<GeneratedContent> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!params.prompt?.trim()) {
        reject(new Error("Content prompt is required"));
        return;
      }
      
      if (!params.platform) {
        reject(new Error("Platform selection is required"));
        return;
      }

      const platform = params.platform;
      const mockData = mockGeneratedContent[platform as keyof typeof mockGeneratedContent];
      
      if (!mockData) {
        reject(new Error(`Platform ${platform} not supported`));
        return;
      }
      
      let content = mockData.content;
      
      // Apply customizations
      if (params.tone === "humorous") {
        content = content.replace(/productivity/gi, "HILARIOUS productivity 😂");
      } else if (params.tone === "inspirational") {
        content = content.replace(/productivity/gi, "LIFE-CHANGING productivity ✨");
      }
      
      if (params.length === "short" && content.length > 200) {
        content = content.substring(0, 200) + "...";
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
      
      console.log("✅ API: Content generated successfully");
      resolve(result);
    }, 1500);
  });
};

export const generateImages = async (prompt: string): Promise<GeneratedImage[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!prompt?.trim()) {
        reject(new Error("Image prompt is required"));
        return;
      }

      const generatedImages = mockGeneratedImages.map((img, index) => ({
        ...img,
        id: `img-${Date.now()}-${index}`,
        prompt: prompt,
        alt: `Generated image: ${prompt}`
      }));

      console.log("✅ API: Images generated successfully");
      resolve(generatedImages);
    }, 2000);
  });
};