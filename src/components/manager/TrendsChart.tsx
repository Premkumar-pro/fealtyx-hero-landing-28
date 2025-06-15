
import React from "react";
import {
  ChartContainer,
  ChartLegendContent,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from "recharts";

type Data = { date: string; created: number; closed: number; reopened: number };

export default function TrendsChart({ data }: { data: Data[] }) {
  const config = {
    created: { label: "Created", color: "#3b82f6" },
    closed: { label: "Closed", color: "#22c55e" },
    reopened: { label: "Reopened", color: "#ef4444" },
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-60">
          <ChartContainer config={config}>
            <BarChart data={data}>
              <XAxis dataKey="date" axisLine={false} tickLine={false} />
              <YAxis allowDecimals={false} width={32} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend content={<ChartLegendContent />} />
              <Bar dataKey="created" fill={config.created.color} radius={[3, 3, 0, 0]} />
              <Bar dataKey="closed" fill={config.closed.color} radius={[3, 3, 0, 0]} />
              <Bar dataKey="reopened" fill={config.reopened.color} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
