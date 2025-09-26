"use client";

import { useState, useEffect } from "react";
import { ContentItem } from "@/types/content";
import { showSuccess, showInfo } from "@/utils/toast";

const LOCAL_STORAGE_KEY = "savedContentItems";

export function useSavedContent() {
  const [savedItems, setSavedItems] = useState<ContentItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const storedItems = localStorage.getItem(LOCAL_STORAGE_KEY);
        return storedItems ? JSON.parse(storedItems) : [];
      } catch (error) {
        console.error("Error loading saved content:", error);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedItems));
      } catch (error) {
        console.error("Error saving content:", error);
      }
    }
  }, [savedItems]);

  const isSaved = (itemId: string) => {
    return savedItems.some((item) => item.id === itemId);
  };

  const toggleSaved = (item: ContentItem) => {
    setSavedItems((prevItems) => {
      const isCurrentlySaved = prevItems.some((savedItem) => savedItem.id === item.id);
      
      if (isCurrentlySaved) {
        showInfo(`Removed "${item.title}" from saved content.`);
        return prevItems.filter((savedItem) => savedItem.id !== item.id);
      } else {
        showSuccess(`Saved "${item.title}"!`);
        return [...prevItems, item];
      }
    });
  };

  const clearAllSaved = () => {
    setSavedItems([]);
    showInfo("All saved content cleared.");
  };

  return { 
    savedItems, 
    isSaved, 
    toggleSaved, 
    clearAllSaved,
    savedCount: savedItems.length 
  };
}