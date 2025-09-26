"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

interface PlatformInsightsAlertProps {
  platformDistribution: Record<string, number>;
}

const PlatformInsightsAlert = ({ platformDistribution }: PlatformInsightsAlertProps) => {
  // Find top and bottom platforms
  const sortedPlatforms = Object.entries(platformDistribution).sort((a, b) => b[1] - a[1]);
  const topPlatform = sortedPlatforms[0][0];
  const bottomPlatform = sortedPlatforms[sortedPlatforms.length - 1][0];

  return (
    <Alert>
      <Info className="h-4 w-4" />
      <AlertTitle>Platform Insights</AlertTitle>
      <AlertDescription>
        <p className="mb-2">Based on the current data analysis:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>{topPlatform}</strong> shows the highest performance overall
          </li>
          <li>
            <strong>{bottomPlatform}</strong> has the lowest representation but may offer growth opportunities
          </li>
          <li>
            Consider cross-platform content strategies to maximize reach
          </li>
        </ul>
      </AlertDescription>
    </Alert>
  );
};

export default PlatformInsightsAlert;