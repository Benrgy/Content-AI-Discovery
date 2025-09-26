"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useLocation } from "react-router-dom";
import { appRoutes } from "@/router/routes";
import { Badge } from "@/components/ui/badge";

const NavigationTest = () => {
  const location = useLocation();
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Navigation Test</CardTitle>
        <CardDescription>
          Test all navigation links to ensure they work correctly
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Current route: <Badge variant="outline">{location.pathname}</Badge>
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {appRoutes
            .filter(route => route.path !== "*") // Exclude 404 route
            .map((route) => (
              <Button
                key={route.path}
                asChild
                variant={location.pathname === route.path ? "default" : "outline"}
                className="justify-start"
              >
                <Link to={route.path}>
                  {route.name}
                  {route.inNav && <Badge variant="secondary" className="ml-2">Nav</Badge>}
                </Link>
              </Button>
            ))}
        </div>
        
        <div className="pt-4 border-t">
          <h3 className="font-medium mb-2">Test Links with Parameters:</h3>
          <div className="space-y-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/generate?contentId=1">
                Generate with Content ID
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/discover?platform=linkedin">
                Discover LinkedIn Content
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NavigationTest;