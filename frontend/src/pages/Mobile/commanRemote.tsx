import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import logo from "/logo.png";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Play,
  Volume2,
} from "lucide-react";
import { getInitials } from "@/lib/utils";
import { Suspense, useCallback } from "react";
import { gameMap } from "@/constant/gameComponentMap";

const CommanRemote = ({ socket }) => {
  const name = useSelector((state: RootState) => state.appState.name);
  const roomId = useSelector((state: RootState) => state.appState.roomId);
  const host = useSelector((state: RootState) =>
    state.appState.players.filter((item) => item.name === name),
  )[0];
  const ishost = host?.isHost;
  const playingGame = useSelector((state: RootState) => state.appState.playingGame);
  const Remote = playingGame !== "" ? gameMap[playingGame.toLowerCase().replace(" ", "_")]?.controller : undefined;

  const sendEventToScoket = useCallback(
    (direction: string) => {
      if (socket.current) {
        try {
          socket.current.send(
            JSON.stringify({
              from: host.socketId,
              event: "button_press",
              action: direction,
              room_id: roomId,
            }),
          );
        } catch (error) {
          console.log(error);
        }
      }
    },
    [socket, host, roomId],
  );

  return (
    <div className="h-screen w-full bg-background">
      {playingGame === "" && <>
      <div className="relative h-[45%] w-full flex flex-col justify-center align-middle">
        <div className="w-full py-4 px-6 absolute top-0 border-border/40 bg-background/80 gradient-hero supports-[backdrop-filter]:bg-background/60 ">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
              <img src={logo} alt="PlayDeck" className="w-8 h-8" />
            </div>
            <span className="text-xl font-bold text-foreground">PlayDeck</span>
          </div>
        </div>
        <div className="bg-blue-100 border-[8px] border-blue-400 w-[50%] aspect-square rounded-full flex justify-center align-middle self-center mt-10">
          <span className="text-[6.5rem] text-gray-700 self-center">
            {getInitials(name)}
          </span>
        </div>
        <div className="self-center pt-4 text-[1.5rem]">{name}</div>
      </div>
      <div className="h-[50%] border-t-2 border-t-gray-200 rounded-t-lg bg-black">
        {ishost ? (
          <div className="h-full w-full flex flex-col justify-center align-middle">
            <div className="w-full flex justify-center align-middle p-2">
              <div
                className="w-32 h-16 bg-gray-700 rounded-full flex justify-center shadow-lg active:scale-95 transition-all"
                onClick={() => sendEventToScoket("up")}
              >
                <ChevronUp className="text-white self-center" size={36} />
              </div>
            </div>
            <div className="w-full flex justify-center align-middle p-2 gap-4">
              <div
                className="w-16 h-32 bg-gray-700 rounded-full flex justify-center shadow-lg active:scale-95 transition-all"
                onClick={() => sendEventToScoket("left")}
              >
                <ChevronLeft className="text-white self-center" size={36} />
              </div>
              <div
                className="h-32 w-32 bg-gray-700 rounded-full flex justify-center shadow-lg active:scale-95 transition-all"
                onClick={() => sendEventToScoket("select")}
              >
                <Play className="text-white self-center" size={36} />
              </div>
              <div
                className="w-16 h-31 bg-gray-700 rounded-full flex justify-center shadow-lg active:scale-95 transition-all"
                onClick={() => sendEventToScoket("right")}
              >
                <ChevronRight className="text-white self-center" size={36} />
              </div>
            </div>
            <div className="w-full flex justify-center align-middle p-2">
              <div
                className="w-32 h-16 bg-gray-700 rounded-full flex justify-center shadow-lg active:scale-95 transition-all"
                onClick={() => sendEventToScoket("down")}
              >
                <ChevronDown className="text-white self-center" size={36} />
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-center align-middle p-2">
            <div className="w-64 h-64 bg-gray-700 rounded-full flex justify-center shadow-lg active:scale-95 transition-all self-center">
              <Volume2 className="text-white self-center" size={64} />
            </div>
          </div>
        )}
      </div>
      </>}
      <Suspense fallback={<div>Loading Game Assets...</div>}>
        {Remote && <Remote socket={socket}/>}
      </Suspense>
    </div>
  );
};

export default CommanRemote;
