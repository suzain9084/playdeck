import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does PlayDeck work?",
    answer: "PlayDeck turns your browser into a game console and your smartphones into controllers. Just open PlayDeck on any screen (TV, laptop, tablet), have your friends scan a QR code with their phones, and you're ready to play. No downloads or installations required!",
  },
  {
    question: "Do I need to download anything?",
    answer: "Nope! PlayDeck works entirely in your web browser. The main game runs on your big screen, and players join by opening a link on their phones. Everything happens instantly in the browser.",
  },
  {
    question: "How many players can play?",
    answer: "Most games support 2-8 players, but some party games allow even more! The free plan supports up to 4 players, while PlayDeck Plus unlocks 8+ player games.",
  },
  {
    question: "What devices are supported?",
    answer: "PlayDeck works on any modern web browser. For the main screen, you can use a laptop, desktop, smart TV (with browser), Android TV, Fire TV, or even a tablet. Controllers work on any iOS or Android phone.",
  },
  {
    question: "Is PlayDeck free?",
    answer: "Yes! PlayDeck offers a free tier with 20+ games and support for up to 4 players. For access to 100+ games, more players, and premium features, you can upgrade to PlayDeck Plus.",
  },
  {
    question: "Can I play with friends remotely?",
    answer: "Currently, PlayDeck is designed for local multiplayer where everyone is in the same room. Remote play features are on our roadmap for the future!",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-24 bg-card relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Frequently asked <span className="text-gradient">questions</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about PlayDeck.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-background rounded-2xl border border-border px-6 data-[state=open]:border-primary/50 transition-colors"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
