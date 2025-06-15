
import React from "react";
import { Button } from "@/components/ui/button";
import { Filter, ArrowDown, ArrowUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

type Props = {
  statusFilter: string | null;
  setStatusFilter: (s: string | null) => void;
  priorityFilter: string | null;
  setPriorityFilter: (s: string | null) => void;
  devFilter: string | null;
  setDevFilter: (s: string | null) => void;
  statuses: string[];
  priorities: string[];
  developers: string[];
  sortBy: "createdAt" | "timeSpent";
  setSortBy: (s: "createdAt" | "timeSpent") => void;
  sortDir: "asc" | "desc";
  setSortDir: (d: "asc" | "desc") => void;
};

export default function TaskFilterBar({
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  devFilter,
  setDevFilter,
  statuses,
  priorities,
  developers,
  sortBy,
  setSortBy,
  sortDir,
  setSortDir,
}: Props) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Filter className="text-muted-foreground" size={20} />
      <Label>Status</Label>
      <select
        className="bg-background dark:bg-muted p-1 rounded border"
        value={statusFilter || ""}
        onChange={e => setStatusFilter(e.target.value || null)}
      >
        <option value="">All</option>
        {statuses.map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <Label>Priority</Label>
      <select
        className="bg-background dark:bg-muted p-1 rounded border"
        value={priorityFilter || ""}
        onChange={e => setPriorityFilter(e.target.value || null)}
      >
        <option value="">All</option>
        {priorities.map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <Label>Developer</Label>
      <select
        className="bg-background dark:bg-muted p-1 rounded border"
        value={devFilter || ""}
        onChange={e => setDevFilter(e.target.value || null)}
      >
        <option value="">All</option>
        {developers.map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <Label>Sort By</Label>
      <select
        className="bg-background dark:bg-muted p-1 rounded border"
        value={sortBy}
        onChange={e => setSortBy(e.target.value as "createdAt" | "timeSpent")}
      >
        <option value="createdAt">Date</option>
        <option value="timeSpent">Time Spent</option>
      </select>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}
        className="ml-1"
        aria-label="Toggle sort direction"
      >
        {sortDir === "asc" ? <ArrowUp /> : <ArrowDown />}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          setStatusFilter(null);
          setPriorityFilter(null);
          setDevFilter(null);
        }}
        className="ml-2"
      >
        Clear Filters
      </Button>
    </div>
  );
}
