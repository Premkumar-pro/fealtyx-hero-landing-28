
import { useEffect } from "react";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import { useUserRoleContext } from "@/context/UserRoleContext";
import PageLoader from "@/components/layout/PageLoader";
import { DashboardSidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { ProtectedRoute } from "@/routes/ProtectedRoute";

// Placeholder child pages
function AllBugs() {
  return (
    <div className="p-6">
      <h2 className="font-bold text-xl mb-2">All Submitted Bugs</h2>
      <div className="bg-card p-4 rounded shadow text-muted-foreground">[All bug reports here]</div>
    </div>
  );
}
function TimeLogs() {
  return (
    <div className="p-6">
      <h2 className="font-bold text-xl mb-2">Developer Time Logs</h2>
      <div className="bg-card p-4 rounded shadow text-muted-foreground">[Time logs here]</div>
    </div>
  );
}

export default function ManagerDashboardShell() {
  const { role, loading } = useUserRoleContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && role === "developer") {
      navigate("/dashboard", { replace: true });
    }
  }, [role, loading, navigate]);

  if (loading) return <PageLoader text="Loading Manager Panel..." />;
  if (role === null) return <Navigate to="/404" replace />;

  return (
    <ProtectedRoute requiredRole="manager">
      <div className="flex min-h-screen bg-muted dark:bg-background transition-colors duration-300">
        <DashboardSidebar />
        <div className="flex flex-col flex-1 min-h-screen">
          {/* Topbar is now empty, AppLayout provides top bar */}
          <Topbar />
          <main className="flex-1">
            <Routes>
              <Route index element={<AllBugs />} />
              <Route path="bugs" element={<AllBugs />} />
              <Route path="logs" element={<TimeLogs />} />
              <Route path="*" element={<Navigate to="/manager" />} />
            </Routes>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
