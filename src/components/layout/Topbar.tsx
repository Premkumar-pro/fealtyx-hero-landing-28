
import { UserButton, useUser } from "@clerk/clerk-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";

export const Topbar = () => {
  const { user } = useUser();

  return (
    <header className="flex justify-between items-center h-16 px-6 border-b bg-background/70 backdrop-blur-md z-40 dark:bg-background dark:text-white">
      <span className="font-bold text-xl text-primary dark:text-white">FealtyX</span>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        {user && (
          <div className="flex gap-2 items-center">
            <span className="text-sm font-medium">{user.fullName}</span>
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        )}
      </div>
    </header>
  );
};
