"use client";

import { useMutation } from "@tanstack/react-query";
import { generateContent, generateImages } from "@/api/content";
import { ContentGenerationParams, GeneratedContent, GeneratedImage } from "@/types/content";

export function useContentGeneration() {
  const contentMutation = useMutation({
    mutationFn: (params: ContentGenerationParams) => generateContent(params),
  });

  return contentMutation;
}

export function useImageGeneration() {
  const imageMutation = useMutation({
    mutationFn: (prompt: string) => generateImages(prompt),
  });

  return imageMutation;
}