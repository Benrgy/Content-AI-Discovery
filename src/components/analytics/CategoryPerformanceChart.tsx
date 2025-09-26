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
  Cell 
} from "recharts";

interface CategoryPerformanceData {
  category: string;
  performanceScore: number;
  count: number;
}

interface CategoryPerformanceChartProps {
  data: CategoryPerformanceData[];
  colors: string[];
  title?: string;
  description?: string;
  layout?: "vertical" | "horizontal";
}

const CategoryPerformanceChart = ({
  data,
  colors,
  title = "Category Performance",
  description = "Average performance score by content category",
  layout = "vertical"
}: CategoryPerformanceChartProps) => {
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
              layout={layout}
              margin={{ top: 5, right: 30, left: layout === "vertical" ? 80 : 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              {layout === "vertical" ? (
                <>
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis 
                    type="category" 
                    dataKey="category" 
                    tick={{ fontSize: 12 }}
                    width={80}
                  />
                </>
              ) : (
                <>
                  <XAxis dataKey="category" />
                  <YAxis domain={[0, 100]} />
                </>
              )}
              <Tooltip 
                formatter={(value, name) => [`Score: ${value}`, 'Performance']}
                labelFormatter={(label) => `Category: ${label}`}
              />
              <Bar 
                dataKey="performanceScore" 
                fill="#8884d8"
                radius={layout === "vertical" ? [0, 4, 4, 0] : [4, 4, 0, 0]}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={colors[index % colors.length]} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryPerformanceChart;