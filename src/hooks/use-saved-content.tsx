"use client";

import React from "react";
import { ContentItem } from "@/data/mockContent";
import { toast } from "sonner";

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
        toast.info(`Removed "${item.title}" from saved content.`);
        return prevItems.filter((savedItem) => savedItem.id !== item.id);
      } else {
        toast.success(`Saved "${item.title}"!`);
        return [...prevItems, item];
      }
    });
  };

  return { savedItems, isSaved, toggleSaved };
}