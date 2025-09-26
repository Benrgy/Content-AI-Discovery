"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2 } from "lucide-react";

interface ErrorStateProps {
  onRetry: () => void;
  isRetrying: boolean;
}

const ErrorState = ({ onRetry, isRetrying }: ErrorStateProps) => {
  console.log("ErrorState: Component rendering");
  
  return (
    <Alert variant="destructive" className="mb-8">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription className="flex items-center gap-4">
        Failed to load analytics data. Please try refreshing the page.
        <Button onClick={onRetry} disabled={isRetrying}>
          {isRetrying ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Retrying...
            </>
          ) : (
            "Retry"
          )}
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ErrorState;