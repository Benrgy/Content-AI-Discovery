"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ContentGeneration = () => {
  const [prompt, setPrompt] = React.useState("");
  const [generatedContent, setGeneratedContent] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleGenerateContent = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setGeneratedContent(`Generated content based on: "${prompt}". This is a placeholder response for your AI-powered content!`);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center p-4 md:p-8 lg:p-12 bg-background text-foreground">
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
          <Button onClick={handleGenerateContent} disabled={isLoading || !prompt.trim()}>
            {isLoading ? "Generating..." : "Generate Content"}
          </Button>

          {generatedContent && (
            <div className="mt-6 p-4 border rounded-md bg-muted/50">
              <h3 className="text-lg font-semibold mb-2">Generated Content:</h3>
              <p className="whitespace-pre-wrap text-muted-foreground">{generatedContent}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentGeneration;