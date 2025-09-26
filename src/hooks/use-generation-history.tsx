"use client";

import { useState, useEffect } from "react";
import { GeneratedContent } from "@/types/content";
import { showSuccess, showInfo } from "@/utils/toast";

const LOCAL_STORAGE_KEY = "contentGenerationHistory";

export function useGenerationHistory() {
  const [history, setHistory] = useState<GeneratedContent[]>(() => {
    if (typeof window !== "undefined") {
      const storedHistory = localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedHistory ? JSON.parse(storedHistory) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(history));
    }
  }, [history]);

  const addToHistory = (content: GeneratedContent) => {
    setHistory(prevHistory => {
      // Limit history to 20 items
      const newHistory = [content, ...prevHistory.slice(0, 19)];
      return newHistory;
    });
  };

  const removeFromHistory = (contentId: string) => {
    setHistory(prevHistory => {
      const newHistory = prevHistory.filter(item => item.id !== contentId);
      showInfo("Item removed from history");
      return newHistory;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    showSuccess("Generation history cleared");
  };

  return { 
    history, 
    addToHistory, 
    removeFromHistory, 
    clearHistory 
  };
}