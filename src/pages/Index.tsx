"use client";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Search, 
  Sparkles, 
  BarChart, 
  ArrowRight, 
  Lightbulb, 
  Zap, 
  Clock, 
  LineChart,
  TrendingUp,
  Users,
  Target,
  Award
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import ContentRecommendations from "@/components/ContentRecommendations";
import ContentStats from "@/components/ContentStats";
import QuickActions from "@/components/QuickActions";
import TrendingTopics from "@/components/TrendingTopics";
import RecentActivity from "@/components/RecentActivity";
import FeatureTour from "@/components/FeatureTour";
import { useContentDiscoveryData } from "@/hooks/use-content-discovery-data";
import LoadingScreen from "@/components/LoadingScreen";
import { useState, useEffect } from "react";

const Index = () => {
  console.log("Index: Component rendering");
  
  const { data: contentData, isLoading } = useContentDiscoveryData();
  const [showTour, setShowTour] = useState(false);
  
  // Check if user is new
  useEffect(() => {
    const hasCompletedTour = localStorage.getItem('hasCompletedTour');
    if (!hasCompletedTour) {
      setTimeout(() => setShowTour(true), 1000);
    }
  }, []);

  const handleTourComplete = () => {
    setShowTour(false);
    localStorage.setItem('hasCompletedTour', 'true');
  };

  const getTopRecommendations = () => {
    if (!contentData) return [];
    return contentData
      .sort((a, b) => (b.performanceScore || 0) - (a.performanceScore || 0))
      .slice(0, 3);
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex justify-center py-8">
          <LoadingScreen size="lg" text="Loading trending content..." />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      className="items-center justify-center text-center max-w-5xl"
      title="ContentAI"
      description="Your AI-Powered Content Discovery & Generation Platform. Discover viral trends and create optimized content effortlessly."
    >
      {/* Feature Tour Modal */}
      <FeatureTour 
        isOpen={showTour} 
        onClose={handleTourComplete} 
      />

      <div className="flex flex-col items-center mb-12">
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild size="lg" className="px-8 py-6 text-lg gap-2">
                <Link to="/discover">
                  <Search className="h-5 w-5 mr-2" />
                  Discover Content
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Find high-performing content across platforms</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild size="lg" className="px-8 py-6 text-lg gap-2" variant="outline">
                <Link to="/generate">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Generate Content
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Create AI-powered content for multiple platforms</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild size="lg" className="px-8 py-6 text-lg gap-2" variant="secondary">
                <Link to="/analytics">
                  <BarChart className="h-5 w-5 mr-2" />
                  View Analytics
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Analyze content performance metrics</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Content Statistics */}
      <ContentStats />

      {/* Quick Actions & Trending Topics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12 w-full">
        <div className="lg:col-span-1">
          <QuickActions />
        </div>
        <div className="lg:col-span-2">
          <TrendingTopics />
        </div>
      </div>

      {/* Recent Activity & Top Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12 w-full">
        <RecentActivity />
        <div>
          <h2 className="text-2xl font-bold mb-6">Top Performing Content</h2>
          <ContentRecommendations
            title=""
            description=""
            recommendations={getTopRecommendations()}
          />
        </div>
      </div>
      
      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full">
        <Card>
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardTitle>Discover Trends</CardTitle>
            <CardDescription>
              Find high-performing content across multiple platforms with real engagement metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Our discovery engine surfaces viral content from LinkedIn, TikTok, Twitter, Instagram, YouTube, and blogs.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="ghost" asChild className="gap-1">
              <Link to="/discover">
                Explore Content <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardTitle>Generate Content</CardTitle>
            <CardDescription>
              Create platform-optimized content variants with our advanced AI generation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Generate tailored content for each platform with appropriate formatting, hashtags, and calls-to-action.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="ghost" asChild className="gap-1">
              <Link to="/generate">
                Create Content <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <LineChart className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardTitle>Analyze Performance</CardTitle>
            <CardDescription>
              Track content metrics and identify patterns that drive engagement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Our analytics dashboard helps you understand what makes content go viral across different platforms.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="ghost" asChild className="gap-1">
              <Link to="/analytics">
                View Analytics <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="bg-muted p-6 rounded-lg w-full">
        <h2 className="text-xl font-bold mb-4">Ready to transform your content strategy?</h2>
        <p className="text-muted-foreground mb-6">
          Join thousands of content creators, social media managers, and marketers who are leveraging AI to create viral content.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link to="/discover">Get Started Now</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/analytics">View Demo Analytics</Link>
          </Button>
          <Button 
            variant="ghost" 
            size="lg"
            onClick={() => setShowTour(true)}
          >
            Take a Tour
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Index;