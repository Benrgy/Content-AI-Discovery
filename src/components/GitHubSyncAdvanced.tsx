"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Github, 
  GitBranch,
  GitPullRequest,
  History,
  Clock,
  Users,
  FileText,
  Download,
  Upload,
  RefreshCw,
  Settings,
  CheckCircle,
  XCircle,
  Loader2,
  Eye,
  Edit3
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useGitHubSync } from "@/hooks/use-github-sync";
import { showSuccess, showError, showInfo } from "@/utils/toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatRelativeTime } from "@/lib/utils";

interface GitHubSyncAdvancedProps {
  content?: any;
  onSyncComplete?: (status: boolean) => void;
}

interface SyncHistory {
  id: string;
  type: 'upload' | 'download';
  timestamp: Date;
  status: 'success' | 'error';
  message: string;
  branch: string;
  filePath: string;
}

const GitHubSyncAdvanced = ({ content, onSyncComplete }: GitHubSyncAdvancedProps) => {
  const { isConnected, syncManager } = useGitHubSync();
  const [branches, setBranches] = useState<string[]>(['main']);
  const [selectedBranch, setSelectedBranch] = useState('main');
  const [syncHistory, setSyncHistory] = useState<SyncHistory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [commitMessage, setCommitMessage] = useState('Update content from ContentAI');
  const [filePath, setFilePath] = useState('content-ai-data.json');
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    if (isConnected) {
      loadBranches();
      loadSyncHistory();
    }
  }, [isConnected]);

  const loadBranches = async () => {
    try {
      const response = await fetch(`https://api.github.com/repos/${syncManager?.config?.repo}/branches`, {
        headers: {
          'Authorization': `token ${syncManager?.config?.token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setBranches(data.map((branch: any) => branch.name));
      }
    } catch (error) {
      console.error('Failed to load branches:', error);
    }
  };

  const loadSyncHistory = () => {
    const history = localStorage.getItem('github-sync-history');
    if (history) {
      setSyncHistory(JSON.parse(history));
    }
  };

  const addToHistory = (entry: SyncHistory) => {
    const newHistory = [entry, ...syncHistory].slice(0, 10); // Keep last 10 entries
    setSyncHistory(newHistory);
    localStorage.setItem('github-sync-history', JSON.stringify(newHistory));
  };

  const handleSync = async (direction: 'upload' | 'download') => {
    if (!syncManager || !content) return;

    setIsLoading(true);
    const startTime = Date.now();

    try {
      if (direction === 'upload') {
        await syncManager.syncContent(content, filePath, commitMessage);
        showSuccess(`Content uploaded to ${selectedBranch} branch`);
      } else {
        const remoteContent = await syncManager.getContent(filePath);
        showSuccess(`Content downloaded from ${selectedBranch} branch`);
        // Handle the downloaded content
        onSyncComplete?.(true);
      }

      addToHistory({
        id: Date.now().toString(),
        type: direction,
        timestamp: new Date(),
        status: 'success',
        message: direction === 'upload' ? 'Upload successful' : 'Download successful',
        branch: selectedBranch,
        filePath: filePath
      });

    } catch (error) {
      showError(`Sync failed: ${error.message}`);
      
      addToHistory({
        id: Date.now().toString(),
        type: direction,
        timestamp: new Date(),
        status: 'error',
        message: error.message,
        branch: selectedBranch,
        filePath: filePath
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createNewBranch = async () => {
    const branchName = prompt('Enter new branch name:');
    if (!branchName) return;

    try {
      await syncManager.createBranch(branchName);
      showSuccess(`Branch ${branchName} created`);
      await loadBranches();
      setSelectedBranch(branchName);
    } catch (error) {
      showError(`Failed to create branch: ${error.message}`);
    }
  };

  const viewFileOnGitHub = () => {
    const repoUrl = `https://github.com/${syncManager?.config?.repo}/blob/${selectedBranch}/${filePath}`;
    window.open(repoUrl, '_blank');
  };

  const exportSyncHistory = () => {
    const historyData = JSON.stringify(syncHistory, null, 2);
    const blob = new Blob([historyData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sync-history-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isConnected) {
    return (
      <Alert>
        <XCircle className="h-4 w-4" />
        <AlertTitle>Not Connected</AlertTitle>
        <AlertDescription>
          Please configure your GitHub integration in Settings first.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Github className="h-6 w-6" />
          Advanced GitHub Sync
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="branch-select">Branch</Label>
            <div className="flex gap-2">
              <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                <SelectTrigger id="branch-select">
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map((branch) => (
                    <SelectItem key={branch} value={branch}>
                      <div className="flex items-center gap-2">
                        <GitBranch className="h-3 w-3" />
                        {branch}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={createNewBranch}
                  >
                    <GitBranch className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Create new branch</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          <div>
            <Label htmlFor="file-path">File Path</Label>
            <Input
              id="file-path"
              value={filePath}
              onChange={(e) => setFilePath(e.target.value)}
              placeholder="content-ai-data.json"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="commit-message">Commit Message</Label>
          <Input
            id="commit-message"
            value={commitMessage}
            onChange={(e) => setCommitMessage(e.target.value)}
            placeholder="Update content from ContentAI"
          />
        </div>

        <div className="flex gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => handleSync('upload')}
                disabled={isLoading}
                className="gap-2"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4" />
                )}
                Upload
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Upload content to GitHub</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => handleSync('download')}
                disabled={isLoading}
                variant="outline"
                className="gap-2"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                Download
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download content from GitHub</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={viewFileOnGitHub}
                variant="ghost"
                size="icon"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View file on GitHub</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => setShowHistory(!showHistory)}
                variant="ghost"
                size="icon"
              >
                <History className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View sync history</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {showHistory && (
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold flex items-center gap-2">
                <History className="h-4 w-4" />
                Sync History
              </h3>
              <Button
                onClick={exportSyncHistory}
                variant="ghost"
                size="sm"
                className="gap-1"
              >
                <Download className="h-3 w-3" />
                Export
              </Button>
            </div>
            <ScrollArea className="h-48">
              {syncHistory.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No sync history available
                </p>
              ) : (
                <div className="space-y-2">
                  {syncHistory.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between p-2 rounded-md bg-muted/50"
                    >
                      <div className="flex items-center gap-2">
                        {entry.status === 'success' ? (
                          <CheckCircle className="h-3 w-3 text-green-500" />
                        ) : (
                          <XCircle className="h-3 w-3 text-red-500" />
                        )}
                        <div>
                          <div className="text-sm font-medium">
                            {entry.type === 'upload' ? 'Upload' : 'Download'}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {entry.filePath} • {entry.branch}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">
                          {formatRelativeTime(entry.timestamp)}
                        </div>
                        <Badge
                          variant={entry.status === 'success' ? 'default' : 'destructive'}
                          className="text-xs"
                        >
                          {entry.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GitHubSyncAdvanced;