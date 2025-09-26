"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Github, 
  TrendingUp,
  GitCommit,
  Calendar,
  Users,
  Activity,
  BarChart3,
  Clock,
  Download,
  XCircle,
  Loader2,
  User
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useGitHubSync } from "@/hooks/use-github-sync";
import { showSuccess, showError } from "@/utils/toast";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface GitHubAnalyticsProps {
  repo?: string;
}

interface CommitData {
  date: string;
  count: number;
}

interface ContributorData {
  author: {
    login: string;
    avatar_url: string;
  };
  total: number;
}

const GitHubAnalytics = ({ repo }: GitHubAnalyticsProps) => {
  const { isConnected, syncManager } = useGitHubSync();
  const [commitData, setCommitData] = useState<CommitData[]>([]);
  const [contributors, setContributors] = useState<ContributorData[]>([]);
  const [repoStats, setRepoStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [timeRange, setTimeRange] = useState('30');

  useEffect(() => {
    if (isConnected) {
      loadAnalytics();
    }
  }, [isConnected, timeRange]);

  const loadAnalytics = async () => {
    setIsLoading(true);
    try {
      const repoName = repo || syncManager?.config?.repo;
      if (!repoName) return;

      // Load commit activity
      const commitsResponse = await fetch(`https://api.github.com/repos/${repoName}/stats/commit_activity`, {
        headers: {
          'Authorization': `token ${syncManager?.config?.token}`,
        },
      });

      if (commitsResponse.ok) {
        const commits = await commitsResponse.json();
        const formattedData = commits.slice(-parseInt(timeRange)).map((week: any, index: number) => ({
          date: new Date(Date.now() - (parseInt(timeRange) - index - 1) * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          count: week.total
        }));
        setCommitData(formattedData);
      }

      // Load contributors
      const contributorsResponse = await fetch(`https://api.github.com/repos/${repoName}/stats/contributors`, {
        headers: {
          'Authorization': `token ${syncManager?.config?.token}`,
        },
      });

      if (contributorsResponse.ok) {
        const contributors = await contributorsResponse.json();
        setContributors(contributors.slice(0, 5)); // Top 5 contributors
      }

      // Load repository stats
      const repoResponse = await fetch(`https://api.github.com/repos/${repoName}`, {
        headers: {
          'Authorization': `token ${syncManager?.config?.token}`,
        },
      });

      if (repoResponse.ok) {
        const stats = await repoResponse.json();
        setRepoStats(stats);
      }

    } catch (error) {
      console.error('Failed to load analytics:', error);
      showError('Failed to load GitHub analytics');
    } finally {
      setIsLoading(false);
    }
  };

  const exportAnalytics = () => {
    const analyticsData = {
      commitData,
      contributors,
      repoStats,
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(analyticsData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `github-analytics-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    showSuccess('Analytics exported successfully');
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
    <div className="space-y-6">
      {/* Repository Overview */}
      {repoStats && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Github className="h-6 w-6" />
              Repository Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">
                  {repoStats.stargazers_count}
                </div>
                <div className="text-sm text-muted-foreground">Stars</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">
                  {repoStats.forks_count}
                </div>
                <div className="text-sm text-muted-foreground">Forks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-500">
                  {repoStats.open_issues_count}
                </div>
                <div className="text-sm text-muted-foreground">Issues</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-500">
                  {repoStats.watchers_count}
                </div>
                <div className="text-sm text-muted-foreground">Watchers</div>
              </div>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              <div>Created: {new Date(repoStats.created_at).toLocaleDateString()}</div>
              <div>Last updated: {new Date(repoStats.updated_at).toLocaleDateString()}</div>
              <div>Default branch: {repoStats.default_branch}</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Commit Activity Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-6 w-6" />
            Commit Activity
          </CardTitle>
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={exportAnalytics} variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Export analytics data</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="ml-2">Loading analytics...</span>
            </div>
          ) : commitData.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No commit data available
            </p>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={commitData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <RechartsTooltip />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Top Contributors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-6 w-6" />
            Top Contributors
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="ml-2">Loading contributors...</span>
            </div>
          ) : contributors.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No contributor data available
            </p>
          ) : (
            <div className="space-y-3">
              {contributors.map((contributor, index) => (
                <div key={contributor.author.login} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                      {contributor.author.avatar_url ? (
                        <img 
                          src={contributor.author.avatar_url} 
                          alt={contributor.author.login}
                          className="w-8 h-8 rounded-full"
                        />
                      ) : (
                        <User className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{contributor.author.login}</div>
                      <Badge variant="outline" className="text-xs">
                        #{index + 1}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{contributor.total}</div>
                    <div className="text-xs text-muted-foreground">commits</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GitHubAnalytics;