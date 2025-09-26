"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnalyticsData } from "@/types/content";

interface TrendAnalysisCardProps {
  analyticsData: AnalyticsData;
}

const TrendAnalysisCard = ({ analyticsData }: TrendAnalysisCardProps) => {
  // Calculate growth percentage
  const firstDay = analyticsData.engagementOverTime[0].value;
  const lastDay = analyticsData.engagementOverTime[analyticsData.engagementOverTime.length - 1].value;
  const growthPercent = ((lastDay - firstDay) / firstDay * 100).toFixed(1);

  // Get rising categories
  const risingCategories = analyticsData.categoryPerformance
    .filter(cat => cat.performanceScore > analyticsData.averagePerformanceScore);

  // Get top platform
  const topPlatform = Object.entries(analyticsData.platformDistribution)
    .sort((a, b) => b[1] - a[1])[0][0];

  // Get category with low count for diversification
  const diversifyCategory = analyticsData.categoryPerformance
    .filter(cat => cat.count < 2)[0]?.category || "new categories";

  return (
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
              {risingCategories.map(cat => (
                <Badge key={cat.category} variant="outline" className="capitalize">
                  {cat.category}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-1">Engagement Growth</h3>
            <p className="text-sm text-muted-foreground">
              {growthPercent}% growth over the past {analyticsData.engagementOverTime.length} days
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-1">Content Recommendations</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Focus on {analyticsData.categoryPerformance[0].category} content</li>
              <li>• Prioritize {topPlatform} for highest engagement</li>
              <li>• Experiment with {diversifyCategory} to diversify</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendAnalysisCard;