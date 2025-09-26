"use client";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { showInfo } from "@/utils/toast";

interface KeyboardShortcutsProps {
  children: React.ReactNode;
}

const KeyboardShortcuts = ({ children }: KeyboardShortcutsProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only trigger if no input is focused
      if (document.activeElement?.tagName === 'INPUT' || 
          document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }

      // Check for Ctrl/Cmd key
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case 'd':
            event.preventDefault();
            navigate('/discover');
            showInfo('Navigated to Discover');
            break;
          case 'g':
            event.preventDefault();
            navigate('/generate');
            showInfo('Navigated to Generate');
            break;
          case 'a':
            event.preventDefault();
            navigate('/analytics');
            showInfo('Navigated to Analytics');
            break;
          case 's':
            event.preventDefault();
            navigate('/saved');
            showInfo('Navigated to Saved');
            break;
          case '/':
            event.preventDefault();
            // Focus search input if exists
            const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
            if (searchInput) {
              searchInput.focus();
            }
            break;
          case '?':
            event.preventDefault();
            showInfo('Keyboard shortcuts: Ctrl+D (Discover), Ctrl+G (Generate), Ctrl+A (Analytics), Ctrl+S (Saved), Ctrl+/ (Search)');
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return <>{children}</>;
};

export default KeyboardShortcuts;