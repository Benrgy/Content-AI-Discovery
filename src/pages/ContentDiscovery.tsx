"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

const ContentDiscovery = () => {
  return (
    <div className="min-h-screen p-4 md:p-8 lg:p-12 bg-background text-foreground">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Content Discovery Engine</h1>
      <p className="text-lg text-muted-foreground mb-8 text-center">
        Find high-performing social media content and identify viral patterns.
      </p>

      <div className="max-w-3xl mx-auto mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for trending content by topic or keyword..."
            className="w-full pl-10 pr-4 py-2 rounded-md border border-input focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
        <Button>Search</Button>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder for content cards */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Content Item 1</h3>
          <p className="text-muted-foreground text-sm">Description of trending content. Engagement metrics will go here.</p>
          <Button variant="link" className="mt-4 p-0 h-auto">View Details</Button>
        </div>
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Content Item 2</h3>
          <p className="text-muted-foreground text-sm">Description of trending content. Engagement metrics will go here.</p>
          <Button variant="link" className="mt-4 p-0 h-auto">View Details</Button>
        </div>
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Content Item 3</h3>
          <p className="text-muted-foreground text-sm">Description of trending content. Engagement metrics will go here.</p>
          <Button variant="link" className="mt-4 p-0 h-auto">View Details</Button>
        </div>
      </div>
    </div>
  );
};

export default ContentDiscovery;