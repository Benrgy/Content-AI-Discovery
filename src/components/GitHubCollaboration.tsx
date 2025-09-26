"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Github, 
  Users, 
  GitPullRequest,
  MessageSquare,
  Eye,
  CheckCircle,
  XCircle,
  Loader2,
  Send,
  Clock,
  User
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useGitHubSync } from "@/hooks/use-github-sync";
import { showSuccess, showError } from "@/utils/toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatRelativeTime } from "@/lib/utils";

interface GitHubCollaborationProps {
  content?: any;
  filePath?: string;
}

interface PullRequest {
  id: number;
  title: string;
  body: string;
  state: 'open' | 'closed' | 'merged';
  created_at: string;
  user: {
    login: string;
    avatar_url?: string;
  };
  html_url: string;
}

const GitHubCollaboration = ({ content, filePath = 'content-ai-data.json' }: GitHubCollaborationProps) => {
  const { isConnected, syncManager } = useGitHubSync();
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCreatePR, setShowCreatePR] = useState(false);
  const [prTitle, setPrTitle] = useState('');
  const [prBody, setPrBody] = useState('');
  const [prBaseBranch, setPrBaseBranch] = useState('main');
  const [prHeadBranch, setPrHeadBranch] = useState('content-ai-updates');

  useEffect(() => {
    if (isConnected) {
      loadPullRequests();
    }
  }, [isConnected]);

  const loadPullRequests = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://api.github.com/repos/${syncManager?.config?.repo}/pulls?state=all`, {
        headers: {
          'Authorization': `token ${syncManager?.config?.token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPullRequests(data);
      }
    } catch (error) {
      console.error('Failed to load pull requests:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createPullRequest = async () => {
    if (!prTitle.trim()) {
      showError('Please enter a pull request title');
      return;
    }

    setIsLoading(true);
    try {
      // First, ensure we have content to sync
      if (content) {
        await syncManager.syncContent(content, filePath, `Prepare content updates for PR: ${prTitle}`);
      }

      // Create the pull request
      const pr = await syncManager.createPullRequest(
        prTitle,
        prBody || 'Content updates from ContentAI',
        prHeadBranch,
        prBaseBranch
      );

      showSuccess(`Pull request created: #${pr.number}`);
      setShowCreatePR(false);
      setPrTitle('');
      setPrBody('');
      await loadPullRequests();
    } catch (error) {
      showError(`Failed to create pull request: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const viewPullRequest = (pr: PullRequest) => {
    window.open(pr.html_url, '_blank');
  };

  const getPRStatusColor = (state: string) => {
    switch (state) {
      case 'open':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      case 'merged':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-6 w-6" />
          GitHub Collaboration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <GitPullRequest className="h-4 w-4" />
          <AlertTitle>Team Collaboration</AlertTitle>
          <AlertDescription>
            Create pull requests to collaborate with your team on content changes.
          </AlertDescription>
        </Alert>

        <div className="flex gap-2">
          <Button
            onClick={() => setShowCreatePR(!showCreatePR)}
            className="gap-2"
          >
            <GitPullRequest className="h-4 w-4" />
            Create Pull Request
          </Button>
          <Button
            onClick={loadPullRequests}
            variant="outline"
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>

        {showCreatePR && (
          <div className="border rounded-lg p-4 space-y-4">
            <h3 className="font-semibold">Create New Pull Request</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pr-base">Base Branch</Label>
                <Input
                  id="pr-base"
                  value={prBaseBranch}
                  onChange={(e) => setPrBaseBranch(e.target.value)}
                  placeholder="main"
                />
              </div>
              <div>
                <Label htmlFor="pr-head">Head Branch</Label>
                <Input
                  id="pr-head"
                  value={prHeadBranch}
                  onChange={(e) => setPrHeadBranch(e.target.value)}
                  placeholder="content-ai-updates"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="pr-title">Title</Label>
              <Input
                id="pr-title"
                value={prTitle}
                onChange={(e) => setPrTitle(e.target.value)}
                placeholder="Update content strategy"
              />
            </div>

            <div>
              <Label htmlFor="pr-body">Description</Label>
              <Textarea
                id="pr-body"
                value={prBody}
                onChange={(e) => setPrBody(e.target.value)}
                placeholder="Describe your changes..."
                rows={4}
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={createPullRequest}
                disabled={isLoading || !prTitle.trim()}
                className="gap-2"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                Create PR
              </Button>
              <Button
                onClick={() => setShowCreatePR(false)}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Recent Pull Requests
          </h3>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="ml-2">Loading pull requests...</span>
            </div>
          ) : pullRequests.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No pull requests found
            </p>
          ) : (
            <ScrollArea className="h-64">
              <div className="space-y-3">
                {pullRequests.map((pr) => (
                  <div
                    key={pr.id}
                    className="border rounded-lg p-3 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={getPRStatusColor(pr.state)}>
                            {pr.state}
                          </Badge>
                          <h4 className="font-medium truncate">{pr.title}</h4>
                        </div>
                        {pr.body && (
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                            {pr.body}
                          </p>
                        )}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>{pr.user.login}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{formatRelativeTime(new Date(pr.created_at))}</span>
                          </div>
                        </div>
                      </div>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={() => viewPullRequest(pr)}
                            variant="ghost"
                            size="icon"
                            className="ml-2"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View pull request</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GitHubCollaboration;