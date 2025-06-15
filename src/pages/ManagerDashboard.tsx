import React, { useMemo, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import DashboardSummaryCards from "@/components/manager/DashboardSummaryCards";
import TaskFilterBar from "@/components/manager/TaskFilterBar";
import TasksTable from "@/components/manager/TasksTable";
import PendingApprovals from "@/components/manager/PendingApprovals";
import TrendsChart from "@/components/manager/TrendsChart";
import { useToast } from "@/hooks/use-toast";

// Dummy data types
export type Status = "Open" | "In Progress" | "Pending Approval" | "Closed";
export type Priority = "Low" | "Medium" | "High" | "Critical";

export type Task = {
  id: string;
  title: string;
  developer: string;
  priority: Priority;
  status: Status;
  timeSpent: number; // hours
  createdAt: string;
};

// In real app, fetch from API.
const developers = ["Alice Li", "Tom Miller", "Sara Chen", "Miguel Díaz"];
const initialTasks: Task[] = [
  {
    id: "1",
    title: "Login fails on mobile",
    developer: "Alice Li",
    priority: "Critical",
    status: "Open",
    timeSpent: 3,
    createdAt: "2024-06-13",
  },
  {
    id: "2",
    title: "Incorrect password error not shown",
    developer: "Tom Miller",
    priority: "High",
    status: "Pending Approval",
    timeSpent: 2.5,
    createdAt: "2024-06-12",
  },
  {
    id: "3",
    title: "Misspelled label on dashboard",
    developer: "Sara Chen",
    priority: "Low",
    status: "Closed",
    timeSpent: 1,
    createdAt: "2024-06-10",
  },
  {
    id: "4",
    title: "Slow page load on settings",
    developer: "Miguel Díaz",
    priority: "Medium",
    status: "In Progress",
    timeSpent: 4.2,
    createdAt: "2024-06-11",
  },
  {
    id: "5",
    title: "Notifications not sent on update",
    developer: "Alice Li",
    priority: "High",
    status: "Pending Approval",
    timeSpent: 2.0,
    createdAt: "2024-06-10",
  },
  {
    id: "6",
    title: "App crash on logout",
    developer: "Tom Miller",
    priority: "Critical",
    status: "Open",
    timeSpent: 0.6,
    createdAt: "2024-06-13",
  },
  {
    id: "7",
    title: "Task list does not refresh",
    developer: "Sara Chen",
    priority: "Medium",
    status: "Closed",
    timeSpent: 1.8,
    createdAt: "2024-06-09",
  },
];

const priorities: Priority[] = ["Low", "Medium", "High", "Critical"];
const statuses: Status[] = ["Open", "In Progress", "Pending Approval", "Closed"];

export default function ManagerDashboardPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [devFilter, setDevFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"createdAt" | "timeSpent">("createdAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const { toast } = useToast();

  // Filtering and sorting logic
  const filtered = useMemo(() => {
    let data = [...tasks];
    if (statusFilter) data = data.filter(t => t.status === statusFilter);
    if (priorityFilter) data = data.filter(t => t.priority === priorityFilter);
    if (devFilter) data = data.filter(t => t.developer === devFilter);
    data.sort((a, b) => {
      if (sortBy === "createdAt") {
        return (sortDir === "asc"
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
      if (sortBy === "timeSpent") {
        return (sortDir === "asc" ? a.timeSpent - b.timeSpent : b.timeSpent - a.timeSpent);
      }
      return 0;
    });
    return data;
  }, [tasks, statusFilter, priorityFilter, devFilter, sortBy, sortDir]);

  // Approve bug action
  const approveBug = (id: string) => {
    setTasks(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, status: "Closed" } : task
      )
    );
    toast({ title: "Bug approved and closed!" });
  };

  // Reopen bug action
  const reopenBug = (id: string) => {
    setTasks(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, status: "Open" } : task
      )
    );
    toast({ title: "Bug reopened!" });
  };

  // Dashboard summary stats
  const summaryStats = useMemo(() => {
    const open = tasks.filter(t => t.status === "Open").length;
    const pending = tasks.filter(t => t.status === "Pending Approval").length;
    const uniqueDevelopers = new Set(tasks.map(t => t.developer));
    const avgTime =
      tasks.length > 0
        ? (tasks.reduce((s, t) => s + t.timeSpent, 0) / tasks.length).toFixed(1)
        : "0";
    return {
      totalOpen: open,
      pendingApprovals: pending,
      totalDevs: uniqueDevelopers.size,
      avgTime,
    };
  }, [tasks]);

  // Data for trends chart
  const chartData = useMemo(() => {
    // { date: "2024-06-10", created: 2, closed: 1, reopened: 1 }
    const byDay: Record<
      string,
      { created: number; closed: number; reopened: number }
    > = {};
    tasks.forEach(task => {
      if (!byDay[task.createdAt]) {
        byDay[task.createdAt] = { created: 0, closed: 0, reopened: 0 };
      }
      byDay[task.createdAt].created += 1;
      if (task.status === "Closed") byDay[task.createdAt].closed += 1;
      // If status was changed to Open after Close, count as reopened (naive dummy logic for demo)
      // (skip for demo since no real history)
    });
    return Object.entries(byDay)
      .map(([date, stats]) => ({
        date,
        ...stats,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [tasks]);

  // Tasks pending approval
  const pendingApprovals = tasks.filter(t => t.status === "Pending Approval");

  return (
    <SidebarProvider>
      <div className="bg-muted dark:bg-background min-h-screen w-full">
        {/* Sticky header */}
        <Topbar />
        <div className="flex min-h-[calc(100vh-4rem)] pt-16">
          {/* Sidebar */}
          <DashboardSidebar />
          {/* Main content (flex-1) */}
          <div className="flex-1 px-4 sm:px-8 py-8 max-w-7xl mx-auto w-full">
            <DashboardSummaryCards stats={summaryStats} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
              <section>
                <div className="mb-2 flex flex-col sm:flex-row sm:items-end gap-3">
                  <TaskFilterBar
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    priorityFilter={priorityFilter}
                    setPriorityFilter={setPriorityFilter}
                    devFilter={devFilter}
                    setDevFilter={setDevFilter}
                    statuses={statuses}
                    priorities={priorities}
                    developers={developers}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    sortDir={sortDir}
                    setSortDir={setSortDir}
                  />
                </div>
                <TasksTable tasks={filtered} />
              </section>
              <aside className="space-y-8">
                <PendingApprovals
                  tasks={pendingApprovals}
                  onApprove={approveBug}
                  onReopen={reopenBug}
                />
                <TrendsChart data={chartData} />
              </aside>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
