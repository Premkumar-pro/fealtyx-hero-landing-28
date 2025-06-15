
export interface Task {
  id: string;
  title: string;
  developer: string;
  assignee?: string; // for flexibility
  status: string;
  priority: string;
  createdAt?: string;
  dueDate?: string;
  timeSpent?: number;
  // Add any extra properties needed for your features
}
