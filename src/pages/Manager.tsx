
import { useUser, SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { useUserRole } from "@/hooks/useUserRole";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Manager = () => {
  const { isLoaded: userLoaded } = useUser();
  const { role, isLoading } = useUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && userLoaded) {
      if (role !== "manager") {
        navigate(role === "developer" ? "/dashboard" : "/");
      }
    }
  }, [role, isLoading, userLoaded, navigate]);

  if (isLoading || !userLoaded) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Loading manager panel...</div>;
  }

  return (
    <>
      <SignedIn>
        <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-3xl font-bold">Welcome to Manager Panel</h1>
        </div>
      </SignedIn>
      <SignedOut>
        <div className="min-h-screen flex items-center justify-center">
          <SignInButton redirectUrl="/manager">
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg text-lg">Sign In</button>
          </SignInButton>
        </div>
      </SignedOut>
    </>
  );
};

export default Manager;
