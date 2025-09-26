"use client";

import { useState, useEffect } from "react"; // Explicitly import useState and useEffect
import { ContentItem } from "@/types/content";
import { showSuccess, showInfo } from "@/utils/toast";

const LOCAL_STORAGE_KEY = "savedContentItems";

export function useSavedContent() {
  const [savedItems, setSavedItems] = useState<ContentItem[]>(() => { // Use useState directly
    if (typeof window !== "undefined") {
      const storedItems = localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedItems ? JSON.parse(storedItems) : [];
    }
    return [];
  });

  useEffect(() => { // Use useEffect directly
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedItems));
    }
  }, [savedItems]);

  const isSaved = (itemId: string) => {
    return savedItems.some((item) => item.id === itemId);
  };

  const toggleSaved = (item: ContentItem) => {
    setSavedItems((prevItems) => {
      if (isSaved(item.id)) {
        showInfo(`Removed "${item.title}" from saved content.`);
        return prevItems.filter((savedItem) => savedItem.id !== item.id);
      } else {
        showSuccess(`Saved "${item.title}"!`);
        return [...prevItems, item];
      }
    });
  };

  return { savedItems, isSaved, toggleSaved };
}