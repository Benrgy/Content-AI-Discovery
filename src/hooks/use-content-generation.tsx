"use client";

import { useMutation } from "@tanstack/react-query";
import { generateContent, generateImages } from "@/api/content";
import { ContentGenerationParams } from "@/types/content";

export function useContentGeneration() {
  return useMutation({
    mutationFn: (params: ContentGenerationParams) => generateContent(params),
  });
}

export function useImageGeneration() {
  return useMutation({
    mutationFn: (prompt: string) => generateImages(prompt),
  });
}