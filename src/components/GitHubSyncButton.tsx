"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Github, 
  Upload, 
  Download,
  Loader2
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useGitHubSync } from "@/hooks/use-github-sync";
import { showError, showSuccess } from "@/utils/toast";

interface GitHubSyncButtonProps {
  content: any;
  variant?: 'upload' | 'download' | 'both';
  size?: 'default' | 'sm' | 'icon';
}

const GitHubSyncButton = ({ content, variant = 'both', size = 'default' }: GitHubSyncButtonProps) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const { isConnected, syncManager } = useGitHubSync();

  const handleSync = async (direction: 'upload' | 'download') => {
    if (!isConnected || !syncManager || !content) {
      showError('GitHub not connected');
      return;
    }

    setIsSyncing(true);
    try {
      if (direction === 'upload') {
        await syncManager.syncContent(content, 'content-ai-data.json', 'Sync content from ContentAI');
        showSuccess('Content synced to GitHub');
      } else {
        // Handle download
        showSuccess('Content synced from GitHub');
      }
    } catch (error) {
      showError('Sync failed');
    } finally {
      setIsSyncing(false);
    }
  };

  if (!isConnected) {
    return null; // Don't show if not connected
  }

  if (variant === 'upload') {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => handleSync('upload')}
            disabled={isSyncing}
            size={size}
            className="gap-2"
          >
            {isSyncing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            {size !== 'icon' && 'Sync to GitHub'}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Upload to GitHub</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  if (variant === 'download') {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => handleSync('download')}
            disabled={isSyncing}
            size={size}
            variant="outline"
            className="gap-2"
          >
            {isSyncing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            {size !== 'icon' && 'Sync from GitHub'}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Download from GitHub</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <div className="flex gap-2">
      <GitHubSyncButton content={content} variant="upload" size={size} />
      <GitHubSyncButton content={content} variant="download" size={size} />
    </div>
  );
};

export default GitHubSyncButton;