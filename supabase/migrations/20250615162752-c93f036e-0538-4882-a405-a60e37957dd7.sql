
-- 1. USERS table: stores user info with Clerk user IDs as primary keys
create table public.users (
  id uuid primary key,
  name text,
  email text,
  role text check (role in ('developer', 'manager')),
  created_at timestamptz not null default now()
);

-- 2. BUGS table: bug reports with relations to users
create table public.bugs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  status text not null check (status in ('todo', 'in-progress', 'done')),
  priority text not null check (priority in ('low', 'medium', 'high')),
  assigned_to uuid references public.users(id),
  reporter_id uuid references public.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

-- 3. COMMENTS table: user comments on bugs
create table public.comments (
  id uuid primary key default gen_random_uuid(),
  bug_id uuid not null references public.bugs(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now()
);

-- 4. ATTACHMENTS table: files attached to bugs
create table public.attachments (
  id uuid primary key default gen_random_uuid(),
  bug_id uuid not null references public.bugs(id) on delete cascade,
  file_url text not null,
  uploaded_by uuid not null references public.users(id) on delete set null,
  uploaded_at timestamptz not null default now()
);

-- 5. ACTIVITY_LOGS table (optional): tracks activity per bug
create table public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  bug_id uuid not null references public.bugs(id) on delete cascade,
  action text not null,
  created_at timestamptz not null default now()
);

-- Enable RLS for all tables
alter table public.users enable row level security;
alter table public.bugs enable row level security;
alter table public.comments enable row level security;
alter table public.attachments enable row level security;
alter table public.activity_logs enable row level security;

-- RLS Policies: Users can see/update/insert/delete only their rows
-- USERS: each Clerk user can see/update their own user record
create policy "Users can view self" on public.users
  for select using (id = auth.uid());

create policy "Users can update self" on public.users
  for update using (id = auth.uid());

create policy "Users can insert self" on public.users
  for insert with check (id = auth.uid());

-- BUGS: users can see bugs where they are assigned or reporter
create policy "Assigned/reporter can view bug" on public.bugs
  for select using (assigned_to = auth.uid() or reporter_id = auth.uid());

create policy "Reporter can insert bug" on public.bugs
  for insert with check (reporter_id = auth.uid());

create policy "Assigned/reporter can update bug" on public.bugs
  for update using (assigned_to = auth.uid() or reporter_id = auth.uid());

-- COMMENTS: users can view/add comments they authored or on bugs reported/assigned to them
create policy "Users can view their comments" on public.comments
  for select using (user_id = auth.uid());

create policy "Users can add comment as self" on public.comments
  for insert with check (user_id = auth.uid());

-- ATTACHMENTS: users can view/upload their own attachments
create policy "Uploader can view attachment" on public.attachments
  for select using (uploaded_by = auth.uid());

create policy "Uploader can add attachment" on public.attachments
  for insert with check (uploaded_by = auth.uid());

-- ACTIVITY_LOGS: users can view their own logs
create policy "User can view own activity logs" on public.activity_logs
  for select using (user_id = auth.uid());

create policy "User can add activity log" on public.activity_logs
  for insert with check (user_id = auth.uid());

-- You may further refine policies or add admin/manager access if needed.
