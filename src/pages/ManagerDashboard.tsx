import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronDown, 
  Filter, 
  Plus, 
  Search, 
  SlidersHorizontal 
} from "lucide-react";

// Sample data for tasks
const tasks = [
  {
    id: "TASK-8782",
    title: "User Authentication Bug",
    status: "in-progress",
    priority: "high",
    assignee: "Alex Johnson",
    created: "2023-04-05",
    dueDate: "2023-04-12",
  },
  {
    id: "TASK-7891",
    title: "Dashboard UI Redesign",
    status: "todo",
    priority: "medium",
    assignee: "Sarah Miller",
    created: "2023-04-03",
    dueDate: "2023-04-17",
  },
  {
    id: "TASK-6543",
    title: "API Integration Issue",
    status: "done",
    priority: "critical",
    assignee: "Mike Chen",
    created: "2023-03-28",
    dueDate: "2023-04-04",
  },
  {
    id: "TASK-5432",
    title: "Performance Optimization",
    status: "in-progress",
    priority: "low",
    assignee: "Emily Davis",
    created: "2023-04-01",
    dueDate: "2023-04-14",
  },
  {
    id: "TASK-4321",
    title: "Documentation Update",
    status: "review",
    priority: "medium",
    assignee: "Alex Johnson",
    created: "2023-04-02",
    dueDate: "2023-04-09",
  },
];

// Form schema for creating a new task
const taskFormSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  assignee: z.string({
    required_error: "Please select an assignee.",
  }),
  priority: z.string({
    required_error: "Please select a priority level.",
  }),
  dueDate: z.string({
    required_error: "Please select a due date.",
  }),
});

// Status badge component
const StatusBadge = ({ status }) => {
  const statusStyles = {
    todo: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100",
    "in-progress": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
    review: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100",
    done: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  };

  const statusLabels = {
    todo: "To Do",
    "in-progress": "In Progress",
    review: "In Review",
    done: "Done",
  };

  return (
    <Badge className={statusStyles[status] || ""} variant="outline">
      {statusLabels[status] || status}
    </Badge>
  );
};

// Priority badge component
const PriorityBadge = ({ priority }) => {
  const priorityStyles = {
    low: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100",
    medium: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
    high: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100",
    critical: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  };

  return (
    <Badge className={priorityStyles[priority] || ""} variant="outline">
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </Badge>
  );
};

export default function ManagerDashboardPage() {
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const form = useForm({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: "",
      description: "",
      assignee: "",
      priority: "medium",
      dueDate: "",
    },
  });

  function onSubmit(values) {
    toast({
      title: "Task created",
      description: `New task "${values.title}" has been created.`,
    });
    setIsCreateTaskOpen(false);
    form.reset();
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manager Dashboard</h1>
          <p className="text-muted-foreground">
            Manage tasks and track team progress
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Dialog open={isCreateTaskOpen} onOpenChange={setIsCreateTaskOpen}>
            <DialogTrigger asChild>
              <Button className="gap-1">
                <Plus size={16} />
                Create Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
                <DialogDescription>
                  Fill in the details to create a new task for your team.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter task title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <textarea
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Describe the task in detail"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="assignee"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Assignee</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select team member" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="alex">Alex Johnson</SelectItem>
                              <SelectItem value="sarah">Sarah Miller</SelectItem>
                              <SelectItem value="mike">Mike Chen</SelectItem>
                              <SelectItem value="emily">Emily Davis</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="priority"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Priority</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select priority" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="critical">Critical</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Due Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit">Create Task</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
          <Tabs
            defaultValue="all"
            className="w-full md:w-auto"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList>
              <TabsTrigger value="all">All Tasks</TabsTrigger>
              <TabsTrigger value="todo">To Do</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="review">In Review</TabsTrigger>
              <TabsTrigger value="done">Done</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tasks..."
                className="w-full md:w-[200px] pl-8"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks
                  .filter(task => activeTab === "all" || task.status === activeTab)
                  .map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.id}</TableCell>
                      <TableCell>{task.title}</TableCell>
                      <TableCell>
                        <StatusBadge status={task.status} />
                      </TableCell>
                      <TableCell>
                        <PriorityBadge priority={task.priority} />
                      </TableCell>
                      <TableCell>{task.assignee}</TableCell>
                      <TableCell>{task.created}</TableCell>
                      <TableCell>{task.dueDate}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasks.length}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tasks.filter(t => t.status === "in-progress").length}
            </div>
            <p className="text-xs text-muted-foreground">
              +1 from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tasks.filter(t => t.status === "done").length}
            </div>
            <p className="text-xs text-muted-foreground">
              +3 from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tasks.filter(t => t.priority === "high" || t.priority === "critical").length}
            </div>
            <p className="text-xs text-muted-foreground">
              -1 from yesterday
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
