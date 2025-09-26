"use client";

import { useMutation } from "@tanstack/react-query";
import { generateContent, generateImages } from "@/api/content";
import { ContentGenerationParams } from "@/types/content";

export function useContentGeneration() {
  return useMutation({
    mutationFn: (params: ContentGenerationParams) => {
      console.log("useContentGeneration: Starting content generation with params:", params);
      return generateContent(params);
    },
    onError: (error: any) => {
      console.error("useContentGeneration: Error generating content:", error);
    },
    onSuccess: (data) => {
      console.log("useContentGeneration: Content generated successfully:", data);
    }
  });
}

export function useImageGeneration() {
  return useMutation({
    mutationFn: (prompt: string) => {
      console.log("useImageGeneration: Starting image generation with prompt:", prompt);
      return generateImages(prompt);
    },
    onError: (error: any) => {
      console.error("useImageGeneration: Error generating images:", error);
    },
    onSuccess: (data) => {
      console.log("useImageGeneration: Images generated successfully:", data);
    }
  });
}