"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { formatRelativeTime } from "@/lib/utils";
import { useGenerationHistory } from "@/hooks/use-generation-history";
import { useSavedContent } from "@/hooks/use-saved-content";
import { Clock, Sparkles, Bookmark, TrendingUp } from "lucide-react";
import PlatformIcon from "./PlatformIcon";

const RecentActivity = () => {
  const { history } = useGenerationHistory();
  const { savedItems } = useSavedContent();

  const recentGenerations = history.slice(0, 3);
  const recentSaves = savedItems.slice(0, 3);

  const activities = [
    ...recentGenerations.map(item => ({
      type: 'generated',
      content: item.content.substring(0, 60) + '...',
      platform: item.platform,
      timestamp: parseInt(item.id.split('-')[1]),
      icon: Sparkles
    })),
    ...recentSaves.map(item => ({
      type: 'saved',
      content: item.title.substring(0, 60) + '...',
      platform: item.platform,
      timestamp: item.publishedAt ? new Date(item.publishedAt).getTime() : Date.now(),
      icon: Bookmark
    }))
  ].sort((a, b) => b.timestamp - a.timestamp).slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No recent activity to display
          </p>
        ) : (
          <div className="space-y-3">
            {activities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-start gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
                  <div className="p-1 rounded-full bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <PlatformIcon platform={activity.platform} className="h-4 w-4" />
                      <Badge variant="outline" className="text-xs capitalize">
                        {activity.platform}
                      </Badge>
                      <span className="text-xs text-muted-foreground ml-auto">
                        {formatRelativeTime(new Date(activity.timestamp))}
                      </span>
                    </div>
                    <p className="text-sm line-clamp-2">{activity.content}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;