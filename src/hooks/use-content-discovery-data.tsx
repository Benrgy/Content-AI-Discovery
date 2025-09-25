"use client";

import { useQuery } from "@tanstack/react-query";
import { mockContent, ContentItem } from "@/data/mockContent";

const fetchContentDiscoveryData = async (): Promise<ContentItem[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate a random error for demonstration (10% chance)
      if (Math.random() < 0.1) {
        reject(new Error("Failed to fetch content. Please try again."));
      } else {
        resolve(mockContent);
      }
    }, 1000); // Simulate 1 second loading time
  });
};

export function useContentDiscoveryData() {
  return useQuery<ContentItem[], Error>({
    queryKey: ["contentDiscoveryData"],
    queryFn: fetchContentDiscoveryData,
    staleTime: 5 * 60 * 1000, // Data is considered fresh for 5 minutes
    refetchOnWindowFocus: false, // Prevent refetching on window focus for this example
  });
}