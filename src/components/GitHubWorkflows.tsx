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
  Play,
  Settings,
  FileText,
  Download,
  Upload,
  CheckCircle,
  XCircle,
  Loader2,
  Zap,
  Workflow
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useGitHubSync } from "@/hooks/use-github-sync";
import { showSuccess, showError, showInfo } from "@/utils/toast";
import { ScrollArea } from "@/components/ui/scroll-area";

interface GitHubWorkflowsProps {
  onWorkflowRun?: (workflow: any) => void;
}

interface Workflow {
  id: number;
  name: string;
  path: string;
  state: 'active' | 'disabled';
  created_at: string;
  updated_at: string;
}

interface WorkflowRun {
  id: number;
  name: string;
  status: 'queued' | 'in_progress' | 'completed';
  conclusion: 'success' | 'failure' | 'cancelled' | 'skipped';
  created_at: string;
  updated_at: string;
  html_url: string;
}

const GitHubWorkflows = ({ onWorkflowRun }: GitHubWorkflowsProps) => {
  const { isConnected, syncManager } = useGitHubSync();
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [workflowRuns, setWorkflowRuns] = useState<WorkflowRun[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateWorkflow, setShowCreateWorkflow] = useState(false);
  const [workflowName, setWorkflowName] = useState('');
  const [workflowContent, setWorkflowContent] = useState('');

  // Default workflow template for content automation
  const defaultWorkflowTemplate = `name: Content AI Sync

on:
  push:
    branches: [ main ]
  schedule:
    - cron: '0 2 * * *'  # Run daily at 2 AM
  workflow_dispatch:

jobs:
  sync-content:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run content sync
        run: npm run sync-content
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
      
      - name: Commit changes
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add -A
          git diff --quiet && git diff --staged --quiet || git commit -m "Automated content sync"
          git push
`;

  useEffect(() => {
    if (isConnected) {
      loadWorkflows();
      loadWorkflowRuns();
    }
  }, [isConnected]);

  const loadWorkflows = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://api.github.com/repos/${syncManager?.config?.repo}/actions/workflows`, {
        headers: {
          'Authorization': `token ${syncManager?.config?.token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setWorkflows(data.workflows);
      }
    } catch (error) {
      console.error('Failed to load workflows:', error);
      showError('Failed to load GitHub workflows');
    } finally {
      setIsLoading(false);
    }
  };

  const loadWorkflowRuns = async () => {
    try {
      const response = await fetch(`https://api.github.com/repos/${syncManager?.config?.repo}/actions/runs`, {
        headers: {
          'Authorization': `token ${syncManager?.config?.token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setWorkflowRuns(data.workflow_runs.slice(0, 10)); // Last 10 runs
      }
    } catch (error) {
      console.error('Failed to load workflow runs:', error);
    }
  };

  const createWorkflow = async () => {
    if (!workflowName.trim()) {
      showError('Please enter a workflow name');
      return;
    }

    setIsLoading(true);
    try {
      const workflowPath = `.github/workflows/${workflowName.toLowerCase().replace(/\s+/g, '-')}.yml`;
      const workflowContentToSave = workflowContent || defaultWorkflowTemplate;

      await syncManager.syncContent(
        workflowContentToSave,
        workflowPath,
        `Add GitHub workflow: ${workflowName}`
      );

      showSuccess(`Workflow created: ${workflowName}`);
      setShowCreateWorkflow(false);
      setWorkflowName('');
      setWorkflowContent('');
      await loadWorkflows();
    } catch (error) {
      showError(`Failed to create workflow: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const triggerWorkflow = async (workflow: Workflow) => {
    try {
      const response = await fetch(`https://api.github.com/repos/${syncManager?.config?.repo}/actions/workflows/${workflow.id}/dispatches`, {
        method: 'POST',
        headers: {
          'Authorization': `token ${syncManager?.config?.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ref: 'main',
          inputs: {}
        }),
      });

      if (response.ok) {
        showSuccess(`Workflow triggered: ${workflow.name}`);
        onWorkflowRun?.(workflow);
        setTimeout(loadWorkflowRuns, 2000); // Refresh runs after delay
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      showError(`Failed to trigger workflow: ${error.message}`);
    }
  };

  const getWorkflowStatusColor = (state: string) => {
    switch (state) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'disabled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getRunStatusColor = (status: string, conclusion: string) => {
    if (status === 'completed') {
      switch (conclusion) {
        case 'success':
          return 'bg-green-100 text-green-800';
        case 'failure':
          return 'bg-red-100 text-red-800';
        case 'cancelled':
          return 'bg-yellow-100 text-yellow-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    }
    return 'bg-blue-100 text-blue-800';
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
          <Workflow className="h-6 w-6" />
          GitHub Actions Workflows
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <Zap className="h-4 w-4" />
          <AlertTitle>Automated Workflows</AlertTitle>
          <AlertDescription>
            Create and manage GitHub Actions workflows for automated content processing and deployment.
          </AlertDescription>
        </Alert>

        <div className="flex gap-2">
          <Button
            onClick={() => setShowCreateWorkflow(!showCreateWorkflow)}
            className="gap-2"
          >
            <Settings className="h-4 w-4" />
            Create Workflow
          </Button>
          <Button
            onClick={loadWorkflows}
            variant="outline"
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>

        {showCreateWorkflow && (
          <div className="border rounded-lg p-4 space-y-4">
            <h3 className="font-semibold">Create New Workflow</h3>
            
            <div>
              <Label htmlFor="workflow-name">Workflow Name</Label>
              <Input
                id="workflow-name"
                value={workflowName}
                onChange={(e) => setWorkflowName(e.target.value)}
                placeholder="Content Sync Workflow"
              />
            </div>

            <div>
              <Label htmlFor="workflow-content">Workflow YAML</Label>
              <Textarea
                id="workflow-content"
                value={workflowContent}
                onChange={(e) => setWorkflowContent(e.target.value)}
                placeholder="Enter workflow YAML content..."
                className="font-mono text-sm min-h-[200px]"
                defaultValue={defaultWorkflowTemplate}
              />
              <p className="text-sm text-muted-foreground mt-1">
                Use YAML format for GitHub Actions workflow
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={createWorkflow}
                disabled={isLoading || !workflowName.trim()}
                className="gap-2"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
                Create Workflow
              </Button>
              <Button
                onClick={() => setShowCreateWorkflow(false)}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Workflows List */}
        <div>
          <h3 className="font-semibold mb-3">Available Workflows</h3>
          {workflows.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No workflows found
            </p>
          ) : (
            <div className="space-y-3">
              {workflows.map((workflow) => (
                <div
                  key={workflow.id}
                  className="border rounded-lg p-3 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium truncate">{workflow.name}</h4>
                        <Badge className={getWorkflowStatusColor(workflow.state)}>
                          {workflow.state}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {workflow.path}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div>Updated: {new Date(workflow.updated_at).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={() => triggerWorkflow(workflow)}
                            size="sm"
                            className="gap-1"
                          >
                            <Play className="h-3 w-3" />
                            Run
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Trigger workflow</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Workflow Runs */}
        <div>
          <h3 className="font-semibold mb-3">Recent Workflow Runs</h3>
          {workflowRuns.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No workflow runs found
            </p>
          ) : (
            <ScrollArea className="h-48">
              <div className="space-y-2">
                {workflowRuns.map((run) => (
                  <div
                    key={run.id}
                    className="flex items-center justify-between p-2 rounded-md bg-muted/50"
                  >
                    <div className="flex items-center gap-2">
                      <Badge className={getRunStatusColor(run.status, run.conclusion)}>
                        {run.status === 'completed' ? run.conclusion : run.status}
                      </Badge>
                      <div className="min-w-0">
                        <div className="text-sm font-medium truncate">
                          {run.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(run.created_at).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => window.open(run.html_url, '_blank')}
                      variant="ghost"
                      size="sm"
                    >
                      <Eye className="h-3 w-3" />
                    </Button>
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

export default GitHubWorkflows;