
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Clock, CheckCircle, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Role-Based Dashboards",
    description: "Tailored interfaces for developers and managers with relevant metrics and controls for each role.",
  },
  {
    icon: Clock,
    title: "Time Tracking & Reporting",
    description: "Accurate time logging with detailed reports to understand project timelines and resource allocation.",
  },
  {
    icon: CheckCircle,
    title: "Approval Workflow",
    description: "Streamlined approval process for bug closures and task completions with manager oversight.",
  },
  {
    icon: TrendingUp,
    title: "Trendline Metrics",
    description: "Visual analytics and trend analysis to track team performance and project health over time.",
  },
];

export const FeatureShowcase = () => {
  return (
    <section id="features" className="py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Powerful Features for Modern Development
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to manage bugs, track tasks, and keep your development team productive and aligned.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-border">
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional feature highlight */}
        <div className="mt-20 text-center">
          <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20">
            <h3 className="text-2xl font-bold mb-4">Built for Scale</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From startup teams to enterprise organizations, FealtyX scales with your needs. 
              Secure, reliable, and designed for the modern development workflow.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
