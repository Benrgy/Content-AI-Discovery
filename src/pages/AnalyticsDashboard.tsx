"use client";

import { useState } from "react";
import { useAnalyticsData } from "@/hooks/use-analytics-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart as BarChartIcon, 
  PieChart, 
  LineChart, 
  TrendingUp, 
  AlertCircle, 
  Loader2, 
  ArrowRight,
  Info
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { formatNumber, getPerformanceColor } from "@/constants/content-constants";
import ContentCard from "@/components/ContentCard";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart as RechartsLineChart,
  Line,
  Legend
} from "recharts";

const PLATFORM_COLORS = {
  linkedin: "#0077B5",
  tiktok: "#000000",
  twitter: "#1DA1F2",
  instagram: "#E1306C",
  youtube: "#FF0000",
  blog: "#FF8A00"
};

const CATEGORY_COLORS = [
  "#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d", 
  "#a4de6c", "#d0ed57", "#ffc658", "#ff8042"
];

const AnalyticsDashboard = () => {
  const { data: analyticsData, isLoading, isError, refetch, isFetching } = useAnalyticsData();
  const [activeTab, setActiveTab] = useState("overview");

  // Format platform distribution data for pie chart
  const platformData = analyticsData ? Object.entries(analyticsData.platformDistribution).map(
    ([name, value]) => ({ name, value })
  ) : [];

  // Format engagement over time data for line chart
  const engagementData = analyticsData?.engagementOverTime.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: item.value
  }));

  // Format category performance data for bar chart
  const categoryData = analyticsData?.categoryPerformance.sort(
    (a, b) => b.performanceScore - a.performanceScore
  );

  return (
    <PageLayout
      title="Performance Analytics Dashboard"
      description="Analyze content performance metrics and identify viral patterns across platforms."
    >
      <Tabs 
        defaultValue="overview" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="max-w-5xl mx-auto w-full"
      >
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChartIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="platforms" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            <span className="hidden sm:inline">Platforms</span>
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            <span className="hidden sm:inline">Trends</span>
          </TabsTrigger>
          <TabsTrigger value="top-content" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Top Content</span>
          </TabsTrigger>
        </TabsList>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-8 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full" />
                </CardContent>
              </Card>
            ))}
            <Card className="col-span-1 md:col-span-2 lg:col-span-4">
              <CardHeader>
                <Skeleton className="h-6 w-1/4" />
              </CardHeader>
              <CardContent className="h-80">
                <Skeleton className="h-full w-full" />
              </CardContent>
            </Card>
          </div>
        ) : isError ? (
          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="flex items-center gap-4">
              Failed to load analytics data. Please try refreshing the page.
              <Button onClick={() => refetch()} disabled={isFetching}>
                {isFetching ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Retrying...
                  </>
                ) : (
                  "Retry"
                )}
              </Button>
            </AlertDescription>
          </Alert>
        ) : (
          <>
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Total Engagement</CardDescription>
                    <CardTitle className="text-3xl">
                      {formatNumber(analyticsData.totalEngagement)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Combined likes, comments, shares across all platforms
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Average Performance</CardDescription>
                    <CardTitle className={`text-3xl ${getPerformanceColor(analyticsData.averagePerformanceScore)}`}>
                      {analyticsData.averagePerformanceScore.toFixed(1)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Average performance score (0-100)
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Top Platform</CardDescription>
                    <CardTitle className="text-2xl capitalize">
                      {Object.entries(analyticsData.platformDistribution)
                        .sort((a, b) => b[1] - a[1])[0][0]}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {Object.entries(analyticsData.platformDistribution)
                        .sort((a, b) => b[1] - a[1])[0][1]}% of top performing content
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Top Category</CardDescription>
                    <CardTitle className="text-2xl capitalize">
                      {analyticsData.categoryPerformance[0].category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Average score: {analyticsData.categoryPerformance[0].performanceScore}
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Platform Distribution</CardTitle>
                    <CardDescription>
                      Content performance by platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={platformData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {platformData.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={PLATFORM_COLORS[entry.name as keyof typeof PLATFORM_COLORS] || "#8884d8"} 
                              />
                            ))}
                          </Pie>
                          <Legend />
                          <RechartsTooltip />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Category Performance</CardTitle>
                    <CardDescription>
                      Average performance score by content category
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={categoryData}
                          layout="vertical"
                          margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                          <XAxis type="number" domain={[0, 100]} />
                          <YAxis 
                            type="category" 
                            dataKey="category" 
                            tick={{ fontSize: 12 }}
                            width={80}
                          />
                          <RechartsTooltip 
                            formatter={(value, name) => [`Score: ${value}`, 'Performance']}
                            labelFormatter={(label) => `Category: ${label}`}
                          />
                          <Bar 
                            dataKey="performanceScore" 
                            fill="#8884d8"
                            radius={[0, 4, 4, 0]}
                          >
                            {categoryData?.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} 
                              />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Engagement Over Time</CardTitle>
                  <CardDescription>
                    Total engagement trends over the past 20 days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart
                        data={engagementData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="date" 
                          tick={{ fontSize: 12 }}
                          interval="preserveStartEnd"
                        />
                        <YAxis />
                        <RechartsTooltip 
                          formatter={(value) => [`${formatNumber(value as number)}`, 'Engagement']}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#8884d8" 
                          activeDot={{ r: 8 }} 
                          strokeWidth={2}
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Top Performing Content</CardTitle>
                    <CardDescription>
                      Content with the highest performance scores
                    </CardDescription>
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" asChild>
                        <Link to="/discover" className="flex items-center gap-1">
                          View All <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Explore all content in discovery</p>
                    </TooltipContent>
                  </Tooltip>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {analyticsData.topPerformingContent.slice(0, 3).map((content) => (
                      <ContentCard key={content.id} {...content} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Platforms Tab */}
            <TabsContent value="platforms" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Platform Performance Distribution</CardTitle>
                  <CardDescription>
                    Breakdown of content performance by platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={platformData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {platformData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={PLATFORM_COLORS[entry.name as keyof typeof PLATFORM_COLORS] || "#8884d8"} 
                            />
                          ))}
                        </Pie>
                        <Legend />
                        <RechartsTooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(analyticsData.platformDistribution)
                  .sort((a, b) => b[1] - a[1])
                  .map(([platform, percentage]) => (
                    <Card key={platform}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardDescription className="capitalize">{platform}</CardDescription>
                          <Badge>{percentage}%</Badge>
                        </div>
                        <CardTitle className="text-xl capitalize">
                          {platform}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-muted-foreground">
                            {analyticsData.topPerformingContent.filter(c => c.platform === platform).length} top performing posts
                          </p>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" asChild>
                                <Link to={`/discover?platform=${platform}`} className="flex items-center gap-1">
                                  View <ArrowRight className="h-3 w-3" />
                                </Link>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>View {platform} content</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
              
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Platform Insights</AlertTitle>
                <AlertDescription>
                  <p className="mb-2">Based on the current data analysis:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      <strong>{Object.entries(analyticsData.platformDistribution)
                        .sort((a, b) => b[1] - a[1])[0][0]}</strong> shows the highest performance overall
                    </li>
                    <li>
                      <strong>{Object.entries(analyticsData.platformDistribution)
                        .sort((a, b) => a[1] - b[1])[0][0]}</strong> has the lowest representation but may offer growth opportunities
                    </li>
                    <li>
                      Consider cross-platform content strategies to maximize reach
                    </li>
                  </ul>
                </AlertDescription>
              </Alert>
            </TabsContent>
            
            {/* Trends Tab */}
            <TabsContent value="trends" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Engagement Trends</CardTitle>
                  <CardDescription>
                    Daily engagement metrics over the past 20 days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart
                        data={engagementData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="date" 
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis />
                        <RechartsTooltip 
                          formatter={(value) => [`${formatNumber(value as number)}`, 'Engagement']}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          name="Total Engagement"
                          stroke="#8884d8" 
                          activeDot={{ r: 8 }} 
                          strokeWidth={2}
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Category Performance Trends</CardTitle>
                    <CardDescription>
                      Performance scores by content category
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={categoryData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="category" />
                          <YAxis domain={[0, 100]} />
                          <RechartsTooltip 
                            formatter={(value, name) => [
                              name === 'performanceScore' ? `Score: ${value}` : `Count: ${value}`,
                              name === 'performanceScore' ? 'Performance' : 'Content Count'
                            ]}
                          />
                          <Legend />
                          <Bar 
                            dataKey="performanceScore" 
                            name="Performance Score"
                            fill="#8884d8" 
                            radius={[4, 4, 0, 0]}
                          />
                          <Bar 
                            dataKey="count" 
                            name="Content Count"
                            fill="#82ca9d" 
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Trend Analysis</CardTitle>
                    <CardDescription>
                      Key insights from current content performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-1">Rising Categories</h3>
                        <div className="flex flex-wrap gap-2">
                          {analyticsData.categoryPerformance
                            .filter(cat => cat.performanceScore > analyticsData.averagePerformanceScore)
                            .map(cat => (
                              <Badge key={cat.category} variant="outline" className="capitalize">
                                {cat.category}
                              </Badge>
                            ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-1">Engagement Growth</h3>
                        <p className="text-sm text-muted-foreground">
                          {(() => {
                            const firstDay = analyticsData.engagementOverTime[0].value;
                            const lastDay = analyticsData.engagementOverTime[analyticsData.engagementOverTime.length - 1].value;
                            const growthPercent = ((lastDay - firstDay) / firstDay * 100).toFixed(1);
                            return `${growthPercent}% growth over the past 20 days`;
                          })()}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-1">Content Recommendations</h3>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Focus on {analyticsData.categoryPerformance[0].category} content</li>
                          <li>• Prioritize {Object.entries(analyticsData.platformDistribution)
                            .sort((a, b) => b[1] - a[1])[0][0]} for highest engagement</li>
                          <li>• Experiment with {analyticsData.categoryPerformance
                            .filter(cat => cat.count < 2)[0]?.category || "new categories"} to diversify</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Top Content Tab */}
            <TabsContent value="top-content" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {analyticsData.topPerformingContent.map((content) => (
                  <ContentCard key={content.id} {...content} />
                ))}
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Top Content Analysis</CardTitle>
                  <CardDescription>
                    Common patterns in high-performing content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Platform Distribution</h3>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(
                          analyticsData.topPerformingContent.reduce((acc, content) => {
                            acc[content.platform] = (acc[content.platform] || 0) + 1;
                            return acc;
                          }, {} as Record<string, number>)
                        ).map(([platform, count]) => (
                          <Badge key={platform} className="capitalize">
                            {platform}: {count}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Category Distribution</h3>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(
                          analyticsData.topPerformingContent.reduce((acc, content) => {
                            if (content.category) {
                              acc[content.category] = (acc[content.category] || 0) + 1;
                            }
                            return acc;
                          }, {} as Record<string, number>)
                        ).map(([category, count]) => (
                          <Badge key={category} variant="outline" className="capitalize">
                            {category}: {count}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Common Content Patterns</h3>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>
                            <strong>Numbered Lists:</strong> {analyticsData.topPerformingContent.filter(
                              c => c.title.match(/\d+/)
                            ).length} of top posts use numbers in titles
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>
                            <strong>Question Titles:</strong> {analyticsData.topPerformingContent.filter(
                              c => c.title.includes('?')
                            ).length} of top posts use questions
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>
                            <strong>How-to Content:</strong> {analyticsData.topPerformingContent.filter(
                              c => c.title.toLowerCase().includes('how to') || c.description.toLowerCase().includes('how to')
                            ).length} of top posts use how-to format
                          </span>
                        </li>
                      </ul>
                    </div>
                    
                    <Alert className="bg-primary/10 border-primary/20">
                      <Info className="h-4 w-4 text-primary" />
                      <AlertTitle className="text-primary">Content Strategy Recommendation</AlertTitle>
                      <AlertDescription className="text-sm">
                        Based on top performing content analysis, consider creating:
                        <div className="mt-2 pl-4 border-l-2 border-primary/30">
                          <p className="font-medium">
                            "{analyticsData.categoryPerformance[0].category} guide: {analyticsData.topPerformingContent.length} ways to improve your {analyticsData.topPerformingContent[0].platform} strategy"
                          </p>
                        </div>
                        <div className="mt-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link to="/generate" className="flex items-center gap-1">
                              Generate This Content <ArrowRight className="h-3 w-3" />
                            </Link>
                          </Button>
                        </div>
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </>
        )}
      </Tabs>
    </PageLayout>
  );
};

export default AnalyticsDashboard;