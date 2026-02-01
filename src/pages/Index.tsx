import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import GameCarousel from "@/components/GameCarousel";
import HowItWorks from "@/components/HowItWorks";
import Platforms from "@/components/Platforms";
import Benefits from "@/components/Benefits";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <GameCarousel />
      <HowItWorks />
      <Platforms />
      <Benefits />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
