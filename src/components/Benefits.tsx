import { motion } from "framer-motion";
import { Download, Users, Smartphone, Monitor, Zap, Shield } from "lucide-react";

const benefits = [
  {
    icon: Download,
    title: "No downloads",
    description: "Play instantly in your browser. No app store, no waiting.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Users,
    title: "Unlimited players",
    description: "From 2 to 8+ players. The more, the merrier!",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Smartphone,
    title: "Phones as controllers",
    description: "Everyone already has a controller in their pocket.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Monitor,
    title: "Works on any screen",
    description: "TV, laptop, tablet, projector – if it has a browser, it works.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Zap,
    title: "Instant setup",
    description: "Scan a QR code and you're in. Under 30 seconds.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Shield,
    title: "Family friendly",
    description: "Safe, ad-free gaming for players of all ages.",
    color: "from-indigo-500 to-purple-500",
  },
];

const Benefits = () => {
  return (
    <section className="py-24 bg-card relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Why choose <span className="text-gradient">PlayDeck</span>?
          </h2>
          <p className="text-muted-foreground text-lg">
            Built for the way you actually want to play games with friends.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="h-full bg-background rounded-2xl p-6 border border-border hover:border-primary/30 transition-all hover:shadow-xl hover:shadow-primary/5">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
