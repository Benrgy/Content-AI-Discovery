"use client";

import { useTheme } from "next-themes";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

const ThemeTest = () => {
  const { theme, systemTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Theme Status</CardTitle>
          <CardDescription>Loading theme information...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Theme Status</CardTitle>
        <CardDescription>Current theme configuration</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between items-center">
          <span>Selected Theme:</span>
          <Badge variant="outline">{theme || "undefined"}</Badge>
        </div>
        <div className="flex justify-between items-center">
          <span>System Theme:</span>
          <Badge variant="outline">{systemTheme || "undefined"}</Badge>
        </div>
        <div className="flex justify-between items-center">
          <span>Resolved Theme:</span>
          <Badge variant="outline">{resolvedTheme || "undefined"}</Badge>
        </div>
        <div className="flex justify-between items-center">
          <span>HTML Class:</span>
          <Badge variant="outline">
            {typeof document !== "undefined" ? document.documentElement.className : "N/A"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThemeTest;