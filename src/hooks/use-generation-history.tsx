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
      console.log("useGenerationHistory: Loading history from localStorage");
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        console.log("useGenerationHistory: Loaded history:", parsed);
        setHistory(parsed);
      }
    } catch (error) {
      console.error("useGenerationHistory: Error loading generation history:", error);
    }
  }, []);

  useEffect(() => {
    try {
      console.log("useGenerationHistory: Saving history to localStorage:", history);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.error("useGenerationHistory: Error saving generation history:", error);
    }
  }, [history]);

  const addToHistory = (content: GeneratedContent) => {
    console.log("useGenerationHistory: Adding content to history:", content);
    setHistory(prevHistory => {
      const filteredHistory = prevHistory.filter(item => item.id !== content.id);
      const newHistory = [content, ...filteredHistory].slice(0, MAX_HISTORY_ITEMS);
      return newHistory;
    });
  };

  const removeFromHistory = (contentId: string) => {
    console.log("useGenerationHistory: Removing content from history:", contentId);
    setHistory(prevHistory => {
      const newHistory = prevHistory.filter(item => item.id !== contentId);
      showInfo("Item removed from history");
      return newHistory;
    });
  };

  const clearHistory = () => {
    console.log("useGenerationHistory: Clearing all history");
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