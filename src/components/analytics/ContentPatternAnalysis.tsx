"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ArrowRight, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { ContentItem, AnalyticsData } from "@/types/content";

interface ContentPatternAnalysisProps {
  topContent: ContentItem[];
  analyticsData: AnalyticsData;
}

const ContentPatternAnalysis = ({ topContent, analyticsData }: ContentPatternAnalysisProps) => {
  console.log("ContentPatternAnalysis: Component rendering");
  
  // Calculate platform distribution
  const platformDistribution = topContent.reduce((acc, content) => {
    acc[content.platform] = (acc[content.platform] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Calculate category distribution
  const categoryDistribution = topContent.reduce((acc, content) => {
    if (content.category) {
      acc[content.category] = (acc[content.category] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  // Calculate content patterns
  const numberedListCount = topContent.filter(c => c.title.match(/\d+/)).length;
  const questionTitlesCount = topContent.filter(c => c.title.includes('?')).length;
  const howToContentCount = topContent.filter(
    c => c.title.toLowerCase().includes('how to') || c.description.toLowerCase().includes('how to')
  ).length;

  return (
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
              {Object.entries(platformDistribution).map(([platform, count]) => (
                <Badge key={platform} className="capitalize">
                  {platform}: {count}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Category Distribution</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(categoryDistribution).map(([category, count]) => (
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
                  <strong>Numbered Lists:</strong> {numberedListCount} of top posts use numbers in titles
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>
                  <strong>Question Titles:</strong> {questionTitlesCount} of top posts use questions
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>
                  <strong>How-to Content:</strong> {howToContentCount} of top posts use how-to format
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
                  "{analyticsData.categoryPerformance[0].category} guide: {topContent.length} ways to improve your {topContent[0].platform} strategy"
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
  );
};

export default ContentPatternAnalysis;