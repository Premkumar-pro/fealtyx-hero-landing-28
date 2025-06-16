import React from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

// The topbar renders a sticky header with a sidebar toggle button (☰) on the left.
export const Topbar = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 left-0 z-40 w-full h-16 flex items-center justify-between bg-background/80 dark:bg-background backdrop-blur-md shadow-md transition-colors duration-300">
      <div className="flex items-center gap-3">
        {/* Sidebar menu toggle button on mobile/desktop when sidebar is collapsed */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="mr-2 md:hidden"
          aria-label="Open Sidebar Menu"
        >
          <Menu className="w-6 h-6" />
        </Button>
        <a href="/" className="flex items-center gap-3 ml-2">
          {/* Removed the deer image */}
          <span className="text-xl font-bold text-primary dark:text-white">FealtyX</span>
        </a>
      </div>
      {/* Right section (optional: user controls, etc.) */}
      <div />
    </header>
  );
};
