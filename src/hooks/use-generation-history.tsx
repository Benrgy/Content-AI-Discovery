"use client";

import { useState, useEffect } from "react";
import { GeneratedContent } from "@/types/content";
import { showInfo } from "@/utils/toast";

const LOCAL_STORAGE_KEY = "contentGenerationHistory";
const MAX_HISTORY_ITEMS = 20;

export function useGenerationHistory() {
  const [history, setHistory] = useState<GeneratedContent[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading generation history:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.error("Error saving generation history:", error);
    }
  }, [history]);

  const addToHistory = (content: GeneratedContent) => {
    setHistory(prevHistory => {
      const filteredHistory = prevHistory.filter(item => item.id !== content.id);
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
    showInfo("Generation history cleared");
  };

  return { 
    history, 
    addToHistory, 
    removeFromHistory, 
    clearHistory,
    historyCount: history.length
  };
}