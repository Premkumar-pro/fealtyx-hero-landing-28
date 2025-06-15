import { HeroSection } from "@/components/landing/HeroSection";
import { FeatureShowcase } from "@/components/landing/FeatureShowcase";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { Footer } from "@/components/landing/Footer";
import { DeveloperFeedbackSection } from "@/components/landing/DeveloperFeedbackSection";
import { DeveloperFeedbackCarousel } from "@/components/landing/DeveloperFeedbackCarousel";

const Index = () => {
  // Remove page-level navbar, only use layout
  return (
    <div className="min-h-screen bg-background dark:bg-background transition-colors duration-300">
      {/* All landing components use global AppLayout header now */}
      <HeroSection />
      <FeatureShowcase />
      <TestimonialsSection />
      <FAQSection />
      {/* NEW: Developer grid section above carousel/footer */}
      <DeveloperFeedbackSection />
      <DeveloperFeedbackCarousel />
      <Footer />
    </div>
  );
};

export default Index;
