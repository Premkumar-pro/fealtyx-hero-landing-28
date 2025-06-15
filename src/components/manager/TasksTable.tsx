import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Task } from "@/types/task";

const statusColors: Record<string, string> = {
  "Open": "bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "In Progress": "bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  "Pending Approval": "bg-indigo-200 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
  "Closed": "bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200",
};

const priorityColors: Record<string, string> = {
  "Low": "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-200",
  "Medium": "bg-yellow-100 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-100",
  "High": "bg-orange-200 text-orange-900 dark:bg-orange-900 dark:text-orange-200",
  "Critical": "bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-200",
};

export default function TasksTable({ tasks }: { tasks: Task[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Assigned Developer</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Total Time (hrs)</TableHead>
          <TableHead>Created Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center text-muted-foreground">
              No tasks found.
            </TableCell>
          </TableRow>
        ) : (
          tasks.map(task => (
            <TableRow key={task.id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>
                <Badge variant="outline">{task.developer}</Badge>
              </TableCell>
              <TableCell>
                <span className={cn("px-2 py-1 rounded font-medium text-xs", priorityColors[task.priority])}>
                  {task.priority}
                </span>
              </TableCell>
              <TableCell>
                <span className={cn("px-2 py-1 rounded font-semibold text-xs", statusColors[task.status])}>
                  {task.status}
                </span>
              </TableCell>
              <TableCell>{task.timeSpent}</TableCell>
              <TableCell>{task.createdAt}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
