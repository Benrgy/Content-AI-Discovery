"use client";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Sparkles, 
  BarChart, 
  ArrowRight, 
  Lightbulb, 
  Zap, 
  Clock, 
  LineChart 
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import NavigationTest from "@/components/NavigationTest";
import ThemeTest from "@/components/ThemeTest";

const Index = () => {
  return (
    <PageLayout
      className="items-center justify-center text-center max-w-5xl"
      title="ContentAI"
      description="Your AI-Powered Content Discovery & Generation Platform. Discover viral trends and create optimized content effortlessly."
    >
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
      
      {/* Theme Test Component - Remove this in production */}
      <div className="mb-12">
        <ThemeTest />
      </div>
      
      {/* Navigation Test Component - Remove this in production */}
      <div className="mb-12">
        <NavigationTest />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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
      
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Why Choose ContentAI?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 text-left">
            <div className="p-2 rounded-full bg-primary/10 mt-1">
              <Search className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Performance-Driven Discovery</h3>
              <p className="text-sm text-muted-foreground">Surface only high-performing, trending content with real engagement metrics</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 text-left">
            <div className="p-2 rounded-full bg-primary/10 mt-1">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Multi-Platform AI Generation</h3>
              <p className="text-sm text-muted-foreground">Create platform-optimized content variants (TikTok, Instagram, YouTube, Blog)</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 text-left">
            <div className="p-2 rounded-full bg-primary/10 mt-1">
              <Clock className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Time-to-Market Acceleration</h3>
              <p className="text-sm text-muted-foreground">Reduce content creation time from hours to minutes</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 text-left">
            <div className="p-2 rounded-full bg-primary/10 mt-1">
              <BarChart className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Data-Backed Strategy</h3>
              <p className="text-sm text-muted-foreground">Make content decisions based on proven viral patterns</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-muted p-6 rounded-lg">
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
        </div>
      </div>
    </PageLayout>
  );
};

export default Index;