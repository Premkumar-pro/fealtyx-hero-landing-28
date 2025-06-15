
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

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
          // Google "G" SVG
          <svg className="mr-2" width="20" height="20" viewBox="0 0 20 20">
            <g>
              <path fill="#4285F4" d="M19.6 10.23c0-.68-.06-1.36-.17-2H10v3.79h5.45A4.65 4.65 0 0110 15.13a4.66 4.66 0 110-9.32c1.27 0 2.42.47 3.31 1.24l2.47-2.48C14.95 2.53 12.62 1.5 10 1.5 4.75 1.5.5 5.75.5 11s4.25 9.5 9.5 9.5c4.6 0 8.4-3.29 9.1-7.62.07-.39.1-.8.1-1.15z"/>
              <path fill="#34A853" d="M3.94 6.16l2.85 2.08A4.63 4.63 0 0110 6.81c1.27 0 2.42.47 3.31 1.24l2.47-2.48C14.95 2.53 12.62 1.5 10 1.5c-2.45 0-4.7.78-6.47 2.11l2.41 2.55z"/>
              <path fill="#FBBC05" d="M10 18.5c2.46 0 4.54-.8 6.02-2.17l-2.86-2.32c-.67.49-1.53.83-2.46.83-1.74 0-3.22-1.13-3.76-2.67H3.99v2.67A8.52 8.52 0 0010 18.5z"/>
              <path fill="#EA4335" d="M16.02 16.33L13.16 14c-.68.52-1.55.86-2.46.86-1.74 0-3.22-1.13-3.76-2.67H3.99v2.67A8.5 8.5 0 0010 18.5c2.46 0 4.54-.8 6.02-2.17z"/>
            </g>
          </svg>
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
