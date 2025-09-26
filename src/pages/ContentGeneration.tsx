"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, XCircle, Loader2 } from "lucide-react";
import { showSuccess, showInfo } from "@/utils/toast";
import { contentPlatforms, contentTones, contentLengths } from "@/constants/content-constants"; // Import from the centralized constants
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import PageLayout from "@/components/PageLayout"; // Import PageLayout

const ContentGeneration = () => {
  const [prompt, setPrompt] = React.useState("");
  const [platform, setPlatform] = React.useState("linkedin");
  const [tone, setTone] = React.useState("professional");
  const [length, setLength] = React.useState("medium");
  const [generatedContent, setGeneratedContent] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleGenerateContent = () => {
    setIsLoading(true);
    setGeneratedContent(""); // Clear previous content
    // Simulate API call
    setTimeout(() => {
      setGeneratedContent(
        `Here's your ${length}, ${tone} content for ${platform}:\n\n` +
        `"${prompt}"\n\n` +
        `This is a placeholder response for your AI-powered content! ` +
        `It's crafted to be engaging and relevant to your chosen parameters.`
      );
      setIsLoading(false);
      showSuccess("Content generated successfully!");
    }, 2000);
  };

  const handleCopyContent = () => {
    navigator.clipboard.writeText(generatedContent);
    showInfo("Generated content copied to clipboard!");
  };

  const handleClearPrompt = () => {
    setPrompt("");
  };

  const handleClearGeneratedContent = () => {
    setGeneratedContent("");
  };

  return (
    <PageLayout
      className="items-center"
      title="Content Generation"
      description="Unleash AI to create engaging content tailored to your needs."
    >
      <Card className="w-full max-w-3xl p-6">
        <CardHeader>
          <CardTitle className="text-2xl">Generate New Content</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2 relative">
            <Label htmlFor="prompt">Content Prompt</Label>
            <Textarea
              id="prompt"
              placeholder="e.g., 'Write a viral tweet about remote work productivity tips'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={5}
              className="pr-10"
              disabled={isLoading}
            />
            {prompt && !isLoading && (
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="platform">Platform</Label>
              <Select value={platform} onValueChange={setPlatform} disabled={isLoading}>
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
              <Select value={tone} onValueChange={setTone} disabled={isLoading}>
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
              <Select value={length} onValueChange={setLength} disabled={isLoading}>
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

          <Button onClick={handleGenerateContent} disabled={isLoading || !prompt.trim()}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Content"
            )}
          </Button>

          {generatedContent && (
            <div className="mt-6 p-4 border rounded-md bg-muted/50 relative">
              <h3 className="text-lg font-semibold mb-2">Generated Content:</h3>
              <Textarea
                value={generatedContent}
                readOnly
                rows={8}
                className="resize-none pr-20"
                aria-label="Generated content"
              />
              <div className="absolute top-10 right-2 flex flex-col gap-1">
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
          )}
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default ContentGeneration;