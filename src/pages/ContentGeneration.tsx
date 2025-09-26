"use client";

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useContentGeneration, useImageGeneration } from "@/hooks/use-content-generation";
import { useContentDiscoveryData } from "@/hooks/use-content-discovery-data";
import { useSavedContent } from "@/hooks/use-saved-content";
import { useGenerationHistory } from "@/hooks/use-generation-history";
import { showSuccess, showError } from "@/utils/toast";
import PageLayout from "@/components/PageLayout";
import ContentGenerationForm from "@/components/ContentGenerationForm";
import SavedContentSidebar from "@/components/SavedContentSidebar";
import GeneratedContentDisplay from "@/components/GeneratedContentDisplay";
import ContentRecommendations from "@/components/ContentRecommendations";
import ContentGenerationHistory from "@/components/ContentGenerationHistory";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ContentItem, GeneratedContent, GeneratedImage } from "@/types/content";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, History, Bookmark } from "lucide-react";

const ContentGeneration = () => {
  console.log("ContentGeneration: Component rendering");
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Add loading states and error handling
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { data: contentData, isLoading: isContentLoading, error: contentError } = useContentDiscoveryData();
  const { savedItems } = useSavedContent();
  const { history, addToHistory, removeFromHistory } = useGenerationHistory();
  
  const queryParams = new URLSearchParams(location.search);
  const contentIdFromUrl = queryParams.get("contentId");
  
  const [activeTab, setActiveTab] = useState("content");
  const [sidebarTab, setSidebarTab] = useState("saved");
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [referenceContent, setReferenceContent] = useState<ContentItem | null>(null);
  
  const contentMutation = useContentGeneration();
  const imageMutation = useImageGeneration();
  
  // Initialize the component
  useEffect(() => {
    try {
      console.log("ContentGeneration component initializing...");
      console.log("Location:", location.pathname);
      console.log("Search params:", location.search);
      console.log("Content ID from URL:", contentIdFromUrl);
      
      setIsInitializing(false);
    } catch (err) {
      console.error("Error initializing ContentGeneration:", err);
      setError("Failed to initialize content generation page");
      setIsInitializing(false);
    }
  }, [location, contentIdFromUrl]);
  
  // Handle URL parameter for content reference
  useEffect(() => {
    if (contentIdFromUrl && contentData && !isContentLoading) {
      try {
        console.log("Looking for content with ID:", contentIdFromUrl);
        console.log("Available content:", contentData.map(c => c.id));
        
        const content = contentData.find(item => item.id === contentIdFromUrl);
        if (content) {
          console.log("Setting reference content:", content.title);
          setReferenceContent(content);
          // Clean up URL without the contentId parameter
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.delete("contentId");
          navigate(newUrl.pathname + newUrl.search, { replace: true });
        } else {
          console.warn("Content not found for ID:", contentIdFromUrl);
        }
      } catch (err) {
        console.error("Error setting reference content:", err);
      }
    }
  }, [contentIdFromUrl, contentData, isContentLoading, navigate]);
  
  const handleGenerateContent = async (formData: {
    prompt: string;
    platform: string;
    tone: string;
    length: string;
    includeHashtags: boolean;
    includeCTA: boolean;
  }) => {
    try {
      console.log("Generating content with data:", formData);
      const result = await contentMutation.mutateAsync(formData);
      console.log("Content generated successfully:", result);
      setGeneratedContent(result);
      addToHistory(result);
      setActiveTab("content");
      showSuccess("Content generated successfully!");
    } catch (error: any) {
      console.error("Content generation error:", error);
      showError(error.message || "Failed to generate content. Please try again.");
    }
  };
  
  const handleGenerateImages = async (imagePrompt: string) => {
    try {
      console.log("Generating images with prompt:", imagePrompt);
      const result = await imageMutation.mutateAsync(imagePrompt);
      console.log("Images generated successfully:", result);
      setGeneratedImages(result);
      setActiveTab("images");
      showSuccess("Images generated successfully!");
    } catch (error: any) {
      console.error("Image generation error:", error);
      showError(error.message || "Failed to generate images. Please try again.");
    }
  };
  
  const handleClearReference = () => {
    setReferenceContent(null);
    navigate("/generate", { replace: true });
  };
  
  const handleSelectReference = (item: ContentItem) => {
    setReferenceContent(item);
  };
  
  const handleClearAll = () => {
    setGeneratedContent(null);
    setGeneratedImages([]);
  };
  
  const handleClearGeneratedContent = () => {
    setGeneratedContent(null);
  };
  
  const handleRegenerateFromHistory = (content: GeneratedContent) => {
    const formData = {
      prompt: `Create similar content to: "${content.content.substring(0, 100)}..."`,
      platform: content.platform,
      tone: "professional",
      length: "medium",
      includeHashtags: !!content.hashtags,
      includeCTA: !!content.cta
    };
    
    handleGenerateContent(formData);
  };
  
  const getRecommendations = (): ContentItem[] => {
    if (!contentData) return [];
    
    if (referenceContent) {
      return contentData
        .filter(item => 
          item.id !== referenceContent.id && 
          (item.platform === referenceContent.platform || item.category === referenceContent.category)
        )
        .slice(0, 3);
    }
    
    return contentData
      .sort((a, b) => (b.performanceScore || 0) - (a.performanceScore || 0))
      .slice(0, 3);
  };
  
  // Show loading state
  if (isInitializing || isContentLoading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingSpinner size="lg" text="Loading content generation..." />
        </div>
      </PageLayout>
    );
  }
  
  // Show error state
  if (error || contentError) {
    return (
      <PageLayout
        title="Error Loading Page"
        description="There was an issue loading the content generation page."
      >
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || contentError?.message}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-primary text-primary-foreground rounded"
          >
            Reload Page
          </button>
        </div>
      </PageLayout>
    );
  }
  
  return (
    <PageLayout
      className="items-center"
      title="AI Content Generation"
      description="Create platform-optimized content with advanced AI generation capabilities."
    >
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ContentGenerationForm
            onGenerateContent={handleGenerateContent}
            onGenerateImages={handleGenerateImages}
            onClearReference={handleClearReference}
            referenceContent={referenceContent}
            isGeneratingContent={contentMutation.isPending}
            isGeneratingImages={imageMutation.isPending}
          />
        </div>
        
        <div className="lg:col-span-1">
          <Tabs value={sidebarTab} onValueChange={setSidebarTab}>
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="saved" className="flex items-center gap-1">
                <Bookmark className="h-4 w-4" />
                <span>Saved ({savedItems.length})</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-1">
                <History className="h-4 w-4" />
                <span>History ({history.length})</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="saved" className="mt-0">
              <SavedContentSidebar
                savedItems={savedItems}
                onSelectReference={handleSelectReference}
              />
            </TabsContent>
            
            <TabsContent value="history" className="mt-0">
              <ContentGenerationHistory
                history={history}
                onRegenerate={handleRegenerateFromHistory}
                onDelete={removeFromHistory}
              />
            </TabsContent>
          </Tabs>
          
          <div className="mt-6">
            <ContentRecommendations
              title="Content Inspiration"
              description="High-performing content to inspire your creation"
              recommendations={getRecommendations()}
              onViewDetails={handleSelectReference}
            />
          </div>
        </div>
      </div>
      
      {(generatedContent || generatedImages.length > 0) && (
        <GeneratedContentDisplay
          generatedContent={generatedContent}
          generatedImages={generatedImages}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onClearAll={handleClearAll}
          onClearContent={handleClearGeneratedContent}
          onRegenerateContent={() => {
            if (generatedContent) {
              handleGenerateContent({
                prompt: "Regenerate with different wording but same topic",
                platform: generatedContent.platform,
                tone: "professional",
                length: "medium",
                includeHashtags: !!generatedContent.hashtags,
                includeCTA: !!generatedContent.cta
              });
            }
          }}
          onRegenerateImages={() => {
            if (generatedImages.length > 0) {
              handleGenerateImages(generatedImages[0].prompt);
            }
          }}
          isRegeneratingContent={contentMutation.isPending}
          isRegeneratingImages={imageMutation.isPending}
        />
      )}
    </PageLayout>
  );
};

export default ContentGeneration;