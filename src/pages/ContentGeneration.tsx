"use client";

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Copy, 
  XCircle, 
  Loader2, 
  Image as ImageIcon, 
  FileText, 
  Download, 
  RefreshCw, 
  Sparkles,
  Wand2,
  Share2,
  BookmarkPlus
} from "lucide-react";
import { showSuccess, showInfo, showError } from "@/utils/toast";
import { 
  contentPlatforms, 
  contentTones, 
  contentLengths, 
  platformIconMap 
} from "@/constants/content-constants";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useContentGeneration, useImageGeneration } from "@/hooks/use-content-generation";
import { useContentDiscoveryData } from "@/hooks/use-content-discovery-data";
import { useSavedContent } from "@/hooks/use-saved-content";
import PageLayout from "@/components/PageLayout";
import { ContentItem, GeneratedContent, GeneratedImage } from "@/types/content";

const ContentGeneration = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: contentData } = useContentDiscoveryData();
  const { savedItems } = useSavedContent();
  
  // Get contentId from URL query params
  const queryParams = new URLSearchParams(location.search);
  const contentIdFromUrl = queryParams.get("contentId");
  
  // Form state
  const [prompt, setPrompt] = useState("");
  const [platform, setPlatform] = useState("linkedin");
  const [tone, setTone] = useState("professional");
  const [length, setLength] = useState("medium");
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [includeCTA, setIncludeCTA] = useState(true);
  const [imagePrompt, setImagePrompt] = useState("");
  
  // Result state
  const [activeTab, setActiveTab] = useState("content");
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
        // Pre-fill form based on reference content
        setPrompt(`Create content inspired by: "${content.title}"`);
        setPlatform(content.platform);
        setImagePrompt(`Create an image for: ${content.title}`);
      }
    }
  }, [contentIdFromUrl, contentData]);
  
  // Handle content generation
  const handleGenerateContent = async () => {
    if (!prompt.trim()) {
      showError("Please enter a content prompt");
      return;
    }
    
    try {
      const result = await contentMutation.mutateAsync({
        prompt,
        platform,
        tone,
        length,
        includeHashtags,
        includeCTA
      });
      
      setGeneratedContent(result);
      showSuccess("Content generated successfully!");
      
      // Auto-generate images if we're generating content for the first time
      if (!generatedImages.length && imagePrompt) {
        handleGenerateImages();
      }
    } catch (error) {
      showError("Failed to generate content. Please try again.");
    }
  };
  
  // Handle image generation
  const handleGenerateImages = async () => {
    if (!imagePrompt.trim()) {
      showError("Please enter an image prompt");
      return;
    }
    
    try {
      const result = await imageMutation.mutateAsync(imagePrompt);
      setGeneratedImages(result);
      showSuccess("Images generated successfully!");
    } catch (error) {
      showError("Failed to generate images. Please try again.");
    }
  };
  
  // Handle copy content
  const handleCopyContent = () => {
    if (!generatedContent) return;
    
    let textToCopy = generatedContent.content;
    
    if (generatedContent.hashtags && generatedContent.hashtags.length > 0) {
      textToCopy += "\n\n" + generatedContent.hashtags.join(" ");
    }
    
    if (generatedContent.cta) {
      textToCopy += "\n\n" + generatedContent.cta;
    }
    
    navigator.clipboard.writeText(textToCopy);
    showInfo("Generated content copied to clipboard!");
  };
  
  // Handle download image
  const handleDownloadImage = (image: GeneratedImage) => {
    // In a real app, this would download the actual image
    // For this demo, we'll just show a success message
    showInfo(`Image would be downloaded in a real app`);
  };
  
  // Handle clear prompt
  const handleClearPrompt = () => {
    setPrompt("");
  };
  
  // Handle clear image prompt
  const handleClearImagePrompt = () => {
    setImagePrompt("");
  };
  
  // Handle clear generated content
  const handleClearGeneratedContent = () => {
    setGeneratedContent(null);
  };
  
  // Handle clear generated images
  const handleClearGeneratedImages = () => {
    setGeneratedImages([]);
  };
  
  // Handle save to library (placeholder)
  const handleSaveToLibrary = () => {
    showSuccess("Content saved to your library!");
  };
  
  // Handle share content (placeholder)
  const handleShareContent = () => {
    showInfo("Sharing functionality would be implemented in a real app");
  };
  
  // Get platform icon
  const PlatformIcon = platform ? platformIconMap[platform] : undefined;
  
  return (
    <PageLayout
      className="items-center"
      title="AI Content Generation"
      description="Create platform-optimized content with advanced AI generation capabilities."
    >
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Generation Form */}
        <div className="lg:col-span-2">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Wand2 className="h-5 w-5 text-primary" />
                Generate New Content
              </CardTitle>
              <CardDescription>
                Create platform-optimized content with our AI assistant
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              {/* Reference Content */}
              {referenceContent && (
                <Alert className="bg-muted">
                  <FileText className="h-4 w-4" />
                  <AlertTitle>Reference Content</AlertTitle>
                  <AlertDescription className="flex flex-col gap-1">
                    <p className="font-medium">{referenceContent.title}</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">{referenceContent.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="capitalize">{referenceContent.platform}</Badge>
                      {referenceContent.category && (
                        <Badge variant="outline" className="capitalize">{referenceContent.category}</Badge>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 px-2 ml-auto" 
                        onClick={() => {
                          setReferenceContent(null);
                          navigate("/generate", { replace: true });
                        }}
                      >
                        <XCircle className="h-4 w-4 mr-1" /> Clear Reference
                      </Button>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
              
              {/* Content Prompt */}
              <div className="grid gap-2 relative">
                <Label htmlFor="prompt">Content Prompt</Label>
                <Textarea
                  id="prompt"
                  placeholder="e.g., 'Write a viral post about remote work productivity tips' or 'Create a tutorial on using AI tools for content creation'"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={5}
                  className="pr-10"
                  disabled={contentMutation.isPending}
                />
                {prompt && !contentMutation.isPending && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-8 right-2 h-8 w-8 text-muted-foreground hover:text-foreground"
                        onClick={handleClearPrompt}
                        aria-label="Clear prompt"
                      >
                        <XCircle className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Clear prompt</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
              
              {/* Platform, Tone, Length */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="platform">Platform</Label>
                  <Select value={platform} onValueChange={setPlatform} disabled={contentMutation.isPending}>
                    <SelectTrigger id="platform">
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      {contentPlatforms.map((p) => (
                        <SelectItem key={p.value} value={p.value}>
                          {p.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="tone">Tone</Label>
                  <Select value={tone} onValueChange={setTone} disabled={contentMutation.isPending}>
                    <SelectTrigger id="tone">
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      {contentTones.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="length">Length</Label>
                  <Select value={length} onValueChange={setLength} disabled={contentMutation.isPending}>
                    <SelectTrigger id="length">
                      <SelectValue placeholder="Select length" />
                    </SelectTrigger>
                    <SelectContent>
                      {contentLengths.map((l) => (
                        <SelectItem key={l.value} value={l.value}>
                          {l.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Additional Options */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="includeHashtags" 
                    checked={includeHashtags} 
                    onCheckedChange={(checked) => setIncludeHashtags(checked as boolean)}
                    disabled={contentMutation.isPending}
                  />
                  <Label htmlFor="includeHashtags">Include Hashtags</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="includeCTA" 
                    checked={includeCTA} 
                    onCheckedChange={(checked) => setIncludeCTA(checked as boolean)}
                    disabled={contentMutation.isPending}
                  />
                  <Label htmlFor="includeCTA">Include Call-to-Action</Label>
                </div>
              </div>
              
              {/* Image Prompt */}
              <div className="grid gap-2 relative">
                <Label htmlFor="imagePrompt">Image Prompt (Optional)</Label>
                <Input
                  id="imagePrompt"
                  placeholder="e.g., 'A professional workspace with laptop and coffee cup' or 'Social media icons with growth charts'"
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  className="pr-10"
                  disabled={imageMutation.isPending}
                />
                {imagePrompt && !imageMutation.isPending && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-8 right-2 h-8 w-8 text-muted-foreground hover:text-foreground"
                        onClick={handleClearImagePrompt}
                        aria-label="Clear image prompt"
                      >
                        <XCircle className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Clear image prompt</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
              
              {/* Generate Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={handleGenerateContent} 
                  disabled={contentMutation.isPending || !prompt.trim()} 
                  className="flex-grow"
                >
                  {contentMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Content...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Content
                    </>
                  )}
                </Button>
                
                <Button 
                  onClick={handleGenerateImages} 
                  disabled={imageMutation.isPending || !imagePrompt.trim()} 
                  variant="outline"
                >
                  {imageMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Images...
                    </>
                  ) : (
                    <>
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Generate Images
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right Column - Saved Content */}
        <div className="lg:col-span-1">
          <Card className="w-full h-full">
            <CardHeader>
              <CardTitle className="text-lg">Saved Content</CardTitle>
              <CardDescription>
                Reference your saved content for inspiration
              </CardDescription>
            </CardHeader>
            <CardContent>
              {savedItems.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No saved content yet</p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="/discover">Discover Content</a>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {savedItems.slice(0, 5).map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <div className="p-3">
                        <h3 className="font-medium text-sm line-clamp-2">{item.title}</h3>
                        <div className="flex items-center justify-between mt-2">
                          <Badge variant="outline" className="capitalize text-xs">
                            {item.platform}
                          </Badge>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 px-2"
                            onClick={() => {
                              setReferenceContent(item);
                              setPrompt(`Create content inspired by: "${item.title}"`);
                              setPlatform(item.platform);
                              setImagePrompt(`Create an image for: ${item.title}`);
                            }}
                          >
                            Use as Reference
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Generated Content Display */}
      {(generatedContent || generatedImages.length > 0) && (
        <Card className="w-full max-w-5xl mt-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Generated Results</CardTitle>
              <div className="flex gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        setGeneratedContent(null);
                        setGeneratedImages([]);
                      }}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Clear All
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Clear all generated content</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="content" disabled={!generatedContent}>
                  <FileText className="h-4 w-4 mr-2" />
                  Content
                </TabsTrigger>
                <TabsTrigger value="images" disabled={generatedImages.length === 0}>
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Images
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          
          <CardContent>
            <TabsContent value="content" className="mt-0">
              {generatedContent && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    {PlatformIcon && <PlatformIcon className="h-5 w-5" />}
                    <h3 className="font-medium capitalize">{platform} Content</h3>
                    {generatedContent.performanceEstimate && (
                      <Badge className="ml-auto">
                        Performance Score: {generatedContent.performanceEstimate}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="p-4 border rounded-md bg-muted/50 relative">
                    <Textarea
                      value={generatedContent.content}
                      readOnly
                      rows={10}
                      className="resize-none pr-20 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      aria-label="Generated content"
                    />
                    <div className="absolute top-4 right-4 flex flex-col gap-1">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleCopyContent}
                            aria-label="Copy generated content"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Copy content</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleClearGeneratedContent}
                            aria-label="Clear generated content"
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Clear content</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                  
                  {generatedContent.hashtags && generatedContent.hashtags.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Suggested Hashtags</h4>
                      <div className="flex flex-wrap gap-2">
                        {generatedContent.hashtags.map((tag, index) => (
                          <Badge key={index} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {generatedContent.cta && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Call-to-Action</h4>
                      <p className="text-sm p-2 bg-muted rounded-md">{generatedContent.cta}</p>
                    </div>
                  )}
                  
                  
                  
                  {generatedContent.productionNotes && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Production Notes</h4>
                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertDescription className="text-sm">
                          {generatedContent.productionNotes}
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="images" className="mt-0">
              {generatedImages.length > 0 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {generatedImages.map((image, index) => (
                      <Card key={index} className="overflow-hidden">
                        <div className="relative aspect-square">
                          <img 
                            src={image.url} 
                            alt={image.alt} 
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute top-2 right-2 flex gap-1">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="secondary"
                                  size="icon"
                                  className="h-8 w-8 bg-background/80 backdrop-blur-sm"
                                  onClick={() => handleDownloadImage(image)}
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Download image</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </div>
                        <CardFooter className="p-3">
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {image.prompt}
                          </p>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="flex justify-center">
                    <Button 
                      variant="outline" 
                      onClick={handleGenerateImages} 
                      disabled={imageMutation.isPending}
                      className="gap-2"
                    >
                      {imageMutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <RefreshCw className="h-4 w-4" />
                      )}
                      Regenerate Images
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
          </CardContent>
          
          {generatedContent && (
            <CardFooter className="flex flex-wrap gap-3 border-t pt-6">
              <Button onClick={handleSaveToLibrary} variant="outline" className="gap-2">
                <BookmarkPlus className="h-4 w-4" />
                Save to Library
              </Button>
              <Button onClick={handleShareContent} variant="outline" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share Content
              </Button>
              <Button onClick={handleGenerateContent} disabled={contentMutation.isPending} className="gap-2 ml-auto">
                {contentMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                Regenerate
              </Button>
            </CardFooter>
          )}
        </Card>
      )}
    </PageLayout>
  );
};

export default ContentGeneration;