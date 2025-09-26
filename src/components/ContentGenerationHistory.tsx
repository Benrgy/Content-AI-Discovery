"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Copy, Trash2, Clock, RefreshCw } from "lucide-react";
import { GeneratedContent } from "@/types/content";
import { showInfo } from "@/utils/toast";
import PlatformIcon from "./PlatformIcon";
import { formatRelativeTime } from "@/lib/utils";

interface ContentGenerationHistoryProps {
  history: GeneratedContent[];
  onRegenerate: (content: GeneratedContent) => void;
  onDelete: (contentId: string) => void;
}

const ContentGenerationHistory = ({
  history,
  onRegenerate,
  onDelete
}: ContentGenerationHistoryProps) => {
  if (history.length === 0) {
    return null;
  }
  
  const handleCopyContent = (content: GeneratedContent) => {
    let textToCopy = content.content;
    
    if (content.hashtags && content.hashtags.length > 0) {
      textToCopy += "\n\n" + content.hashtags.join(" ");
    }
    
    if (content.cta) {
      textToCopy += "\n\n" + content.cta;
    }
    
    navigator.clipboard.writeText(textToCopy);
    showInfo("Content copied to clipboard!");
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Generation History</CardTitle>
        <CardDescription>Your recently generated content</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {history.map((item) => (
          <div key={item.id} className="border rounded-md p-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PlatformIcon platform={item.platform} />
                <Badge variant="outline" className="capitalize">
                  {item.platform}
                </Badge>
                {item.performanceEstimate && (
                  <Badge>Score: {item.performanceEstimate}</Badge>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{formatRelativeTime(new Date(parseInt(item.id.split('-')[1])))}</span>
              </div>
            </div>
            
            <p className="text-sm line-clamp-3">{item.content}</p>
            
            <div className="flex justify-end gap-2 pt-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 px-2"
                    onClick={() => handleCopyContent(item)}
                  >
                    <Copy className="h-3.5 w-3.5 mr-1" />
                    Copy
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy content to clipboard</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 px-2"
                    onClick={() => onRegenerate(item)}
                  >
                    <RefreshCw className="h-3.5 w-3.5 mr-1" />
                    Regenerate
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Create similar content</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 px-2 text-destructive hover:text-destructive"
                    onClick={() => onDelete(item.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5 mr-1" />
                    Delete
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Remove from history</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ContentGenerationHistory;