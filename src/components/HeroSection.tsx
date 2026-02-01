import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, Sparkles } from "lucide-react";
import heroDevices from "@/assets/hero-device.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

const HeroSection = () => {
  const isMobile = useSelector((state: RootState) => state.appState.isMobile) as boolean;
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero pt-40">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">No downloads. No installs. Just play.</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold text-foreground mb-6 leading-tight"
          >
            Playing games together has{" "}
            <span className="text-gradient">never been this easy</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            Your phones become controllers. Your screen becomes the console.
            Play 100+ party games with friends instantly.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/playgames">
              <Button variant="hero" size="xl" className="gap-3"
              >
                <Play className="w-5 h-5" />
                { isMobile ? "Make Your own Console" : "Start playing now"}
              </Button>
            </Link>
            <Button variant="outline" size="xl">
              See how it works
            </Button>

          </motion.div>
        </div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 relative"
        >
          <div className="relative mx-auto max-w-5xl pb-2">
            <img
              src={heroDevices}
              alt="PlayDeck - TV screen with phone controllers"
              className="w-full h-auto rounded-2xl"
            />
            {/* Glow effect under image */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-gradient-to-r from-primary/50 to-secondary/50 blur-3xl" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
