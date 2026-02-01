import { motion } from "framer-motion";
import { Globe, Tv, Monitor, Smartphone } from "lucide-react";

const platforms = [
  { icon: Globe, name: "Web Browser", description: "Chrome, Safari, Firefox" },
  { icon: Tv, name: "Smart TV", description: "Samsung, LG, Sony" },
  { icon: Monitor, name: "Android TV", description: "Google TV, Fire TV" },
  { icon: Smartphone, name: "Any Phone", description: "iOS & Android" },
];

const Platforms = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Play on <span className="text-gradient">any device</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Works everywhere. No downloads, no special hardware needed.
          </p>
        </motion.div>

        {/* Platforms Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="text-center group"
            >
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-muted to-card border border-border flex items-center justify-center mb-4 group-hover:border-primary/50 group-hover:shadow-lg group-hover:shadow-primary/10 transition-all">
                <platform.icon className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{platform.name}</h3>
              <p className="text-sm text-muted-foreground">{platform.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Platforms;
