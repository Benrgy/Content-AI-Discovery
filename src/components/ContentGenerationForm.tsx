"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  XCircle, 
  Loader2, 
  Sparkles,
  Wand2,
  ImageIcon,
  FileText
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  contentPlatforms, 
  contentTones, 
  contentLengths
} from "@/constants/content-constants";
import { ContentItem } from "@/types/content";
import { showError } from "@/utils/toast";

interface ContentGenerationFormProps {
  onGenerateContent: (formData: {
    prompt: string;
    platform: string;
    tone: string;
    length: string;
    includeHashtags: boolean;
    includeCTA: boolean;
  }) => void;
  onGenerateImages: (imagePrompt: string) => void;
  onClearReference: () => void;
  referenceContent: ContentItem | null;
  isGeneratingContent: boolean;
  isGeneratingImages: boolean;
}

const ContentGenerationForm = ({
  onGenerateContent,
  onGenerateImages,
  onClearReference,
  referenceContent,
  isGeneratingContent,
  isGeneratingImages
}: ContentGenerationFormProps) => {
  console.log("ContentGenerationForm: Component rendering");
  
  const [prompt, setPrompt] = useState("");
  const [platform, setPlatform] = useState("linkedin");
  const [tone, setTone] = useState("professional");
  const [length, setLength] = useState("medium");
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [includeCTA, setIncludeCTA] = useState(true);
  const [imagePrompt, setImagePrompt] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  
  useEffect(() => {
    try {
      if (referenceContent) {
        console.log("Setting reference content in form:", referenceContent.title);
        setPrompt(`Create content inspired by: "${referenceContent.title}"`);
        setPlatform(referenceContent.platform);
        setImagePrompt(`Create an image for: ${referenceContent.title}`);
        setFormError(null);
      }
    } catch (error) {
      console.error("Error setting reference content:", error);
      setFormError("Error loading reference content");
    }
  }, [referenceContent]);
  
  const handleGenerateContent = () => {
    try {
      setFormError(null);
      
      if (!prompt.trim()) {
        showError("Please enter a content prompt");
        return;
      }
      
      console.log("Form submitting with:", { prompt, platform, tone, length, includeHashtags, includeCTA });
      
      onGenerateContent({
        prompt,
        platform,
        tone,
        length,
        includeHashtags,
        includeCTA
      });
    } catch (error) {
      console.error("Error in handleGenerateContent:", error);
      setFormError("Error submitting form");
    }
  };
  
  const handleGenerateImages = () => {
    try {
      setFormError(null);
      
      if (!imagePrompt.trim()) {
        showError("Please enter an image prompt");
        return;
      }
      
      console.log("Generating images with prompt:", imagePrompt);
      onGenerateImages(imagePrompt);
    } catch (error) {
      console.error("Error in handleGenerateImages:", error);
      setFormError("Error generating images");
    }
  };
  
  const handleClearPrompt = () => {
    setPrompt("");
  };
  
  const handleClearImagePrompt = () => {
    setImagePrompt("");
  };
  
  if (formError) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <Alert variant="destructive">
            <AlertTitle>Form Error</AlertTitle>
            <AlertDescription>{formError}</AlertDescription>
          </Alert>
          <Button 
            onClick={() => setFormError(null)} 
            className="mt-4"
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  return (
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
                  onClick={onClearReference}
                >
                  <XCircle className="h-4 w-4 mr-1" /> Clear Reference
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}
        
        <div className="grid gap-2 relative">
          <Label htmlFor="prompt">Content Prompt</Label>
          <Textarea
            id="prompt"
            placeholder="e.g., 'Write a viral post about remote work productivity tips' or 'Create a tutorial on using AI tools for content creation'"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={5}
            className="pr-10"
            disabled={isGeneratingContent}
          />
          {prompt && !isGeneratingContent && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-8 right-2 h-8 w-8 text-muted-foreground hover:text-foreground"
                  onClick={handleClearPrompt}
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="platform">Platform</Label>
            <Select value={platform} onValueChange={setPlatform} disabled={isGeneratingContent}>
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
            <Select value={tone} onValueChange={setTone} disabled={isGeneratingContent}>
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
            <Select value={length} onValueChange={setLength} disabled={isGeneratingContent}>
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
        
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="includeHashtags" 
              checked={includeHashtags} 
              onCheckedChange={(checked) => setIncludeHashtags(checked as boolean)}
              disabled={isGeneratingContent}
            />
            <Label htmlFor="includeHashtags">Include Hashtags</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="includeCTA" 
              checked={includeCTA} 
              onCheckedChange={(checked) => setIncludeCTA(checked as boolean)}
              disabled={isGeneratingContent}
            />
            <Label htmlFor="includeCTA">Include Call-to-Action</Label>
          </div>
        </div>
        
        <div className="grid gap-2 relative">
          <Label htmlFor="imagePrompt">Image Prompt (Optional)</Label>
          <Input
            id="imagePrompt"
            placeholder="e.g., 'A professional workspace with laptop and coffee cup' or 'Social media icons with growth charts'"
            value={imagePrompt}
            onChange={(e) => setImagePrompt(e.target.value)}
            className="pr-10"
            disabled={isGeneratingImages}
          />
          {imagePrompt && !isGeneratingImages && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-8 right-2 h-8 w-8 text-muted-foreground hover:text-foreground"
                  onClick={handleClearImagePrompt}
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
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={handleGenerateContent} 
            disabled={isGeneratingContent || !prompt.trim()} 
            className="flex-grow"
          >
            {isGeneratingContent ? (
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
            disabled={isGeneratingImages || !imagePrompt.trim()} 
            variant="outline"
          >
            {isGeneratingImages ? (
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
  );
};

export default ContentGenerationForm;