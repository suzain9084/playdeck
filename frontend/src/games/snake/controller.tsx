import { RootState } from "@/lib/store";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

type gameState = "START" | "PLAYING" | "OVER";

const MobileController = ({ socket }) => {
    const [status, setStatus] = useState<gameState>("START");

    const name = useSelector((state: RootState) => state.appState.name);
    const roomId = useSelector((state: RootState) => state.appState.roomId);
    const screenSocket = useSelector((state: RootState) => state.appState.screenId);
    const host = useSelector((state: RootState) =>
        state.appState.players.filter((item) => item.name === name),
    )[0];
    const handleStart = () => {
        socket.current.send(JSON.stringify({
            to: screenSocket,
            event: "start",
            from: host.socketId,
            room_id: roomId
        }))
        setStatus("PLAYING");
    };

    const handlePress = (x: number, y: number) => {
        if (status === "PLAYING") {
            socket.current.send(JSON.stringify({
                to: screenSocket,
                from: host.socketId,
                event: "action",
                direction: { x, y },
                room_id: roomId
            }))
        }
    };

    const handleGameOver = useCallback((e) => {
        if (e.detail.event === "over") {
            setStatus("OVER");
        }
    }, []);

    useEffect(() => {
        window.addEventListener("snake-grid/action", handleGameOver);
        return () => {
            window.removeEventListener("snake-grid/action", handleGameOver);
        }
    }, [handleGameOver]);

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-900 p-4">
            {status === "PLAYING" ? (
                <div className="grid grid-cols-3 gap-4">
                    <div />
                    <button
                        onClick={() => handlePress(0, -1)}
                        className="h-24 w-24 rounded-2xl bg-slate-800 border-b-4 border-emerald-600 active:border-b-0 active:translate-y-1 flex items-center justify-center text-3xl text-white shadow-xl transition-all"
                    >
                        ↑
                    </button>
                    <div />

                    <button
                        onClick={() => handlePress(-1, 0)}
                        className="h-24 w-24 rounded-2xl bg-slate-800 border-b-4 border-emerald-600 active:border-b-0 active:translate-y-1 flex items-center justify-center text-3xl text-white shadow-xl transition-all"
                    >
                        ←
                    </button>
                    <button
                        onClick={() => handlePress(0, 1)}
                        className="h-24 w-24 rounded-2xl bg-slate-800 border-b-4 border-emerald-600 active:border-b-0 active:translate-y-1 flex items-center justify-center text-3xl text-white shadow-xl transition-all"
                    >
                        ↓
                    </button>
                    <button
                        onClick={() => handlePress(1, 0)}
                        className="h-24 w-24 rounded-2xl bg-slate-800 border-b-4 border-emerald-600 active:border-b-0 active:translate-y-1 flex items-center justify-center text-3xl text-white shadow-xl transition-all"
                    >
                        →
                    </button>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-6">
                    <h1 className="text-2xl font-bold text-white tracking-widest">
                        {status === "START" ? "READY?" : "GAME OVER"}
                    </h1>
                    <button
                        onClick={handleStart}
                        className="px-12 py-6 rounded-2xl bg-emerald-600 text-white font-black text-2xl shadow-[0_8px_0_rgb(5,150,105)] active:shadow-none active:translate-y-2 transition-all uppercase"
                    >
                        {status === "START" ? "Start Game" : "Play Again"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default MobileController;