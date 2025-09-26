"use client";

import { useMutation } from "@tanstack/react-query";
import { generateContent, generateImages } from "@/api/content";
import { ContentGenerationParams } from "@/types/content";

export function useContentGeneration() {
  return useMutation({
    mutationFn: (params: ContentGenerationParams) => generateContent(params),
    onError: (error) => {
      console.error("Content generation failed:", error);
    },
    onSuccess: (data) => {
      console.log("Content generated successfully:", data);
    }
  });
}

export function useImageGeneration() {
  return useMutation({
    mutationFn: (prompt: string) => generateImages(prompt),
    onError: (error) => {
      console.error("Image generation failed:", error);
    },
    onSuccess: (data) => {
      console.log("Images generated successfully:", data);
    }
  });
}