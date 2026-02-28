import { Star, Users, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import gameFeatured from "@/assets/game-featured.jpg";

interface FeaturedGameProps {
  title: string;
  description: string;
  rating: number;
  playerCount: string;
  tags?: string[];
  compact?: boolean;
}


const FeaturedGame = ({
  title = "Burnin' Rubber 5 Air",
  description = "Combative car racing with explosives! Battle your fellow players in a fast paced race while slowdown opponents with rockets, mines and more!",
  rating = 5,
  playerCount = "1-4",
  tags = [],
  compact = false,
}: FeaturedGameProps) => {
  return (
   <div className="relative rounded-2xl overflow-hidden gradient-card border border-border/50 h-96">
      <div className="h-full flex flex-col lg:flex-row">
        {/* Game Info Section */}
        <div className="flex-1 p-6 flex flex-col justify-between align-middle h-full">
          <div className="h-fit">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{title}</h2>
            
            {/* Rating and Players */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < rating ? "fill-gaming-yellow text-gaming-yellow" : "text-muted-foreground"}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span className="text-sm">{playerCount}</span>
              </div>
            </div>
            
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-lg">
              {description}
            </p>
          </div>

          {/* Tags and Play Button */}
          <div className="h-fit mt-6 space-y-4">
            {tags.length > 0 && (
              <div className="flex items-center gap-3">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    {tag === "Hero required" && (
                      <>
                        <span className="text-gaming-cyan">🎮</span>
                        {tag}
                      </>
                    )}
                    {tag === "No ad breaks" && (
                      <>
                        <span className="text-gaming-green">✓</span>
                        {tag}
                      </>
                    )}
                  </span>
                ))}
              </div>
            )}

            <Button
              // onClick={onPlay}
              className="gradient-primary text-primary-foreground glow-primary hover:opacity-90 transition-opacity"
              size="lg"
            >
              <Play className="h-5 w-5 mr-2 fill-current" />
              Play Now
            </Button>
          </div>
        </div>

        {/* Game Screenshot */}
        <div className="relative w-1/2 h-28 sm:h-26 lg:h-auto">
          <img
            src={gameFeatured}
            alt={title}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay for blending */}
          <div className="absolute inset-0 bg-gradient-to-r from-card via-transparent to-transparent lg:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent lg:hidden" />
        </div>
      </div>
    </div>
  );
};

export default FeaturedGame;
