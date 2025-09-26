"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Copy, 
  XCircle, 
  FileText, 
  ImageIcon, 
  RefreshCw, 
  BookmarkPlus, 
  Share2,
  Info,
  Download,
  Loader2
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { GeneratedContent, GeneratedImage } from "@/types/content";
import { platformIconMap } from "@/constants/content-constants";
import { showInfo } from "@/utils/toast";

interface GeneratedContentDisplayProps {
  generatedContent: GeneratedContent | null;
  generatedImages: GeneratedImage[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  onClearAll: () => void;
  onClearContent: () => void;
  onRegenerateContent: () => void;
  onRegenerateImages: () => void;
  isRegeneratingContent: boolean;
  isRegeneratingImages: boolean;
}

const GeneratedContentDisplay = ({
  generatedContent,
  generatedImages,
  activeTab,
  onTabChange,
  onClearAll,
  onClearContent,
  onRegenerateContent,
  onRegenerateImages,
  isRegeneratingContent,
  isRegeneratingImages
}: GeneratedContentDisplayProps) => {
  // Get platform icon
  const PlatformIcon = generatedContent?.platform ? platformIconMap[generatedContent.platform] : undefined;
  
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
  
  // Handle save to library (placeholder)
  const handleSaveToLibrary = () => {
    showInfo("Content saved to your library!");
  };
  
  // Handle share content (placeholder)
  const handleShareContent = () => {
    showInfo("Sharing functionality would be implemented in a real app");
  };
  
  if (!generatedContent && generatedImages.length === 0) {
    return null;
  }
  
  return (
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
                  onClick={onClearAll}
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
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
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
                <h3 className="font-medium capitalize">{generatedContent.platform} Content</h3>
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
                        onClick={onClearContent}
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
                  onClick={onRegenerateImages} 
                  disabled={isRegeneratingImages}
                  className="gap-2"
                >
                  {isRegeneratingImages ? (
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
          <Button onClick={onRegenerateContent} disabled={isRegeneratingContent} className="gap-2 ml-auto">
            {isRegeneratingContent ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            Regenerate
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default GeneratedContentDisplay;