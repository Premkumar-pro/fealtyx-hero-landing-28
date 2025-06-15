
import { useEffect } from "react";
import { useNavigate, Outlet, Routes, Route, Navigate } from "react-router-dom";
import { useUserRoleContext } from "@/context/UserRoleContext";
import PageLoader from "@/components/layout/PageLoader";
import { DashboardSidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { ProtectedRoute } from "@/routes/ProtectedRoute";

// Placeholder child pages
function TaskList() {
  // Replace with real data fetch
  return (
    <div className="grid gap-4 p-6">
      <h2 className="text-xl font-bold mb-2">My Tasks</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-card p-4 rounded-lg shadow">
          <div className="font-semibold">Fix login bug</div>
          <div className="text-sm text-muted-foreground">Status: Open</div>
        </div>
        <div className="bg-card p-4 rounded-lg shadow">
          <div className="font-semibold">UI Polish</div>
          <div className="text-sm text-muted-foreground">Status: In Progress</div>
        </div>
      </div>
    </div>
  );
}
function CreateTask() {
  // Replace with real form/shadcn form
  return (
    <div className="p-6">
      <h2 className="font-bold text-xl mb-2">Create New Bug/Task</h2>
      <div className="bg-card p-4 rounded shadow text-muted-foreground">[Task creation form here]</div>
    </div>
  );
}
function TimeTracker() {
  return (
    <div className="p-6">
      <h2 className="font-bold text-xl mb-2">Time Tracker</h2>
      <div className="bg-card p-4 rounded shadow text-muted-foreground">[Time tracker here]</div>
    </div>
  );
}

export default function DashboardShell() {
  const { role, loading } = useUserRoleContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && role === "manager") {
      navigate("/manager", { replace: true });
    }
  }, [role, loading, navigate]);

  if (loading) return <PageLoader text="Loading Dashboard..." />;
  if (role === null) return <Navigate to="/404" replace />;

  return (
    <ProtectedRoute requiredRole="developer">
      <div className="flex min-h-screen bg-muted">
        <DashboardSidebar />
        <div className="flex flex-col flex-1 min-h-screen">
          <Topbar />
          <main className="flex-1">{/* Nested routing here */}
            <Routes>
              <Route index element={<TaskList />} />
              <Route path="tasks" element={<TaskList />} />
              <Route path="create" element={<CreateTask />} />
              <Route path="timer" element={<TimeTracker />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
