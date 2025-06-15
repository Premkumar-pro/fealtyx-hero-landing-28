
-- Create a 'tasks' table for user tasks
create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null, -- references the user's id from your users table or directly from auth if you use auth
  title text not null,
  description text,
  status text not null default 'todo',
  created_at timestamptz not null default now()
);

-- Enable Row Level Security (RLS) on the table
alter table public.tasks enable row level security;

-- Allow each user to see only their own tasks
create policy "Users can view their own tasks" on public.tasks
  for select using (user_id = auth.uid());

-- Allow users to insert tasks for themselves
create policy "Users can insert their own tasks" on public.tasks
  for insert with check (user_id = auth.uid());

-- Allow users to update their own tasks
create policy "Users can update their own tasks" on public.tasks
  for update using (user_id = auth.uid());

-- Allow users to delete their own tasks
create policy "Users can delete their own tasks" on public.tasks
  for delete using (user_id = auth.uid());
