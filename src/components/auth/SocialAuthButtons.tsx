
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Github, Google } from "lucide-react";

// Mock handlers for social sign-in
function mockSignIn(provider: "google" | "github", redirectTo: string) {
  // Simulate network latency, success/fail
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      // 90% success rate
      if (Math.random() < 0.9) resolve();
      else reject(new Error("Social authentication failed."));
    }, 1200);
  });
}

export const SocialAuthButtons: React.FC<{
  redirectPath?: string; // default dashboard, can override
}> = ({ redirectPath }) => {
  const [loadingProvider, setLoadingProvider] = useState<null | "google" | "github">(null);
  const navigate = useNavigate();

  const handleProviderClick = async (provider: "google" | "github") => {
    setLoadingProvider(provider);
    toast({ title: "Signing in...", description: `Connecting with ${provider === "google" ? "Google" : "GitHub"}...` });
    try {
      await mockSignIn(provider, "");
      toast({ title: "Social Sign-In successful", description: `Welcome! Redirecting...` });
      setTimeout(() => {
        // Always redirect to dashboard, role selection not present here
        navigate(redirectPath || "/dashboard");
      }, 1100);
    } catch (err: any) {
      toast({ title: "Social Sign-In failed", description: err.message || "Try again.", variant: "destructive" });
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <Button
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center gap-2 border border-input bg-background dark:bg-card hover:bg-accent hover:text-accent-foreground transition h-11"
        disabled={!!loadingProvider}
        onClick={() => handleProviderClick("google")}
      >
        {loadingProvider === "google" ? (
          <svg className="animate-spin mr-2 h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
        ) : (
          <Google size={20} strokeWidth={2} className="mr-2" />
        )}
        Sign in with Google
      </Button>
      <Button
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center gap-2 border border-input bg-background dark:bg-card hover:bg-accent hover:text-accent-foreground transition h-11"
        disabled={!!loadingProvider}
        onClick={() => handleProviderClick("github")}
      >
        {loadingProvider === "github" ? (
          <svg className="animate-spin mr-2 h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
        ) : (
          <Github size={20} strokeWidth={2} className="mr-2" />
        )}
        Sign in with GitHub
      </Button>
    </div>
  );
};

export const SocialEmailDivider: React.FC = () => (
  <div className="flex items-center gap-4 w-full my-2">
    <div className="flex-1 h-px bg-border" />
    <span className="text-xs text-muted-foreground font-semibold uppercase">or continue with email</span>
    <div className="flex-1 h-px bg-border" />
  </div>
);
