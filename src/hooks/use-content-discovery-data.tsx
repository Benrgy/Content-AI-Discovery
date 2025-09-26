"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchContentDiscoveryData } from "@/api/content"; // Import from the new API file
import { ContentItem } from "@/data/mockContent"; // Still need ContentItem type

export function useContentDiscoveryData() {
  return useQuery<ContentItem[], Error>({
    queryKey: ["contentDiscoveryData"],
    queryFn: fetchContentDiscoveryData,
    staleTime: 5 * 60 * 1000, // Data is considered fresh for 5 minutes
    refetchOnWindowFocus: false, // Prevent refetching on window focus for this example
  });
}