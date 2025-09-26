"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ContentItem } from "@/types/content";

interface PlatformCardsProps {
  platformDistribution: Record<string, number>;
  topPerformingContent: ContentItem[];
}

const PlatformCards = ({ platformDistribution, topPerformingContent }: PlatformCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Object.entries(platformDistribution)
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
                  {topPerformingContent.filter(c => c.platform === platform).length} top performing posts
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
  );
};

export default PlatformCards;