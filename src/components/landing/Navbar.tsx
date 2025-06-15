
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { UserButton, SignedIn, SignedOut } from "@clerk/clerk-react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-primary">FealtyX</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">
                Pricing
              </a>
              <a href="#faq" className="text-muted-foreground hover:text-primary transition-colors">
                FAQ
              </a>
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:block">
            <SignedOut>
              <Button asChild>
                <a href="/sign-in">Login</a>
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
              <a
                href="#features"
                className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors"
                onClick={toggleMenu}
              >
                Features
              </a>
              <a
                href="#pricing"
                className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors"
                onClick={toggleMenu}
              >
                Pricing
              </a>
              <a
                href="#faq"
                className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors"
                onClick={toggleMenu}
              >
                FAQ
              </a>
              <div className="pt-2">
                <SignedOut>
                  <Button asChild className="w-full">
                    <a href="/sign-in">Login</a>
                  </Button>
                </SignedOut>
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
