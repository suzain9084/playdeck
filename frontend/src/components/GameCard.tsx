import { cn } from "@/lib/utils";

interface GameCardProps {
  title: string;
  image: string;
  onClick?: () => void;
  className?: string;
  size?: "small" | "medium" | "large";
}

const GameCard = ({
  title,
  image,
  onClick,
  className,
  size = "medium",
}: GameCardProps) => {
  const sizeClasses = {
    small: "w-28 h-28 sm:w-32 sm:h-32",
    medium: "w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44",
    large: "w-44 h-44 sm:w-52 sm:h-52",
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex-shrink-0 rounded-xl overflow-hidden transition-all duration-300 ml-3.5",
        "hover:scale-110 hover:shadow-2xl hover:z-10 ",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
        sizeClasses[size],
        className
      )}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      
      {/* Hover overlay with title */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="text-sm font-semibold text-foreground truncate">{title}</p>
        </div>
      </div>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-xl ring-2 ring-transparent group-hover:ring-primary/50 transition-all duration-300" />
    </button>
  );
};

export default GameCard;
