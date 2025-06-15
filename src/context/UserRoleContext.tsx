
import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

type Role = "developer" | "manager" | null;

interface UserRoleContextType {
  role: Role;
  loading: boolean;
  refetch: () => void;
}

const UserRoleContext = createContext<UserRoleContextType>({
  role: null,
  loading: true,
  refetch: () => {},
});

export const useUserRoleContext = () => useContext(UserRoleContext);

export const UserRoleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, isLoaded } = useUser();
  const [role, setRole] = useState<Role>(null);
  const [loading, setLoading] = useState(true);

  const fetchRole = async () => {
    setLoading(true);
    if (!user || !isLoaded) {
      setRole(null);
      setLoading(false);
      return;
    }
    try {
      // Fetch with Clerk ID or fallback to email
      const res = await fetch(`/api/user/${user.id}`);
      if (res.ok) {
        const data = await res.json();
        setRole(data?.role || "developer"); // fallback default
      } else {
        setRole("developer");
      }
    } catch (err) {
      setRole("developer");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRole();
    // Only re-fetch when Clerk user changes
    // eslint-disable-next-line
  }, [user?.id, isLoaded]);

  return (
    <UserRoleContext.Provider value={{ role, loading, refetch: fetchRole }}>
      {children}
    </UserRoleContext.Provider>
  );
};
