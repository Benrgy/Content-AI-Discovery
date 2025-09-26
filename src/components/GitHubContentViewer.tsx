"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Github, 
  FileText, 
  Eye, 
  Edit3, 
  Save, 
  RefreshCw,
  Download,
  Upload,
  Clock,
  User,
  GitBranch,
  XCircle,
  Loader2,
  AlertCircle
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useGitHubSync } from "@/hooks/use-github-sync";
import { showSuccess, showError, showInfo } from "@/utils/toast";
import { formatRelativeTime } from "@/lib/utils";

interface GitHubContentViewerProps {
  filePath?: string;
  defaultContent?: any;
}

const GitHubContentViewer = ({ filePath = 'content-ai-data.json', defaultContent }: GitHubContentViewerProps) => {
  const { isConnected, syncManager } = useGitHubSync();
  const [content, setContent] = useState<any>(defaultContent);
  const [originalContent, setOriginalContent] = useState<any>(defaultContent);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [fileInfo, setFileInfo] = useState<any>(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (isConnected && filePath) {
      loadFileContent();
    }
  }, [isConnected, filePath]);

  useEffect(() => {
    setHasChanges(JSON.stringify(content) !== JSON.stringify(originalContent));
  }, [content, originalContent]);

  const loadFileContent = async () => {
    setIsLoading(true);
    try {
      const fileData = await syncManager.getContent(filePath);
      setContent(fileData);
      setOriginalContent(fileData);
      
      // Get file info
      const response = await fetch(`https://api.github.com/repos/${syncManager.config.repo}/contents/${filePath}`, {
        headers: {
          'Authorization': `token ${syncManager.config.token}`,
        },
      });
      
      if (response.ok) {
        const info = await response.json();
        setFileInfo(info);
      }
    } catch (error) {
      showError(`Failed to load file: ${error.message}`);
      // If file doesn't exist, create default content
      if (error.message.includes('404')) {
        setContent(defaultContent || {});
        setOriginalContent(defaultContent || {});
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!hasChanges) return;

    setIsLoading(true);
    try {
      await syncManager.syncContent(content, filePath, 'Update content via ContentAI viewer');
      setOriginalContent(content);
      showSuccess('Content saved to GitHub');
      setIsEditing(false);
    } catch (error) {
      showError(`Failed to save: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    const contentStr = JSON.stringify(content, null, 2);
    const blob = new Blob([contentStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filePath;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRefresh = () => {
    loadFileContent();
    showInfo('Content refreshed from GitHub');
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const formatJsonContent = (data: any) => {
    try {
      return JSON.stringify(data, null, 2);
    } catch (error) {
      return 'Invalid JSON content';
    }
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

  if (isLoading && !content) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <RefreshCw className="h-6 w-6 animate-spin" />
            <span className="ml-2">Loading content...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Github className="h-6 w-6" />
          GitHub Content Viewer
        </CardTitle>
        {fileInfo && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <GitBranch className="h-3 w-3" />
              <span>{fileInfo.path}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{formatRelativeTime(new Date(fileInfo.commit?.author?.date || Date.now()))}</span>
            </div>
            {fileInfo.commit?.author?.name && (
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>{fileInfo.commit.author.name}</span>
              </div>
            )}
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleRefresh}
                variant="outline"
                size="icon"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Refresh from GitHub</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleEditToggle}
                variant={isEditing ? "default" : "outline"}
                size="icon"
              >
                <Edit3 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isEditing ? 'View mode' : 'Edit mode'}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleDownload}
                variant="outline"
                size="icon"
              >
                <Download className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download file</p>
            </TooltipContent>
          </Tooltip>

          {hasChanges && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="gap-2 ml-auto"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  Save Changes
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Save changes to GitHub</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        {hasChanges && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Unsaved Changes</AlertTitle>
            <AlertDescription>
              You have unsaved changes. Click Save to update GitHub.
            </AlertDescription>
          </Alert>
        )}

        <div>
          <Label htmlFor="content-editor">File Content</Label>
          {isEditing ? (
            <Textarea
              id="content-editor"
              value={formatJsonContent(content)}
              onChange={(e) => {
                try {
                  const parsed = JSON.parse(e.target.value);
                  setContent(parsed);
                } catch (error) {
                  // Invalid JSON, don't update
                }
              }}
              className="font-mono text-sm min-h-[400px]"
              placeholder="Enter JSON content..."
            />
          ) : (
            <pre className="p-4 bg-muted rounded-md overflow-auto max-h-[400px] text-sm">
              {formatJsonContent(content)}
            </pre>
          )}
        </div>

        {fileInfo && (
          <div className="text-xs text-muted-foreground space-y-1">
            <div>Size: {(fileInfo.size / 1024).toFixed(2)} KB</div>
            <div>SHA: {fileInfo.sha?.substring(0, 8)}...</div>
            {fileInfo.commit?.message && (
              <div>Last commit: {fileInfo.commit.message}</div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GitHubContentViewer;