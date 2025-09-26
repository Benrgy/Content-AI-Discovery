"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ContentItem } from "@/types/content";
import { Link } from "react-router-dom";

interface SavedContentSidebarProps {
  savedItems: ContentItem[];
  onSelectReference: (item: ContentItem) => void;
}

const SavedContentSidebar = ({ savedItems, onSelectReference }: SavedContentSidebarProps) => {
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="text-lg">Saved Content</CardTitle>
        <CardDescription>
          Reference your saved content for inspiration
        </CardDescription>
      </CardHeader>
      <CardContent>
        {savedItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">No saved content yet</p>
            <Button variant="outline" size="sm" asChild>
              <Link to="/discover">Discover Content</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {savedItems.slice(0, 5).map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="p-3">
                  <h3 className="font-medium text-sm line-clamp-2">{item.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant="outline" className="capitalize text-xs">
                      {item.platform}
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 px-2"
                      onClick={() => onSelectReference(item)}
                    >
                      Use as Reference
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
            {savedItems.length > 5 && (
              <div className="text-center pt-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/saved">View All Saved Content</Link>
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SavedContentSidebar;