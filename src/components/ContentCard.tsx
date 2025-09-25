"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Heart, Share2, Eye } from "lucide-react";

interface ContentCardProps {
  id: string;
  title: string;
  description: string;
  platform: string;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    views?: number;
  };
  imageUrl?: string;
  link: string;
}

const ContentCard: React.FC<ContentCardProps> = ({
  title,
  description,
  platform,
  engagement,
  imageUrl,
  link,
}) => {
  return (
    <Card className="flex flex-col h-full">
      {imageUrl && (
        <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <Badge className="absolute top-2 left-2 capitalize">{platform}</Badge>
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-lg line-clamp-2">{title}</CardTitle>
        <CardDescription className="text-sm line-clamp-3">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center justify-around text-muted-foreground text-sm mt-2">
          <div className="flex items-center gap-1">
            <Heart className="h-4 w-4" /> {engagement.likes}
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" /> {engagement.comments}
          </div>
          <div className="flex items-center gap-1">
            <Share2 className="h-4 w-4" /> {engagement.shares}
          </div>
          {engagement.views && (
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" /> {engagement.views}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <a href={link} target="_blank" rel="noopener noreferrer">
            View Content
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContentCard;