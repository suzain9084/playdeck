import { ChevronLeft, ChevronRight, Flame, Heart, Trophy, Sparkles, Gamepad2 } from "lucide-react";
import { useRef } from "react";
import GameCard from "./GameCard";
import { Button } from "@/components/ui/button";

interface Game {
  id: string;
  title: string;
  image: string;
}

interface GameRowProps {
  title: string;
  icon?: "hot" | "favorites" | "new" | "top" | "family";
  games: Game[];
  onGameClick?: (gameId: string) => void;
}

const iconMap = {
  hot: <Flame className="h-5 w-5 text-gaming-pink" />,
  favorites: <Heart className="h-5 w-5 text-gaming-pink" />,
  new: <Sparkles className="h-5 w-5 text-gaming-cyan" />,
  top: <Trophy className="h-5 w-5 text-gaming-yellow" />,
  family: <Gamepad2 className="h-5 w-5 text-gaming-green" />,
};

const GameRow = ({ title, icon = "hot", games, onGameClick }: GameRowProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-4">
      {/* Section Header */}
      <div className="flex items-center justify-between px-4 md:px-6 mb-4">
        <div className="flex items-center gap-2">
          {iconMap[icon]}
          <h3 className="text-lg md:text-xl font-semibold text-foreground">{title}</h3>
        </div>

        {/* Navigation arrows for larger screens */}
        {/* <div className="hidden md:flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll("left")}
            className="h-8 w-8 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll("right")}
            className="h-8 w-8 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div> */}
      </div>

      {/* Games scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-3 md:gap-4 pt-8 overflow-x-auto scrollbar-hide pb-2 hide-scrollbar"
      >
        {games.map((game) => (
          <GameCard
            key={game.id}
            title={game.title}
            image={game.image}
            onClick={() => onGameClick?.(game.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default GameRow;
