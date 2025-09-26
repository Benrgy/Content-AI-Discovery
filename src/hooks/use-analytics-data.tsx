"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAnalyticsData } from "@/api/content";
import { AnalyticsData } from "@/types/content";

export function useAnalyticsData() {
  return useQuery<AnalyticsData, Error>({
    queryKey: ["analyticsData"],
    queryFn: fetchAnalyticsData,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}