"use client";

import PageLayout from "@/components/PageLayout";
import GitHubSettings from "@/components/GitHubSettings";
import GitHubSyncAdvanced from "@/components/GitHubSyncAdvanced";
import GitHubContentViewer from "@/components/GitHubContentViewer";
import GitHubCollaboration from "@/components/GitHubCollaboration";
import GitHubAnalytics from "@/components/GitHubAnalytics";
import GitHubWorkflows from "@/components/GitHubWorkflows";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, 
  GitBranch, 
  Users, 
  BarChart3, 
  Workflow,
  FileText
} from "lucide-react";
import { useSavedContent } from "@/hooks/use-saved-content";
import { useGenerationHistory } from "@/hooks/use-generation-history";

const GitHubIntegration = () => {
  const { savedItems } = useSavedContent();
  const { history } = useGenerationHistory();

  // Combine all content for sync
  const allContent = {
    savedItems,
    generationHistory: history,
    timestamp: new Date().toISOString()
  };

  return (
    <PageLayout
      title="GitHub Integration"
      description="Advanced GitHub integration for content management, collaboration, and automation"
    >
      <Tabs defaultValue="settings" className="w-full">
        <TabsList className="grid grid-cols-2 lg:grid-cols-6 mb-8">
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="sync" className="flex items-center gap-2">
            <GitBranch className="h-4 w-4" />
            Sync
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Content
          </TabsTrigger>
          <TabsTrigger value="collaboration" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Collaboration
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="workflows" className="flex items-center gap-2">
            <Workflow className="h-4 w-4" />
            Workflows
          </TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="mt-0">
          <GitHubSettings />
        </TabsContent>

        <TabsContent value="sync" className="mt-0">
          <GitHubSyncAdvanced 
            content={allContent}
            onSyncComplete={(status) => {
              if (status) {
                // Handle successful sync
                console.log('GitHub sync completed successfully');
              }
            }}
          />
        </TabsContent>

        <TabsContent value="content" className="mt-0">
          <GitHubContentViewer 
            filePath="content-ai-data.json"
            defaultContent={allContent}
          />
        </TabsContent>

        <TabsContent value="collaboration" className="mt-0">
          <GitHubCollaboration 
            content={allContent}
            filePath="content-ai-data.json"
          />
        </TabsContent>

        <TabsContent value="analytics" className="mt-0">
          <GitHubAnalytics />
        </TabsContent>

        <TabsContent value="workflows" className="mt-0">
          <GitHubWorkflows 
            onWorkflowRun={(workflow) => {
              console.log('Workflow triggered:', workflow.name);
            }}
          />
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default GitHubIntegration;