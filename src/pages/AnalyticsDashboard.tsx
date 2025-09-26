"use client";

import { useState } from "react";
import { useAnalyticsData } from "@/hooks/use-analytics-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart as BarChartIcon, 
  PieChart, 
  LineChart, 
  TrendingUp
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { getPerformanceColor, formatNumber } from "@/constants/content-constants";

// Import modular components
import OverviewMetricCard from "@/components/analytics/OverviewMetricCard";
import PlatformDistributionChart from "@/components/analytics/PlatformDistributionChart";
import CategoryPerformanceChart from "@/components/analytics/CategoryPerformanceChart";
import EngagementTrendChart from "@/components/analytics/EngagementTrendChart";
import TopContentSection from "@/components/analytics/TopContentSection";
import PlatformInsightsAlert from "@/components/analytics/PlatformInsightsAlert";
import PlatformCards from "@/components/analytics/PlatformCards";
import TrendAnalysisCard from "@/components/analytics/TrendAnalysisCard";
import ContentPatternAnalysis from "@/components/analytics/ContentPatternAnalysis";
import CategoryComparisonChart from "@/components/analytics/CategoryComparisonChart";
import LoadingState from "@/components/analytics/LoadingState";
import ErrorState from "@/components/analytics/ErrorState";

// Constants
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

  // Format data for charts when available
  const platformData = analyticsData ? Object.entries(analyticsData.platformDistribution).map(
    ([name, value]) => ({ name, value })
  ) : [];

  const engagementData = analyticsData?.engagementOverTime.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: item.value
  }));

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
          <LoadingState />
        ) : isError ? (
          <ErrorState onRetry={refetch} isRetrying={isFetching} />
        ) : (
          <>
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <OverviewMetricCard
                  title="Total Engagement"
                  value={formatNumber(analyticsData.totalEngagement)}
                  description="Combined likes, comments, shares across all platforms"
                />
                
                <OverviewMetricCard
                  title="Average Performance"
                  value={analyticsData.averagePerformanceScore.toFixed(1)}
                  valueClassName={getPerformanceColor(analyticsData.averagePerformanceScore)}
                  description="Average performance score (0-100)"
                />
                
                <OverviewMetricCard
                  title="Top Platform"
                  value={Object.entries(analyticsData.platformDistribution)
                    .sort((a, b) => b[1] - a[1])[0][0]}
                  description={`${Object.entries(analyticsData.platformDistribution)
                    .sort((a, b) => b[1] - a[1])[0][1]}% of top performing content`}
                />
                
                <OverviewMetricCard
                  title="Top Category"
                  value={analyticsData.categoryPerformance[0].category}
                  description={`Average score: ${analyticsData.categoryPerformance[0].performanceScore}`}
                />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PlatformDistributionChart 
                  data={platformData} 
                  colorMap={PLATFORM_COLORS} 
                />
                
                <CategoryPerformanceChart 
                  data={categoryData} 
                  colors={CATEGORY_COLORS} 
                />
              </div>
              
              <EngagementTrendChart 
                data={engagementData} 
                description="Total engagement trends over the past 20 days" 
              />
              
              <TopContentSection topContent={analyticsData.topPerformingContent} />
            </TabsContent>
            
            {/* Platforms Tab */}
            <TabsContent value="platforms" className="space-y-8">
              <PlatformDistributionChart 
                data={platformData} 
                colorMap={PLATFORM_COLORS} 
                title="Platform Performance Distribution"
                description="Breakdown of content performance by platform"
                height={96}
              />
              
              <PlatformCards 
                platformDistribution={analyticsData.platformDistribution} 
                topPerformingContent={analyticsData.topPerformingContent} 
              />
              
              <PlatformInsightsAlert platformDistribution={analyticsData.platformDistribution} />
            </TabsContent>
            
            {/* Trends Tab */}
            <TabsContent value="trends" className="space-y-8">
              <EngagementTrendChart 
                data={engagementData} 
                title="Engagement Trends"
                description="Daily engagement metrics over the past 20 days"
                height={96}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CategoryComparisonChart data={categoryData} />
                
                <TrendAnalysisCard analyticsData={analyticsData} />
              </div>
            </TabsContent>
            
            {/* Top Content Tab */}
            <TabsContent value="top-content" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {analyticsData.topPerformingContent.map((content) => (
                  <ContentCard key={content.id} {...content} />
                ))}
              </div>
              
              <ContentPatternAnalysis 
                topContent={analyticsData.topPerformingContent} 
                analyticsData={analyticsData} 
              />
            </TabsContent>
          </>
        )}
      </Tabs>
    </PageLayout>
  );
};

export default AnalyticsDashboard;