"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface OverviewMetricCardProps {
  title: string;
  value: ReactNode;
  description: string;
  valueClassName?: string;
}

const OverviewMetricCard = ({ 
  title, 
  value, 
  description, 
  valueClassName = "" 
}: OverviewMetricCardProps) => {
  console.log("OverviewMetricCard: Component rendering");
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>{title}</CardDescription>
        <CardTitle className={`text-3xl ${valueClassName}`}>
          {value}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default OverviewMetricCard;