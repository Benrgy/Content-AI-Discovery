"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { type ElementType } from "react"; // Add 'type' keyword

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ElementType;
  actionButton?: {
    text: string;
    to?: string;
    onClick?: () => void;
    tooltip?: string;
  };
}

const EmptyState = ({
  title,
  description,
  icon: Icon = Info,
  actionButton,
}: EmptyStateProps) => {
  console.log("EmptyState: Rendering with props:", { title, description, actionButton });
  
  return (
    <div className="max-w-xl mx-auto flex items-center justify-center flex-grow">
      <Alert className="flex flex-col items-center text-center p-6">
        <Icon className="h-8 w-8 mb-4 text-muted-foreground" />
        <AlertTitle className="text-xl font-semibold mb-2">{title}</AlertTitle>
        <AlertDescription className="text-base text-muted-foreground mb-4">
          {description}
        </AlertDescription>
        {actionButton && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild={!!actionButton.to} onClick={actionButton.onClick}>
                {actionButton.to ? (
                  <Link to={actionButton.to}>{actionButton.text}</Link>
                ) : (
                  actionButton.text
                )}
              </Button>
            </TooltipTrigger>
            {actionButton.tooltip && (
              <TooltipContent>
                <p>{actionButton.tooltip}</p>
              </TooltipContent>
            )}
          </Tooltip>
        )}
      </Alert>
    </div>
  );
};

export default EmptyState;