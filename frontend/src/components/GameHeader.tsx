import { Smartphone, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GameHeaderProps {
  sessionCode?: string;
}

const GameHeader = ({ sessionCode = "102 318 7" }: GameHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 gradient-hero supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
            <Gamepad2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">PlayDeck</span>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          {/* User avatar placeholder */}
          <div className="hidden md:flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground font-semibold">
            A
          </div>

          {/* Add more phones button */}
          <Button 
            variant="outline" 
            className="hidden sm:flex items-center gap-2 border-gaming-green/50 text-gaming-green hover:bg-gaming-green/10 hover:text-gaming-green"
          >
            <Smartphone className="h-4 w-4" />
            Add more phones
          </Button>

          {/* Session code */}
          <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2">
            <span className="text-gaming-green text-lg">✏️</span>
            <span className="font-mono font-bold text-foreground tracking-wide">{sessionCode}</span>
          </div>

          {/* Fullscreen button */}
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default GameHeader;
