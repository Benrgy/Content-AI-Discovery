"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy } from "lucide-react";
import { toast } from "sonner";

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
      toast.success("Content generated successfully!");
    }, 2000);
  };

  const handleCopyContent = () => {
    navigator.clipboard.writeText(generatedContent);
    toast.info("Generated content copied to clipboard!");
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Content Generation</h1>
      <p className="text-lg text-muted-foreground mb-8 text-center max-w-2xl">
        Unleash AI to create engaging content tailored to your needs.
      </p>

      <Card className="w-full max-w-3xl p-6">
        <CardHeader>
          <CardTitle className="text-2xl">Generate New Content</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="prompt">Content Prompt</Label>
            <Textarea
              id="prompt"
              placeholder="e.g., 'Write a viral tweet about remote work productivity tips'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={5}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="platform">Platform</Label>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger id="platform">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="blog">Blog Post</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="tone">Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger id="tone">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="humorous">Humorous</SelectItem>
                  <SelectItem value="informative">Informative</SelectItem>
                  <SelectItem value="inspirational">Inspirational</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="length">Length</Label>
              <Select value={length} onValueChange={setLength}>
                <SelectTrigger id="length">
                  <SelectValue placeholder="Select length" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Short</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="long">Long</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={handleGenerateContent} disabled={isLoading || !prompt.trim()}>
            {isLoading ? "Generating..." : "Generate Content"}
          </Button>

          {generatedContent && (
            <div className="mt-6 p-4 border rounded-md bg-muted/50 relative">
              <h3 className="text-lg font-semibold mb-2">Generated Content:</h3>
              <p className="whitespace-pre-wrap text-muted-foreground">{generatedContent}</p>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2"
                onClick={handleCopyContent}
              >
                <Copy className="h-4 w-4 mr-1" /> Copy
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentGeneration;