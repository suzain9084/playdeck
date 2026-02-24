import { Smartphone, Gamepad2, Maximize, Minimize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback, AvatarGroup } from "./ui/avatar";
import { getInitials, stringToColor, toggleFullScreen } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import logo from "/logo.png"

const GameHeader = () => {
  const dispatch = useDispatch();
  const isFullScreen = useSelector((state: RootState) => state.appState.isFullScreen);
  const players = useSelector((state: RootState) => state.appState.players);
  const roomId = useSelector((state: RootState) => state.appState.roomId);

  return (
    <header className="sticky top-0 z-50 px-6 w-full border-b border-border/40 bg-background/80 gradient-hero supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
            <img src={logo} alt="PlayDeck" className="w-8 h-8" />
          </div>
          <span className="text-xl font-bold text-foreground">PlayDeck</span>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          {/* User avatar placeholder */}
          <AvatarGroup className="grayscale">
            {players.map((item) => {
              const initials = getInitials(item.name);
              const bgColor = stringToColor(item.name);

              return (
                <Avatar key={item.name} className="h-9 w-9">
                  <AvatarImage src=""> </AvatarImage>
                  <AvatarFallback
                    className="flex h-full w-full items-center justify-center rounded-full text-sm font-semibold text-white"
                    style={{ backgroundColor: bgColor }}
                  >
                    {initials}
                  </AvatarFallback>
                </Avatar>
              );
            })}
          </AvatarGroup>

          {/* Add more phones button */}
          <Button
            variant="outline"
            className="hidden sm:flex items-center gap-2 border-gaming-green/50 text-gaming-green hover:bg-gaming-green/10 hover:text-gaming-green rounded-sm"
          >
            <Smartphone className="h-4 w-4" />
            Add more players
          </Button>

          {/* Session code */}
          <div className="flex items-center gap-2 rounded-sm bg-muted px-3 py-2">
            <span className="text-gaming-green text-lg">🎫</span>
            <span className="font-mono font-bold text-foreground tracking-wide">{roomId}</span>
          </div>

          {/* Fullscreen button */}
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors"
            onClick={() => toggleFullScreen(dispatch)}>
            {!isFullScreen ? <Minimize className="w-6 h-6 text-gray-400" /> : <Maximize className="w-6 h-6 text-gray-400" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default GameHeader;
