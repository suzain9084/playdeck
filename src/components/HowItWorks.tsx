import { motion } from "framer-motion";
import { Monitor, Smartphone, Users, Play } from "lucide-react";

const steps = [
  {
    icon: Monitor,
    title: "Open on any screen",
    description: "Visit PlayDeck on your TV, laptop, or any big screen. No apps to download.",
  },
  {
    icon: Smartphone,
    title: "Connect your phones",
    description: "Friends scan a QR code to instantly turn their phones into controllers.",
  },
  {
    icon: Users,
    title: "Pick a game together",
    description: "Browse 100+ games and vote on what to play. Everyone gets a say.",
  },
  {
    icon: Play,
    title: "Start playing!",
    description: "That's it! No accounts, no installs. Just pure gaming fun.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-card relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "40px 40px"
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How it <span className="text-gradient">works</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Get from zero to gaming in under 30 seconds. No joke.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent z-0" />
              )}

              <div className="relative bg-background rounded-2xl p-6 border border-border hover:border-primary/50 transition-colors h-full">
                {/* Step Number */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
