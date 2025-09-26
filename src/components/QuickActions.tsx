"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import { 
  Sparkles, 
  Search, 
  BarChart, 
  Bookmark,
  Zap,
  Clock,
  TrendingUp
} from "lucide-react";
import { useSavedContent } from "@/hooks/use-saved-content";
import { useGenerationHistory } from "@/hooks/use-generation-history";

const QuickActions = () => {
  const { savedCount } = useSavedContent();
  const { historyCount } = useGenerationHistory();

  const actions = [
    {
      title: "Discover Content",
      description: "Find trending content across platforms",
      icon: Search,
      href: "/discover",
      color: "text-blue-500",
      badge: null
    },
    {
      title: "Generate Content",
      description: "Create AI-powered posts",
      icon: Sparkles,
      href: "/generate",
      color: "text-purple-500",
      badge: null
    },
    {
      title: "View Analytics",
      description: "Track performance metrics",
      icon: BarChart,
      href: "/analytics",
      color: "text-green-500",
      badge: null
    },
    {
      title: "Saved Content",
      description: "Access your bookmarked posts",
      icon: Bookmark,
      href: "/saved",
      color: "text-amber-500",
      badge: savedCount > 0 ? savedCount : null
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Button asChild variant="outline" className="justify-start">
                  <Link to={action.href} className="flex items-center gap-3 w-full">
                    <Icon className={`h-5 w-5 ${action.color}`} />
                    <div className="flex-grow text-left">
                      <div className="font-medium">{action.title}</div>
                      <div className="text-sm text-muted-foreground">{action.description}</div>
                    </div>
                    {action.badge && (
                      <Badge variant="secondary" className="ml-auto">
                        {action.badge}
                      </Badge>
                    )}
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{action.description}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default QuickActions;