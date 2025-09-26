"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Github, 
  Settings, 
  RefreshCw, 
  Upload, 
  Download,
  CheckCircle,
  XCircle,
  Loader2,
  GitBranch,
  GitPullRequest
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { createGitHubSyncManager, validateGitHubToken, getGitHubRepoInfo } from "@/utils/github-sync";
import { showSuccess, showError, showInfo } from "@/utils/toast";
import { useLocalStorage } from "@/hooks/use-local-storage";

interface GitHubSyncProps {
  content?: any;
  onSync?: (status: boolean) => void;
}

const GitHubSync = ({ content, onSync }: GitHubSyncProps) => {
  const [githubToken, setGithubToken] = useLocalStorage<string>('github-token', '');
  const [githubRepo, setGithubRepo] = useLocalStorage<string>('github-repo', '');
  const [autoSync, setAutoSync] = useLocalStorage<boolean>('github-auto-sync', false);
  const [isValidating, setIsValidating] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [lastSync, setLastSync] = useLocalStorage<Date>('github-last-sync', new Date());
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncManager, setSyncManager] = useState<any>(null);

  useEffect(() => {
    if (githubToken && githubRepo) {
      validateConnection();
    }
  }, [githubToken, githubRepo]);

  const validateConnection = async () => {
    setIsValidating(true);
    try {
      const isValid = await validateGitHubToken(githubToken);
      if (isValid) {
        const repoInfo = await getGitHubRepoInfo(githubRepo, githubToken);
        setIsConnected(true);
        setSyncManager(createGitHubSyncManager({
          repo: githubRepo,
          branch: 'main',
          token: githubToken,
          autoSync: autoSync
        }));
        showSuccess(`Connected to ${repoInfo.full_name}`);
      } else {
        setIsConnected(false);
        showError('Invalid GitHub token');
      }
    } catch (error) {
      setIsConnected(false);
      showError('Failed to connect to GitHub');
    } finally {
      setIsValidating(false);
    }
  };

  const handleSync = async (direction: 'upload' | 'download') => {
    if (!syncManager || !content) return;
    
    setIsSyncing(true);
    try {
      if (direction === 'upload') {
        await syncManager.syncContent(content, 'content-ai-data.json', 'Sync content data from ContentAI');
        setLastSync(new Date());
        showSuccess('Content uploaded to GitHub');
      } else {
        const remoteContent = await syncManager.getContent('content-ai-data.json');
        // Handle downloaded content
        showSuccess('Content downloaded from GitHub');
      }
      onSync?.(true);
    } catch (error) {
      showError('Sync failed');
      onSync?.(false);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleAutoSyncToggle = (checked: boolean) => {
    setAutoSync(checked);
    if (checked && syncManager) {
      showInfo('Auto-sync enabled');
    } else {
      showInfo('Auto-sync disabled');
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Github className="h-6 w-6" />
          GitHub Sync
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <Settings className="h-4 w-4" />
          <AlertTitle>GitHub Integration</AlertTitle>
          <AlertDescription>
            Sync your content data with GitHub for version control and collaboration.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div>
            <Label htmlFor="github-token">GitHub Personal Access Token</Label>
            <Input
              id="github-token"
              type="password"
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              value={githubToken}
              onChange={(e) => setGithubToken(e.target.value)}
            />
            <p className="text-sm text-muted-foreground mt-1">
              Create a token at github.com/settings/tokens with repo permissions
            </p>
          </div>

          <div>
            <Label htmlFor="github-repo">Repository (owner/repo)</Label>
            <Input
              id="github-repo"
              placeholder="username/content-ai-data"
              value={githubRepo}
              onChange={(e) => setGithubRepo(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="auto-sync">Auto-sync</Label>
            <Switch
              id="auto-sync"
              checked={autoSync}
              onCheckedChange={handleAutoSyncToggle}
            />
          </div>

          {isConnected && (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm">Connected to GitHub</span>
            </div>
          )}

          <div className="flex gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => handleSync('upload')}
                  disabled={!isConnected || isSyncing}
                  className="gap-2"
                >
                  {isSyncing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4" />
                  )}
                  Upload to GitHub
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Upload current content to GitHub</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => handleSync('download')}
                  disabled={!isConnected || isSyncing}
                  variant="outline"
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download from GitHub
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download content from GitHub</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={validateConnection}
                  disabled={isValidating}
                  variant="ghost"
                  size="icon"
                >
                  {isValidating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Test GitHub connection</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {lastSync && (
            <div className="text-sm text-muted-foreground">
              Last sync: {lastSync.toLocaleString()}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GitHubSync;