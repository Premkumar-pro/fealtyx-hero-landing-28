
import { Task } from "@/types/task";

// Initial demo data (you can edit as you wish)
let tasks: Task[] = [
  {
    id: "TASK-1001",
    title: "Demo: Fix login error",
    developer: "Alice",
    status: "Open",
    priority: "High",
    createdAt: "2023-04-10",
    dueDate: "2023-04-15",
    timeSpent: 2,
  },
  {
    id: "TASK-1002",
    title: "Demo: Update dashboard layout",
    developer: "Bob",
    status: "In Progress",
    priority: "Medium",
    createdAt: "2023-04-05",
    dueDate: "2023-04-20",
    timeSpent: 5,
  },
];

// Simulate network delay
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Fetch all tasks
export async function fetchTasks(): Promise<Task[]> {
  await delay(400); // simulate 400ms API delay
  return [...tasks];
}

// Add a new task
export async function createTask(task: Task): Promise<Task> {
  await delay(400);
  tasks.push(task);
  return task;
}

// Update a task by id
export async function updateTask(id: string, updates: Partial<Task>): Promise<Task | undefined> {
  await delay(400);
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return undefined;
  tasks[index] = { ...tasks[index], ...updates };
  return tasks[index];
}

// Delete a task by id
export async function deleteTask(id: string): Promise<boolean> {
  await delay(400);
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}
