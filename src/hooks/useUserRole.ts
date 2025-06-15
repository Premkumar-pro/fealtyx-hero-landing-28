
import { useUser } from "@clerk/clerk-react";

/**
 * Custom hook for getting the current user's role from Clerk.
 * For demo: prem@fealtyx.com = manager, others = developer.
 */
export function useUserRole() {
  const { user, isLoaded } = useUser();

  // Loading
  if (!isLoaded) return { role: null, isLoading: true };

  // Hardcoded. In real app, fetch from DB or Clerk metadata.
  const email = user?.emailAddresses[0]?.emailAddress;
  let role = "developer";
  if (email === "prem@fealtyx.com") role = "manager";

  return { role, isLoading: false };
}
