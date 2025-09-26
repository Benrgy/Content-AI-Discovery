"use client";

import { useState, useEffect } from "react";
import { GeneratedContent } from "@/types/content";
import { showSuccess, showInfo } from "@/utils/toast";

const LOCAL_STORAGE_KEY = "contentGenerationHistory";
const MAX_HISTORY_ITEMS = 20;

export function useGenerationHistory() {
  const [history, setHistory] = useState<GeneratedContent[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const storedHistory = localStorage.getItem(LOCAL_STORAGE_KEY);
        return storedHistory ? JSON.parse(storedHistory) : [];
      } catch (error) {
        console.error("Error loading generation history:", error);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(history));
      } catch (error) {
        console.error("Error saving generation history:", error);
      }
    }
  }, [history]);

  const addToHistory = (content: GeneratedContent) => {
    setHistory(prevHistory => {
      // Remove any existing item with the same ID to avoid duplicates
      const filteredHistory = prevHistory.filter(item => item.id !== content.id);
      // Add new item to the beginning and limit to MAX_HISTORY_ITEMS
      const newHistory = [content, ...filteredHistory].slice(0, MAX_HISTORY_ITEMS);
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

  const getHistoryItem = (contentId: string) => {
    return history.find(item => item.id === contentId);
  };

  return { 
    history, 
    addToHistory, 
    removeFromHistory, 
    clearHistory,
    getHistoryItem,
    historyCount: history.length
  };
}