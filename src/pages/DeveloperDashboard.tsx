import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Clock, Lock } from "lucide-react";
import PageLoader from "@/components/layout/PageLoader";

const statuses = ["Open", "In Progress", "Pending Approval", "Closed"] as const;
const priorities = ["Low", "Medium", "High"] as const;

type Task = {
  id: string;
  title: string;
  description: string;
  priority: typeof priorities[number];
  status: typeof statuses[number];
  assignee: string;
  createdDate: string;
  dueDate: string;
  timeSpent: number; // seconds
  timerRunning: boolean;
};

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Fix login bug",
    description: "Login page throws error on Safari.",
    priority: "High",
    status: "Open",
    assignee: "You",
    createdDate: "2025-06-01",
    dueDate: "2025-06-10",
    timeSpent: 5400,
    timerRunning: false,
  },
  {
    id: "2",
    title: "Improve dashboard UI",
    description: "Apply new colors and grid layout.",
    priority: "Medium",
    status: "In Progress",
    assignee: "You",
    createdDate: "2025-06-02",
    dueDate: "2025-06-11",
    timeSpent: 1800,
    timerRunning: false,
  },
  {
    id: "3",
    title: "Update API docs",
    description: "Document new endpoints.",
    priority: "Low",
    status: "Pending Approval",
    assignee: "You",
    createdDate: "2025-06-05",
    dueDate: "2025-06-15",
    timeSpent: 600,
    timerRunning: false,
  },
];

function formatTime(sec: number) {
  const h = Math.floor(sec / 3600)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((sec % 3600) / 60)
    .toString()
    .padStart(2, "0");
  return `${h}:${m}`;
}

