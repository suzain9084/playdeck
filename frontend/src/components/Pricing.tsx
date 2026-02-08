import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying out PlayDeck",
    features: [
      "Access to 20+ free games",
      "Up to 4 players",
      "Basic controller features",
      "Ads supported",
    ],
    cta: "Start free",
    featured: false,
  },
  {
    name: "PlayDeck Plus",
    price: "$4.99",
    period: "/month",
    description: "The ultimate party gaming experience",
    features: [
      "Access to 100+ games",
      "Up to 8+ players",
      "Premium controllers",
      "No ads ever",
      "Exclusive new games",
      "Priority support",
    ],
    cta: "Get Plus",
    featured: true,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-background relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Simple, <span className="text-gradient">fair pricing</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Start free. Upgrade when you're ready for more.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-3xl p-8 ${
                plan.featured
                  ? "bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-primary/50"
                  : "bg-card border border-border"
              }`}
            >
              {/* Featured Badge */}
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold flex items-center gap-1">
                  <Sparkles className="w-4 h-4" />
                  Most Popular
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-extrabold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-muted-foreground mt-2">{plan.description}</p>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      plan.featured ? "bg-primary" : "bg-muted"
                    }`}>
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant={plan.featured ? "hero" : "outline"}
                size="xl"
                className="w-full"
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
