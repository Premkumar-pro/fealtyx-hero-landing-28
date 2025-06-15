
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

type NewTaskFormProps = {
  onTaskCreated: () => void;
};

const NewTaskForm: React.FC<NewTaskFormProps> = ({ onTaskCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast({ title: "Task title required", variant: "destructive" });
      return;
    }
    setLoading(true);

    // Get the current authenticated user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      toast({
        title: "Not signed in",
        description: "You must be signed in to create a task.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("tasks").insert([
      {
        title,
        description: description || null,
        user_id: user.id,
      },
    ]);
    if (error) {
      toast({
        title: "Failed to create task",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Task created!",
        variant: "default",
      });
      setTitle("");
      setDescription("");
      if (onTaskCreated) onTaskCreated();
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 space-y-3">
      <Input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        disabled={loading}
        required
      />
      <Input
        placeholder="Description (optional)"
        value={description}
        onChange={e => setDescription(e.target.value)}
        disabled={loading}
      />
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Creating..." : "Add Task"}
      </Button>
    </form>
  );
};

export default NewTaskForm;
