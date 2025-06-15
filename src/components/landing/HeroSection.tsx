
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                FealtyX — Track Bugs,{" "}
                <span className="text-primary">Manage Tasks</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Empower your development workflow with real-time tracking and manager oversight. 
                Streamline bug resolution and task management for modern development teams.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="relative text-lg px-8 py-6 shadow-lg font-bold animate-fade-in transform transition-transform duration-200 border-2 border-primary bg-primary text-primary-foreground hover:scale-105 hover:shadow-primary/80 hover:shadow-[0_0_24px_4px] focus:ring-2 focus:ring-primary"
                asChild
              >
                <a href="/sign-in">
                  Get Started
                  {/* Glow effect */}
                  <span className="absolute inset-0 pointer-events-none rounded-lg bg-primary/30 blur-lg opacity-0 group-hover:opacity-80 transition-opacity duration-200"></span>
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6"
              >
                Watch Demo
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">Trusted by development teams worldwide</p>
              <div className="flex items-center space-x-8 opacity-60">
                <div className="text-sm font-semibold">TechCorp</div>
                <div className="text-sm font-semibold">DevStudio</div>
                <div className="text-sm font-semibold">CodeBase Inc</div>
              </div>
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 border border-border">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop&crop=center"
                alt="Development team collaboration"
                className="w-full h-auto rounded-lg shadow-lg"
              />
              {/* Floating elements for visual interest */}
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground p-3 rounded-lg shadow-lg">
                <span className="text-sm font-semibold">Bug Resolved ✓</span>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-background border border-border p-3 rounded-lg shadow-lg">
                <span className="text-sm font-semibold">Task Approved ✓</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
