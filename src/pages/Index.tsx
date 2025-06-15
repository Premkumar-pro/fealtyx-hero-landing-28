
import { HeroSection } from "@/components/landing/HeroSection";
import { FeatureShowcase } from "@/components/landing/FeatureShowcase";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { Footer } from "@/components/landing/Footer";
import { DeveloperFeedbackCarousel } from "@/components/landing/DeveloperFeedbackCarousel";

const Index = () => {
  return (
    <div className="min-h-screen bg-background dark:bg-background transition-colors duration-300">
      {/* All landing components use global AppLayout header now */}
      <HeroSection />
      <FeatureShowcase />
      <TestimonialsSection />
      <FAQSection />
      {/* DeveloperFeedbackSection removed */}
      <DeveloperFeedbackCarousel />
      <Footer />
    </div>
  );
};

export default Index;
