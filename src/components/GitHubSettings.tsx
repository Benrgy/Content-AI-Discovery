"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Github, 
  Save, 
  RefreshCw,
  GitBranch,
  Settings,
  CheckCircle,
  XCircle
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useGitHubSync } from "@/hooks/use-github-sync";
import { showSuccess, showError } from "@/utils/toast";
import { useLocalStorage } from "@/hooks/use-local-storage";

const GitHubSettings = () => {
  const [token, setToken] = useLocalStorage<string>('github-token', '');
  const [repo, setRepo] = useLocalStorage<string>('github-repo', '');
  const [branch, setBranch] = useLocalStorage<string>('github-branch', 'main');
  const [autoSync, setAutoSync] = useLocalStorage<boolean>('github-auto-sync', false);
  const [syncFrequency, setSyncFrequency] = useLocalStorage<string>('github-sync-frequency', 'manual');
  
  const { isConnected, isLoading, connectToGitHub, disconnectFromGitHub } = useGitHubSync();

  const handleSaveSettings = async () => {
    try {
      if (token && repo) {
        await connectToGitHub(token, repo);
        showSuccess('GitHub settings saved and connected');
      } else {
        showError('Please provide both token and repository');
      }
    } catch (error) {
      showError('Failed to save GitHub settings');
    }
  };

  const handleDisconnect = () => {
    disconnectFromGitHub();
    setToken('');
    setRepo('');
    showSuccess('Disconnected from GitHub');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Github className="h-6 w-6" />
          GitHub Integration Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <Settings className="h-4 w-4" />
          <AlertTitle>GitHub Configuration</AlertTitle>
          <AlertDescription>
            Configure your GitHub integration for seamless content synchronization.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div>
            <Label htmlFor="github-token">Personal Access Token</Label>
            <Input
              id="github-token"
              type="password"
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="font-mono"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Create a personal access token at github.com/settings/tokens with repo permissions
            </p>
          </div>

          <div>
            <Label htmlFor="github-repo">Repository</Label>
            <Input
              id="github-repo"
              placeholder="username/repository-name"
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
            />
            <p className="text-sm text-muted-foreground mt-1">
              Format: owner/repository-name
            </p>
          </div>

          <div>
            <Label htmlFor="github-branch">Branch</Label>
            <Select value={branch} onValueChange={setBranch}>
              <SelectTrigger id="github-branch">
                <SelectValue placeholder="Select branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="main">main</SelectItem>
                <SelectItem value="master">master</SelectItem>
                <SelectItem value="develop">develop</SelectItem>
                <SelectItem value="content-ai">content-ai</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="auto-sync">Auto-sync</Label>
            <Switch
              id="auto-sync"
              checked={autoSync}
              onCheckedChange={setAutoSync}
            />
          </div>

          {autoSync && (
            <div>
              <Label htmlFor="sync-frequency">Sync Frequency</Label>
              <Select value={syncFrequency} onValueChange={setSyncFrequency}>
                <SelectTrigger id="sync-frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Manual</SelectItem>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex items-center gap-2">
            {isConnected ? (
              <Badge variant="default" className="gap-1">
                <CheckCircle className="h-3 w-3" />
                Connected
              </Badge>
            ) : (
              <Badge variant="secondary" className="gap-1">
                <XCircle className="h-3 w-3" />
                Not Connected
              </Badge>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={handleSaveSettings}
            disabled={isLoading}
            className="gap-2"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Save Settings
          </Button>

          {isConnected && (
            <Button 
              onClick={handleDisconnect}
              variant="outline"
              className="gap-2"
            >
              <XCircle className="h-4 w-4" />
              Disconnect
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GitHubSettings;