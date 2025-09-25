"use client";

import React from "react";
import { ContentItem } from "@/data/mockContent";
import { showSuccess, showInfo } from "@/utils/toast"; // Import utility toast functions

const LOCAL_STORAGE_KEY = "savedContentItems";

export function useSavedContent() {
  const [savedItems, setSavedItems] = React.useState<ContentItem[]>(() => {
    if (typeof window !== "undefined") {
      const storedItems = localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedItems ? JSON.parse(storedItems) : [];
    }
    return [];
  });

  React.useEffect(() => {
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
        showInfo(`Removed "${item.title}" from saved content.`); // Using utility function
        return prevItems.filter((savedItem) => savedItem.id !== item.id);
      } else {
        showSuccess(`Saved "${item.title}"!`); // Using utility function
        return [...prevItems, item];
      }
    });
  };

  return { savedItems, isSaved, toggleSaved };
}