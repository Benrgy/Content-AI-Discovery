"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

interface PlatformDistributionChartProps {
  data: Array<{ name: string; value: number }>;
  colorMap: Record<string, string>;
  title?: string;
  description?: string;
  height?: number;
}

const PlatformDistributionChart = ({
  data,
  colorMap,
  title = "Platform Distribution",
  description = "Content performance by platform",
  height = 300
}: PlatformDistributionChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ height: `${height}px` }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={Math.min(height * 0.35, 80)}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={colorMap[entry.name] || "#8884d8"} 
                  />
                ))}
              </Pie>
              <Legend />
              <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlatformDistributionChart;