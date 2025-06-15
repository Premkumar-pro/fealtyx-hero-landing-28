
import React from "react";
import { useUser, UserButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user } = useUser();

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-background transition-colors duration-300">
      <header className="w-full flex justify-between items-center h-16 px-4 sm:px-6 border-b bg-background/80 dark:bg-background dark:text-white backdrop-blur-md z-40 transition-colors duration-300">
        <a href="/" className="text-xl font-bold text-primary dark:text-white">
          FealtyX
        </a>
        <div className="flex items-center gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <ThemeToggle />
                </span>
              </TooltipTrigger>
              <TooltipContent side="bottom">Toggle Light/Dark Theme</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {user ? (
            <div className="flex gap-2 items-center">
              <span className="hidden sm:block text-sm font-medium">{user.fullName}</span>
              <UserButton afterSignOutUrl="/sign-in" />
            </div>
          ) : (
            // Only show on landing/auth, not within dashboards
            <SignedOut>
              <Button asChild variant="outline" className="ml-2">
                <a href="/sign-in">Login</a>
              </Button>
            </SignedOut>
          )}
        </div>
      </header>
      <main className="flex-1 bg-background dark:bg-background transition-colors duration-300">{children}</main>
    </div>
  );
}
