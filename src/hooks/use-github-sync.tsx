"use client";

import { useState, useEffect } from "react";
import { createGitHubSyncManager, validateGitHubToken } from "@/utils/github-sync";
import { showError, showSuccess } from "@/utils/toast";

export function useGitHubSync() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [syncManager, setSyncManager] = useState<any>(null);

  const connectToGitHub = async (token: string, repo: string) => {
    setIsLoading(true);
    try {
      const isValid = await validateGitHubToken(token);
      if (!isValid) {
        throw new Error('Invalid GitHub token');
      }

      const manager = createGitHubSyncManager({
        repo,
        branch: 'main',
        token,
        autoSync: false
      });

      setSyncManager(manager);
      setIsConnected(true);
      showSuccess('Successfully connected to GitHub');
      return manager;
    } catch (error) {
      showError('Failed to connect to GitHub');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectFromGitHub = () => {
    setSyncManager(null);
    setIsConnected(false);
    showSuccess('Disconnected from GitHub');
  };

  const syncContent = async (content: any, path: string, message: string) => {
    if (!syncManager) {
      throw new Error('Not connected to GitHub');
    }

    try {
      await syncManager.syncContent(content, path, message);
      showSuccess('Content synced to GitHub');
    } catch (error) {
      showError('Failed to sync content');
      throw error;
    }
  };

  return {
    isConnected,
    isLoading,
    syncManager,
    connectToGitHub,
    disconnectFromGitHub,
    syncContent
  };
}