export default function DeveloperDashboard() {
  // Simulate loading/fetch.
  const [loading, setLoading] = React.useState(false);

  // State for tasks
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  // State for filters
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);

  // Modal state for new task creation
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Open",
    createdDate: new Date().toISOString().slice(0, 10),
    dueDate: "",
  });
  const [formLoading, setFormLoading] = useState(false);

  // Timer state per task
  const handleTaskTimer = (taskId: string, action: "start" | "stop") => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              timerRunning: action === "start",
            }
          : task
      )
    );
    if (action === "start") {
      toast({ title: "Timer started." });
    }
  };

  // Simulate timer tick
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTasks((prev) =>
        prev.map((task) =>
          task.timerRunning
            ? { ...task, timeSpent: task.timeSpent + 60 }
            : task
        )
      );
    }, 60000); // increment by 1 min every min
    return () => clearInterval(interval);
  }, []);

  // Handle request closure for a task
  const handleRequestClosure = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, status: "Pending Approval" }
          : task
      )
    );
    toast({ title: "Closure requested", description: "Waiting for manager approval." });
  };

  // Filtered tasks
  const filteredTasks = tasks.filter(
    (t) =>
      (!statusFilter || t.status === statusFilter) &&
      (!priorityFilter || t.priority === priorityFilter)
  );

  // Handle creation of new task
  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      // --- EXPLICIT CASTING FOR PRIORITY ---
      const newTask: Task = {
        id: Math.random().toString(36).slice(2),
        ...form,
        assignee: "You",
        timeSpent: 0,
        timerRunning: false,
        // Enforce correct priority type (TypeScript knows the union, this is safe)
        priority: form.priority as "Low" | "Medium" | "High",
        status: form.status as "Open" | "In Progress" | "Pending Approval" | "Closed",
      };
      setTasks((prev) => [newTask, ...prev]);
      setDialogOpen(false);
      toast({ title: "Task created!" });
      setForm({
        title: "",
        description: "",
        priority: "Medium",
        status: "Open",
        createdDate: new Date().toISOString().slice(0, 10),
        dueDate: "",
      });
    } catch (err) {
      toast({ title: "Error", description: "Failed to create task." });
    }
    setFormLoading(false);
  };

  if (loading) return <PageLoader text="Loading dashboard..." />;

  return (
    <div className="flex flex-col w-full bg-background dark:bg-background transition-colors duration-300">
      {/* Content only, header handled by AppLayout */}
      {/* Sticky header with Create Task modal remains for dashboard-specific UI */}
      <div className="sticky top-0 z-30 bg-background/70 dark:bg-background/80 backdrop-blur border-b py-4 px-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 transition-colors">
        <div className="text-2xl font-bold tracking-tight">Developer Dashboard</div>
        {/* Create Task Modal */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <span className="text-lg">+ </span> New Task/Bug
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Task/Bug</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateTask} className="space-y-3">
              <Input
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                required
              />
              <Textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={3}
                required
              />
              <div className="flex gap-2">
                <Select
                  value={form.priority}
                  onValueChange={(val) => setForm((f) => ({ ...f, priority: val }))}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map((p) => (
                      <SelectItem value={p} key={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="date"
                  className="w-40"
                  required
                  value={form.dueDate}
                  onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))}
                  min={form.createdDate}
                  placeholder="Due Date"
                />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={formLoading}>
                  {formLoading ? "Saving..." : "Save"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters section */}
      <div className="flex flex-wrap gap-3 px-6 py-4 bg-background">
        <Select
          value={statusFilter ?? "all"}
          onValueChange={val => setStatusFilter(val === "all" ? null : val)}
        >
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Filter: Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {statuses.map(s => (
              <SelectItem value={s} key={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={priorityFilter ?? "all"}
          onValueChange={val => setPriorityFilter(val === "all" ? null : val)}
        >
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Filter: Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            {priorities.map(p => (
              <SelectItem value={p} key={p}>{p}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* Task List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {filteredTasks.length === 0 && (
          <div className="col-span-2 text-center text-muted-foreground py-12">No tasks found.</div>
        )}
        {filteredTasks.map((task) => (
          <Card key={task.id} className="flex flex-col justify-between">
            <CardHeader className="pb-2 flex flex-row justify-between items-start">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {task.title}
                  {task.status === "Pending Approval" ? (
                    // REMOVE 'title' PROP BELOW
                    <>
                      <Lock size={18} className="ml-1 text-warning" />
                      <span className="sr-only">Pending Approval</span>
                    </>
                  ) : null}
                </CardTitle>
                <CardDescription className="mt-1 line-clamp-2">
                  {task.description}
                </CardDescription>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <Badge
                  variant={
                    task.status === "Closed"
                      ? "secondary"
                      : task.status === "Pending Approval"
                        ? "destructive"
                        : "default"
                  }
                  className={
                    task.status === "Closed"
                      ? "bg-gray-400"
                      : task.status === "Pending Approval"
                        ? "bg-yellow-400 text-black"
                        : task.status === "Open"
                          ? "bg-blue-500"
                          : "bg-green-500"
                  }
                >
                  {task.status}
                </Badge>
                <Badge
                  variant={
                    task.priority === "High"
                      ? "destructive"
                      : task.priority === "Medium"
                        ? "secondary"
                        : "default"
                  }
                  className={
                    task.priority === "High"
                      ? "bg-red-500"
                      : task.priority === "Medium"
                        ? "bg-yellow-400 text-black"
                        : "bg-gray-300"
                  }
                >
                  {task.priority}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-1 text-sm">
              <div className="flex flex-wrap gap-3">
                <span>
                  <strong>Assignee:</strong> {task.assignee}
                </span>
                <span>
                  <strong>Created:</strong> {task.createdDate}
                </span>
                <span>
                  <strong>Due:</strong> {task.dueDate || "-"}
                </span>
              </div>
              {/* Time tracker */}
              <div className="mt-3 flex gap-4 items-center">
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{formatTime(task.timeSpent)} hrs</span>
                {!["Closed", "Pending Approval"].includes(task.status) && (
                  <>
                    <Button
                      size="sm"
                      variant={task.timerRunning ? "secondary" : "default"}
                      onClick={() =>
                        handleTaskTimer(
                          task.id,
                          task.timerRunning ? "stop" : "start"
                        )
                      }
                    >
                      {task.timerRunning ? "Stop Timer" : "Start Timer"}
                    </Button>
                    {/* Manual add (optional) */}
                    {/* Could add manual add here */}
                  </>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              {!["Closed", "Pending Approval"].includes(task.status) && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleRequestClosure(task.id)}
                >
                  Request Closure
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
