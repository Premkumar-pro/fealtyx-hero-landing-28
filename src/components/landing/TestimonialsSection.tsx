
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    quote: "FealtyX has transformed how our development team tracks and resolves bugs. The manager oversight features give us complete visibility into our workflow.",
    author: "Sarah Chen",
    role: "Engineering Manager",
    company: "TechCorp",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    initials: "SC"
  },
  {
    quote: "The time tracking and approval workflow features have streamlined our entire development process. We've reduced bug resolution time by 40%.",
    author: "Michael Rodriguez",
    role: "Lead Developer",
    company: "DevStudio",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    initials: "MR"
  },
  {
    quote: "Finally, a bug tracker that understands the needs of both developers and managers. The role-based dashboards are game-changing.",
    author: "Emily Johnson",
    role: "Product Manager",
    company: "CodeBase Inc",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    initials: "EJ"
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Loved by Development Teams
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See what teams around the world are saying about FealtyX.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <blockquote className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                    <AvatarFallback>{testimonial.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust section */}
        <div className="mt-20 text-center">
          <p className="text-sm text-muted-foreground mb-8">Trusted by companies of all sizes</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="font-bold text-lg">TechCorp</div>
            <div className="font-bold text-lg">DevStudio</div>
            <div className="font-bold text-lg">CodeBase Inc</div>
            <div className="font-bold text-lg">InnovateLab</div>
            <div className="font-bold text-lg">BuildForge</div>
          </div>
        </div>
      </div>
    </section>
  );
};
