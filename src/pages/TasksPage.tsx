
import React, { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

// Use the shared Supabase client
import { supabase } from "@/integrations/supabase/client";

const TasksPage = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch all tasks from Supabase
  useEffect(() => {
    setLoading(true);
    supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          toast({
            title: "Error fetching tasks",
            description: error.message,
            variant: "destructive",
          });
        } else if (data) {
          setTasks(data);
        }
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-12 px-4">
      <h1 className="text-2xl font-bold mb-6">Tasks</h1>
      {loading ? (
        <div>Loading tasks...</div>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="p-4 bg-card border border-border rounded-xl shadow"
            >
              <h2 className="font-semibold text-lg">{task.title}</h2>
              <p className="text-muted-foreground">{task.description}</p>
              <span className="inline-block mt-2 text-xs bg-accent px-2 py-1 rounded">
                Status: {task.status}
              </span>
              <div className="text-xs text-muted-foreground mt-1">
                Created: {task.created_at && new Date(task.created_at).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TasksPage;
