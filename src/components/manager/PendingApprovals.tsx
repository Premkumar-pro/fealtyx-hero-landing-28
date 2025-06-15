
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Reopen, BadgeCheck } from "lucide-react";
import { Task } from "@/pages/ManagerDashboard";

type Props = {
  tasks: Task[];
  onApprove: (id: string) => void;
  onReopen: (id: string) => void;
};

export default function PendingApprovals({ tasks, onApprove, onReopen }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Pending Approvals{" "}
          <Badge variant="outline" className="ml-1">{tasks.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {tasks.length === 0 ? (
          <div className="text-sm text-muted-foreground">No bugs pending approval.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map(task => (
                <TableRow key={task.id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.developer}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => onApprove(task.id)}
                      className="flex gap-1"
                    >
                      <BadgeCheck className="w-4 h-4" />
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onReopen(task.id)}
                      className="flex gap-1"
                    >
                      <Reopen className="w-4 h-4" />
                      Reopen
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
