"use client";

import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Home, Search, ArrowLeft } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const NotFound = () => {
  console.log("NotFound: Component rendering");
  
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <PageLayout
      className="items-center justify-center rounded-lg p-6"
      title="404 - Page Not Found"
      description="Oops! The page you're looking for doesn't exist or has been moved."
    >
      <div className="text-center space-y-6">
        <div className="text-6xl font-bold text-muted-foreground mb-4">404</div>
        
        <div className="space-y-4">
          <p className="text-lg text-muted-foreground">
            The page <code className="bg-muted px-2 py-1 rounded text-sm">{location.pathname}</code> could not be found.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button asChild>
                  <Link to="/">
                    <Home className="h-4 w-4 mr-2" />
                    Go Home
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Return to the homepage</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button asChild variant="outline">
                  <Link to="/discover">
                    <Search className="h-4 w-4 mr-2" />
                    Discover Content
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Browse available content</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  onClick={() => window.history.back()}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go Back
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Return to previous page</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-muted rounded-lg">
          <h3 className="font-semibold mb-2">Looking for something specific?</h3>
          <p className="text-sm text-muted-foreground">
            Try using our content discovery page to find trending articles, or generate new content with our AI tools.
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default NotFound;