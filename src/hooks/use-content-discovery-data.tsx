"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchContentDiscoveryData } from "@/api/content";
import { ContentItem } from "@/types/content";

export function useContentDiscoveryData() {
  return useQuery<ContentItem[], Error>({
    queryKey: ["contentDiscoveryData"],
    queryFn: fetchContentDiscoveryData,
    staleTime: 5 * 60 * 1000, // Data is considered fresh for 5 minutes
    refetchOnWindowFocus: false, // Prevent refetching on window focus for this example
    retry: 2, // Retry failed requests 2 times
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });
}