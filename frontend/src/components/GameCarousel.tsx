import { motion } from "framer-motion";

// Import game images
import gameParty1 from "@/assets/game-party-1.png";
import gameParty2 from "@/assets/game-party-2.png";
import gameParty3 from "@/assets/game-party-3.png";
import gameAction1 from "@/assets/game-action-1.png";
import gameAction2 from "@/assets/game-action-2.png";
import gameAction3 from "@/assets/game-action-3.png";
import gameCasual1 from "@/assets/game-casual-1.png";
import gameCasual2 from "@/assets/game-casual-2.png";
import gameCasual3 from "@/assets/game-casual-3.png";

interface GameCardProps {
  image: string;
  title: string;
  players: string;
}

const GameCard = ({ image, title, players }: GameCardProps) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -5 }}
    className="flex-shrink-0 w-48 md:w-56 cursor-pointer group"
  >
    <div className="relative rounded-2xl overflow-hidden bg-card shadow-lg group-hover:shadow-xl group-hover:shadow-primary/20 transition-all duration-300">
      <img
        src={image}
        alt={title}
        className="w-full aspect-square object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform">
        <h3 className="text-foreground font-semibold text-sm">{title}</h3>
        <p className="text-muted-foreground text-xs">{players}</p>
      </div>
    </div>
  </motion.div>
);

interface GameRowProps {
  title: string;
  games: GameCardProps[];
  direction: "left" | "right";
}

const GameRow = ({ title, games, direction }: GameRowProps) => {
  // Duplicate games for infinite scroll effect
  const duplicatedGames = [...games, ...games];

  return (
    <div className="mb-12">
      <h3 className="text-xl font-bold text-foreground mb-6 px-6">{title}</h3>
      <div className="relative overflow-hidden">
        <div
          className={`flex gap-4 ${
            direction === "left" ? "animate-scroll-left" : "animate-scroll-right"
          }`}
          style={{ width: "max-content" }}
        >
          {duplicatedGames.map((game, index) => (
            <GameCard key={`${game.title}-${index}`} {...game} />
          ))}
        </div>
      </div>
    </div>
  );
};

const GameCarousel = () => {
  const partyGames = [
    { image: gameParty1, title: "Party Madness", players: "2-8 players" },
    { image: gameParty2, title: "Trivia Quiz", players: "2-10 players" },
    { image: gameParty3, title: "Sports Showdown", players: "2-6 players" },
    { image: gameCasual2, title: "Draw & Guess", players: "3-8 players" },
    { image: gameCasual3, title: "Dance Battle", players: "2-4 players" },
  ];

  const actionGames = [
    { image: gameAction1, title: "Turbo Racing", players: "2-4 players" },
    { image: gameAction2, title: "Space Blasters", players: "1-4 players" },
    { image: gameAction3, title: "Battle Royale", players: "2-8 players" },
    { image: gameParty3, title: "Goal Rush", players: "2-4 players" },
    { image: gameCasual1, title: "Block Smash", players: "1-2 players" },
  ];

  const casualGames = [
    { image: gameCasual1, title: "Gem Match", players: "1-2 players" },
    { image: gameCasual2, title: "Doodle Art", players: "2-6 players" },
    { image: gameCasual3, title: "Rhythm Dance", players: "1-4 players" },
    { image: gameParty1, title: "Family Fun", players: "2-8 players" },
    { image: gameParty2, title: "Quiz Master", players: "2-10 players" },
  ];

  return (
    <section id="games" className="py-24 bg-background relative overflow-hidden">
      {/* Section Header */}
      <div className="container mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            100+ games to <span className="text-gradient">play together</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            From party games to action-packed adventures, there's something for everyone.
          </p>
        </motion.div>
      </div>

      {/* Game Rows */}
      <GameRow title="🎉 Party Games" games={partyGames} direction="left" />
      <GameRow title="⚡ Action Games" games={actionGames} direction="right" />
      <GameRow title="🎮 Casual & Family" games={casualGames} direction="left" />
    </section>
  );
};

export default GameCarousel;
