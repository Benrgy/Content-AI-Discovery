"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ContentCardSkeleton = () => {
  console.log("ContentCardSkeleton: Rendering");
  
  return (
    <Card className="flex flex-col h-full">
      <div className="relative w-full h-48 overflow-hidden">
        <Skeleton className="h-full w-full" />
        <div className="absolute top-2 left-2 flex gap-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-6 w-12 rounded-full" />
        </div>
      </div>
      <CardHeader className="pb-2">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-5 w-24 mb-2 rounded-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6 mt-1" />
      </CardHeader>
      <CardContent className="flex-grow pb-2">
        <div className="flex items-center justify-around mt-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-12" />
        </div>
        <div className="mt-3 flex justify-center">
          <Skeleton className="h-5 w-32 rounded-full" />
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <div className="flex gap-2 w-full">
          <Skeleton className="h-10 flex-grow" />
          <Skeleton className="h-10 flex-grow" />
          <Skeleton className="h-10 w-10" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default ContentCardSkeleton;