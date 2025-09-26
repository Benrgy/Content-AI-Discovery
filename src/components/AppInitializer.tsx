"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";
import NetworkStatus from "./NetworkStatus";
import KeyboardShortcuts from "./KeyboardShortcuts";
import { showSuccess } from "@/utils/toast";

interface AppInitializerProps {
  children: React.ReactNode;
}

const AppInitializer = ({ children }: AppInitializerProps) => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Simulate app initialization
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Check for first-time user
        const hasVisited = localStorage.getItem('hasVisited');
        if (!hasVisited) {
          localStorage.setItem('hasVisited', 'true');
          showSuccess('Welcome to ContentAI! Discover trending content and generate viral posts.');
        }

        setIsInitialized(true);
      } catch (error) {
        console.error('App initialization failed:', error);
        setIsInitialized(true); // Continue anyway
      }
    };

    initializeApp();
  }, []);

  if (!isInitialized) {
    return <LoadingScreen message="Initializing ContentAI..." />;
  }

  return (
    <>
      <KeyboardShortcuts>
        {children}
      </KeyboardShortcuts>
      <NetworkStatus />
    </>
  );
};

export default AppInitializer;