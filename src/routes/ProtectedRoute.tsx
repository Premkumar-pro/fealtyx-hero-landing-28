
import { useUser } from "@clerk/clerk-react";
import { useUserRoleContext } from "@/context/UserRoleContext";
import PageLoader from "@/components/layout/PageLoader";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({
  children,
  requiredRole,
}: {
  children: React.ReactNode;
  requiredRole?: "developer" | "manager";
}) {
  const { isSignedIn, isLoaded } = useUser();
  const { role, loading } = useUserRoleContext();

  if (!isLoaded || loading) return <PageLoader text="Checking role..." />;
  if (!isSignedIn) return <Navigate to="/sign-in" replace />;
  if (requiredRole && role !== requiredRole) return <Navigate to="/404" replace />;

  return <>{children}</>;
}
