
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const developers = [
  {
    name: "Alice Li",
    role: "Frontend Developer",
    avatar: "https://randomuser.me/api/portraits/women/88.jpg",
    initials: "AL",
    feedback:
      "FealtyX made tracking bugs super efficient. I love the seamless workflow and clean UI. Our resolution time dropped dramatically.",
  },
  {
    name: "Javier Morales",
    role: "Backend Engineer",
    avatar: "https://randomuser.me/api/portraits/men/49.jpg",
    initials: "JM",
    feedback:
      "Role-based dashboards are intuitive and fast. The bug history helps me collaborate better with my teammates!",
  },
  {
    name: "Fatima Mahmood",
    role: "DevOps Specialist",
    avatar: "https://randomuser.me/api/portraits/women/52.jpg",
    initials: "FM",
    feedback:
      "The manager oversight features changed our approach. I now have full visibility across all projects. Love it!",
  },
  {
    name: "Samir Patel",
    role: "Fullstack Developer",
    avatar: "https://randomuser.me/api/portraits/men/15.jpg",
    initials: "SP",
    feedback:
      "FealtyX helps me and my team resolve issues faster than ever. The collaborative tools are superb.",
  },
  {
    name: "Mikaela Söderström",
    role: "QA Engineer",
    avatar: "https://randomuser.me/api/portraits/women/43.jpg",
    initials: "MS",
    feedback:
      "Using FealtyX on mobile and desktop is a breeze! It just works, no matter where I'm testing from.",
  },
];

export const DeveloperFeedbackSection = () => (
  <section className="py-20 bg-muted/60 dark:bg-muted/40 relative">
    <div className="max-w-5xl mx-auto px-4">
      <div className="text-center mb-10">
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          What Developers Are Saying
        </h3>
        <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
          Trusted by engineers to squash bugs faster with FealtyX.
        </p>
      </div>
      <Separator className="mb-12 mx-auto w-32" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {developers.map((dev, idx) => (
          <Card
            key={idx}
            className="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border bg-card"
          >
            <CardContent className="flex flex-col items-center p-8">
              <Avatar className="mb-4 h-16 w-16 shadow">
                <AvatarImage src={dev.avatar} alt={dev.name} />
                <AvatarFallback>{dev.initials}</AvatarFallback>
              </Avatar>
              <div className="text-foreground text-lg font-semibold mb-1 text-center">
                {dev.name}
              </div>
              <span className="text-sm text-muted-foreground mb-3 text-center">
                {dev.role}
              </span>
              <blockquote className="italic text-muted-foreground text-center leading-relaxed">
                "{dev.feedback}"
              </blockquote>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);
