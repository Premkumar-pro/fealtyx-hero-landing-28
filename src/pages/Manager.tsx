
import React from "react";
import ManagerDashboardPage from "./ManagerDashboard";

// Only render the dashboard shell directly, do NOT wrap in AppLayout or any global header.
export default function ManagerDashboardShell() {
  return <ManagerDashboardPage />;
}
