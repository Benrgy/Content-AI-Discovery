"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchContentDiscoveryData } from "@/api/content";
import { ContentItem } from "@/types/content";

export function useContentDiscoveryData() {
  return useQuery<ContentItem[], Error>({
    queryKey: ["contentDiscoveryData"],
    queryFn: fetchContentDiscoveryData,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}