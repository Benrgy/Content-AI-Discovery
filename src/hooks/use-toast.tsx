"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

export { toast };

export function useToast() {
  const [toasts, setToasts] = useState<any[]>([]);

  const addToast = (newToast: any) => {
    setToasts(prev => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const clearToasts = () => {
    setToasts([]);
  };

  return {
    toasts,
    addToast,
    removeToast,
    clearToasts
  };
}