"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts";

interface CategoryPerformanceData {
  category: string;
  performanceScore: number;
  count: number;
}

interface CategoryComparisonChartProps {
  data: CategoryPerformanceData[];
  title?: string;
  description?: string;
}

const CategoryComparisonChart = ({
  data,
  title = "Category Performance Trends",
  description = "Performance scores by content category"
}: CategoryComparisonChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis domain={[0, 100]} />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'performanceScore' ? `Score: ${value}` : `Count: ${value}`,
                  name === 'performanceScore' ? 'Performance' : 'Content Count'
                ]}
              />
              <Legend />
              <Bar 
                dataKey="performanceScore" 
                name="Performance Score"
                fill="#8884d8" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="count" 
                name="Content Count"
                fill="#82ca9d" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryComparisonChart;