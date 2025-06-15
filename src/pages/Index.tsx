
const Index = () => {
  // Remove page-level navbar, only use layout
  return (
    <div className="min-h-screen bg-background dark:bg-background transition-colors duration-300">
      {/* All landing components use global AppLayout header now */}
      <HeroSection />
      <FeatureShowcase />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;
