"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import ContentCard from "@/components/ContentCard";
import { ContentItem } from "@/types/content";

interface TopContentSectionProps {
  topContent: ContentItem[];
  title?: string;
  description?: string;
  limit?: number;
}

const TopContentSection = ({
  topContent,
  title = "Top Performing Content",
  description = "Content with the highest performance scores",
  limit = 3
}: TopContentSectionProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>
            {description}
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
          {topContent.slice(0, limit).map((content) => (
            <ContentCard key={content.id} {...content} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopContentSection;