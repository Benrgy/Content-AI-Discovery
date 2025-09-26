"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Sparkles, 
  Search, 
  BarChart, 
  Bookmark,
  Wand2,
  CheckCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TourStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  target?: string;
  position?: 'top' | 'bottom' | 'left' | 'right'; // Removed 'center' as it's not valid
}

const tourSteps: TourStep[] = [
  {
    id: 'discover',
    title: 'Discover Viral Content',
    description: 'Find high-performing content across LinkedIn, TikTok, Twitter, Instagram, YouTube, and blogs with real engagement metrics.',
    icon: Search,
    target: 'discover-button',
    position: 'bottom'
  },
  {
    id: 'generate',
    title: 'AI Content Generation',
    description: 'Create platform-optimized content with our advanced AI. Choose tone, length, and automatically include hashtags and CTAs.',
    icon: Wand2,
    target: 'generate-button',
    position: 'bottom'
  },
  {
    id: 'analytics',
    title: 'Performance Analytics',
    description: 'Track engagement metrics, identify viral patterns, and get data-driven insights to improve your content strategy.',
    icon: BarChart,
    target: 'analytics-button',
    position: 'bottom'
  },
  {
    id: 'saved',
    title: 'Save & Organize',
    description: 'Bookmark your favorite content and keep track of your generated posts for easy reference and reuse.',
    icon: Bookmark,
    target: 'saved-button',
    position: 'bottom'
  },
  {
    id: 'complete',
    title: 'You\'re All Set!',
    description: 'Start exploring trending content and create viral posts with AI. Remember to use keyboard shortcuts for faster navigation!',
    icon: CheckCircle
    // Removed position property since 'center' is not valid
  }
];

interface FeatureTourProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeatureTour = ({ isOpen, onClose }: FeatureTourProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setCurrentStep(0);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  const currentTourStep = tourSteps[currentStep];
  const Icon = currentTourStep.icon;

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md relative">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="secondary" className="text-xs">
              Tour {currentStep + 1} of {tourSteps.length}
            </Badge>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleSkip}
                >
                  <X className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Skip tour</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex justify-center mb-4">
            <Icon className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-xl">{currentTourStep.title}</CardTitle>
          <CardDescription className="text-sm">
            {currentTourStep.description}
          </CardDescription>
        </CardHeader>
        
        <CardFooter className="flex justify-between pt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <div className="flex gap-1">
            {tourSteps.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-2 w-2 rounded-full transition-colors",
                  index === currentStep ? "bg-primary" : "bg-muted"
                )}
              />
            ))}
          </div>
          
          <Button
            size="sm"
            onClick={handleNext}
            className="gap-1"
          >
            {currentStep === tourSteps.length - 1 ? (
              <>
                Get Started
                <Sparkles className="h-4 w-4" />
              </>
            ) : (
              <>
                Next
                <ChevronRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FeatureTour;