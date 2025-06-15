
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck, BadgeAlert, BadgePlus, Clock } from "lucide-react";

export type DashboardStats = {
  totalOpen: number;
  pendingApprovals: number;
  totalDevs: number;
  avgTime: string;
};

const cards = [
  {
    label: "Total Open Bugs",
    icon: BadgePlus,
    key: "totalOpen",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  },
  {
    label: "Pending Approvals",
    icon: BadgeAlert,
    key: "pendingApprovals",
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  },
  {
    label: "Total Developers",
    icon: BadgeCheck,
    key: "totalDevs",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  },
  {
    label: "Avg Time / Bug",
    icon: Clock,
    key: "avgTime",
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
    suffix: " hrs",
  },
];

export default function DashboardSummaryCards({ stats }: { stats: DashboardStats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map(card => {
        const value = stats[card.key as keyof DashboardStats];
        const Icon = card.icon;
        return (
          <Card key={card.label} className="shadow-sm">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <span className={`rounded-full p-2 ${card.color}`}>
                <Icon size={24} />
              </span>
              <CardTitle className="text-base font-semibold">{card.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{value}{card.suffix || ""}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
