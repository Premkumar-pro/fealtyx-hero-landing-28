
import React from "react";
import { useUser, UserButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-background transition-colors duration-300">
      <header className="w-full flex justify-between items-center h-16 px-4 sm:px-6 border-b bg-background/80 dark:bg-background dark:text-white backdrop-blur-md z-40 transition-colors duration-300">
        <a href="/" className="flex items-center gap-3">
          <img 
            src="https://images.unsplash.com/photo-1472396961693-142e6e269027?w=50&h=50&fit=crop&crop=center" 
            alt="Deer Logo" 
            className="w-10 h-10 rounded-lg object-cover border border-gray-200 dark:border-gray-700"
            onError={(e) => {
              console.log('Image failed to load');
              e.currentTarget.style.display = 'none';
            }}
          />
          <span className="text-xl font-bold text-primary dark:text-white">FealtyX</span>
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
            <>
              {/* Only show styled login button on landing, else show old one */}
              {isLanding ? (
                <SignedOut>
                  <motion.a
                    href="/sign-in"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="ml-2 inline-block px-7 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-md transition-all duration-200 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 group"
                    style={{ boxShadow: "0 4px 18px 0 rgba(108, 71, 255, 0.17)" }}
                  >
                    <span className="relative z-10">Login</span>
                  </motion.a>
                </SignedOut>
              ) : (
                <SignedOut>
                  <Button asChild variant="outline" className="ml-2">
                    <a href="/sign-in">Login</a>
                  </Button>
                </SignedOut>
              )}
            </>
          )}
        </div>
      </header>
      <main className="flex-1 bg-background dark:bg-background transition-colors duration-300">{children}</main>
    </div>
  );
}
