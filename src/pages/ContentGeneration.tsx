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
import { ContentItem, GeneratedContent, GeneratedImage } from "@/types/content";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, History, Bookmark } from "lucide-react";

const ContentGeneration = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: contentData } = useContentDiscoveryData();
  const { savedItems } = useSavedContent();
  const { history, addToHistory, removeFromHistory } = useGenerationHistory();
  
  // Get contentId from URL query params
  const queryParams = new URLSearchParams(location.search);
  const contentIdFromUrl = queryParams.get("contentId");
  
  // Result state
  const [activeTab, setActiveTab] = useState("content");
  const [sidebarTab, setSidebarTab] = useState("saved");
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  
  // Reference content
  const [referenceContent, setReferenceContent] = useState<ContentItem | null>(null);
  
  // Mutations
  const contentMutation = useContentGeneration();
  const imageMutation = useImageGeneration();
  
  // Set reference content from URL param
  useEffect(() => {
    if (contentIdFromUrl && contentData) {
      const content = contentData.find(item => item.id === contentIdFromUrl);
      if (content) {
        setReferenceContent(content);
      }
    }
  }, [contentIdFromUrl, contentData]);
  
  // Handle content generation
  const handleGenerateContent = async (formData: {
    prompt: string;
    platform: string;
    tone: string;
    length: string;
    includeHashtags: boolean;
    includeCTA: boolean;
  }) => {
    try {
      const result = await contentMutation.mutateAsync(formData);
      setGeneratedContent(result);
      addToHistory(result);
      showSuccess("Content generated successfully!");
    } catch (error) {
      showError("Failed to generate content. Please try again.");
    }
  };
  
  // Handle image generation
  const handleGenerateImages = async (imagePrompt: string) => {
    try {
      const result = await imageMutation.mutateAsync(imagePrompt);
      setGeneratedImages(result);
      showSuccess("Images generated successfully!");
    } catch (error) {
      showError("Failed to generate images. Please try again.");
    }
  };
  
  // Handle clear reference
  const handleClearReference = () => {
    setReferenceContent(null);
    navigate("/generate", { replace: true });
  };
  
  // Handle select reference
  const handleSelectReference = (item: ContentItem) => {
    setReferenceContent(item);
  };
  
  // Handle clear all generated content
  const handleClearAll = () => {
    setGeneratedContent(null);
    setGeneratedImages([]);
  };
  
  // Handle clear generated content
  const handleClearGeneratedContent = () => {
    setGeneratedContent(null);
  };
  
  // Handle regenerate from history
  const handleRegenerateFromHistory = (content: GeneratedContent) => {
    handleGenerateContent({
      prompt: `Regenerate similar content to: "${content.content.substring(0, 100)}..."`,
      platform: content.platform,
      tone: "professional", // Default
      length: "medium", // Default
      includeHashtags: !!content.hashtags,
      includeCTA: !!content.cta
    });
  };
  
  // Get content recommendations
  const getRecommendations = (): ContentItem[] => {
    if (!contentData) return [];
    
    // If we have reference content, recommend similar content
    if (referenceContent) {
      return contentData
        .filter(item => 
          item.id !== referenceContent.id && 
          (item.platform === referenceContent.platform || item.category === referenceContent.category)
        )
        .slice(0, 3);
    }
    
    // Otherwise, recommend top performing content
    return contentData
      .sort((a, b) => (b.performanceScore || 0) - (a.performanceScore || 0))
      .slice(0, 3);
  };
  
  return (
    <PageLayout
      className="items-center"
      title="AI Content Generation"
      description="Create platform-optimized content with advanced AI generation capabilities."
    >
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Generation Form */}
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
        
        {/* Right Column - Sidebar with tabs */}
        <div className="lg:col-span-1">
          <Tabs value={sidebarTab} onValueChange={setSidebarTab}>
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="saved" className="flex items-center gap-1">
                <Bookmark className="h-4 w-4" />
                <span>Saved</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-1">
                <History className="h-4 w-4" />
                <span>History</span>
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
          
          {/* Content Recommendations */}
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
      
      {/* Generated Content Display */}
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
              tone: "professional", // Default
              length: "medium", // Default
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
    </PageLayout>
  );
};

export default ContentGeneration;