import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";

const developers = [
  {
    name: "Alice Li",
    role: "Frontend Developer",
    avatar: "https://randomuser.me/api/portraits/women/88.jpg",
    initials: "AL",
    quote: "FealtyX made tracking bugs super efficient!",
  },
  {
    name: "Javier Morales",
    role: "Backend Engineer",
    avatar: "https://randomuser.me/api/portraits/men/49.jpg",
    initials: "JM",
    quote: "I love the role-based dashboard – so intuitive and fast.",
  },
  {
    name: "Fatima Mahmood",
    role: "DevOps Specialist",
    avatar: "https://randomuser.me/api/portraits/women/52.jpg",
    initials: "FM",
    quote: "The manager oversight features are a game-changer.",
  },
  {
    name: "Samir Patel",
    role: "Fullstack Developer",
    avatar: "https://randomuser.me/api/portraits/men/15.jpg",
    initials: "SP",
    quote: "FealtyX helps our team resolve issues faster than ever.",
  },
  {
    name: "Mikaela Söderström",
    role: "QA Engineer",
    avatar: "https://randomuser.me/api/portraits/women/43.jpg",
    initials: "MS",
    quote: "Love how easy it is to use on both desktop and mobile!",
  },
];

const SLIDES_PER_VIEW = {
  base: 1,
  md: 2,
  lg: 3,
};

export const DeveloperFeedbackCarousel: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: "center",
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 1024px)": { slidesToScroll: 1 },
      "(min-width: 768px)": { slidesToScroll: 1 }
    }
  }, [
    Autoplay({ delay: 3500, stopOnInteraction: false })
  ]);

  // Responsive perView logic (JS-based since shadcn carousel doesn't do this natively)
  const [slidesPerView, setSlidesPerView] = React.useState(1);

  React.useEffect(() => {
    const updateSlides = () => {
      if (window.innerWidth >= 1024) setSlidesPerView(3);
      else if (window.innerWidth >= 768) setSlidesPerView(2);
      else setSlidesPerView(1);
    };
    updateSlides();
    window.addEventListener("resize", updateSlides);
    // FIX: Return only the cleanup function, not a function-returning-function!
    return () => {
      window.removeEventListener("resize", updateSlides);
    };
  }, []);

  // Pagination dots
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", onSelect);
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  return (
    <section className="py-20 bg-muted/50 dark:bg-muted/30">
      <div className="max-w-5xl mx-auto px-4">
        <h3 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
          What Developers Say
        </h3>
        <div className="relative">
          <div
            ref={emblaRef}
            className="overflow-hidden"
            aria-label="Developer Feedback Carousel"
          >
            <div
              className={cn(
                "flex transition-transform duration-500",
              )}
              style={{
                gap: "2rem",
              }}
            >
              {developers.map((dev, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "min-w-0 shrink-0 grow-0",
                    slidesPerView === 1
                      ? "basis-full"
                      : slidesPerView === 2
                        ? "basis-1/2"
                        : "basis-1/3"
                  )}
                >
                  <div className="bg-card rounded-xl shadow-lg p-8 mb-4 flex flex-col items-center transition-all duration-300 hover:shadow-xl border border-border">
                    <Avatar className="mb-4 h-16 w-16 shadow">
                      <AvatarImage src={dev.avatar} alt={dev.name} />
                      <AvatarFallback>{dev.initials}</AvatarFallback>
                    </Avatar>
                    <p className="text-foreground font-medium text-lg mb-1 text-center">{dev.name}</p>
                    <span className="text-muted-foreground text-sm mb-2 text-center">{dev.role}</span>
                    <blockquote className="italic text-muted-foreground text-center">“{dev.quote}”</blockquote>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Pagination Dots */}
          <div className="flex justify-center items-center mt-6 gap-2">
            {developers.map((_, idx) => (
              <button
                key={idx}
                onClick={() => emblaApi && emblaApi.scrollTo(idx)}
                className={cn(
                  "w-3 h-3 rounded-full transition-colors duration-300 border-2",
                  selectedIndex === idx
                    ? "bg-primary border-primary"
                    : "bg-muted border-border"
                )}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <span className="inline-block text-base md:text-lg text-primary font-semibold bg-accent/50 dark:bg-accent/30 px-6 py-3 rounded-xl shadow hover-scale">
            Join 100+ developers using FealtyX daily.
          </span>
        </div>
      </div>
    </section>
  );
};
