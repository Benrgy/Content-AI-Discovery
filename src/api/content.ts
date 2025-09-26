import { mockContent } from "@/data/mockContent";
import { ContentItem } from "@/types/content";

/**
 * Simulates an API call to fetch content discovery data.
 * Includes a simulated delay and a random error chance.
 */
export const fetchContentDiscoveryData = async (): Promise<ContentItem[]> => {
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