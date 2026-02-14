import React, { useCallback, useEffect } from 'react';
import logo from "/favicon.svg";
import { QRCodeSVG } from 'qrcode.react';
import { Maximize, Minimize } from 'lucide-react';
import soundFile from '@/assets/entry_sound.mp3';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store';
import { toggleFullScreen } from '@/lib/utils';
import { setRoomId } from '@/lib/appState';
import { toast } from 'sonner';
import { useWebSocket } from '@/hooks/websockets';

const PlayGame = () => {
    const roomId = useSelector((state: RootState) => state.appState.roomId);
    const socketId = useSelector((state: RootState) => state.appState.socketId);
    const isFullScreen = useSelector((state: RootState) => state.appState.isFullScreen);
    const socket = useWebSocket(roomId)
    const dispatch = useDispatch<AppDispatch>();

    const fetch_room_id_code = useCallback(async () => {
        if (roomId.trim() === "") {
            try {
                const res = await fetch("http://localhost:8000/get_room_id");
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.room_id) {
                        dispatch(setRoomId(data.room_id));
                    }
                } else {
                    toast.error("Failed to fetch room id")
                    console.error("Failed to fetch room id:", res.statusText);
                }
            } catch (error) {
                console.error("Error while fetching room id:", error);
            }
        }
    }, [dispatch, roomId])

    useEffect(() => {
        fetch_room_id_code();
    }, [fetch_room_id_code])

    useEffect(() => {
        toggleFullScreen(dispatch);
        const audio = new Audio(soundFile);
        audio.play();
    }, [dispatch]);

    useEffect(() => {
        return () => {
            if (socket?.current) {
                socket?.current.close();
            }
        };
    }, [socket]);

    return (
        <div className="flex flex-col h-screen overflow-auto font-sans text-white bg-background">
            {/* Top Navigation Bar */}
            <header className="flex items-center justify-between px-6 py-2  bg-background/80 border-b border-white/5">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                        <img src={logo} alt="PlayDeck" className="w-8 h-8" />
                    </div>
                    <span className="text-xl font-bold text-foreground">PlayDeck</span>
                </div>

                <div className="flex items-center space-x-6">
                    {/* Compact Session Ticket */}
                    <div className="bg-black border-2 border-blue-600/50 rounded-sm px-3 py-1 flex items-center space-x-6 shadow-[0_0_40px_rgba(37,99,235,0.2)]">
                        <span className="text-green-400 text-[1.2rem]">🎫</span>
                        <span className="font-mono text-[1.2rem] font-bold tracking-widest">{roomId}</span>
                    </div>
                    <button className="p-2 hover:bg-white/10 rounded-full transition-colors"
                        onClick={() => toggleFullScreen(dispatch)}>
                        {!isFullScreen ? <Minimize className="w-6 h-6 text-gray-400" /> : <Maximize className="w-6 h-6 text-gray-400" />}
                    </button>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex flex-1 flex-col md:flex-row h-full">

                {/* Left Section: Hero Visuals */}
                <div className="flex-1 bg-gradient-to-br from-blue-600 to-blue-800 flex flex-col items-center justify-center p-8 space-y-12 relative overflow-hidden h-full">
                    {/* Decorative background glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 blur-[120px] rounded-full" />

                    <div className="relative w-full max-w-lg z-10">
                        {/* Main Game Preview */}
                        <div className="bg-black rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-8 border-gray-900/50">
                            <img
                                src="/path-to-your-game-preview.jpg"
                                alt="Game Preview"
                                className="w-full aspect-video object-cover opacity-90"
                            />
                        </div>

                        {/* Floating Controllers */}
                        <div className="flex justify-between mt-8 px-6">
                            <div className="w-32 bg-gray-900 rounded-xl border-2 border-white/10 p-2 shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                                <div className="bg-cyan-950 h-14 rounded-lg border border-cyan-400/30 flex items-center justify-center">
                                    <span className="text-[10px] font-bold text-cyan-400 tracking-widest uppercase">Creature</span>
                                </div>
                            </div>
                            <div className="w-32 bg-gray-900 rounded-xl border-2 border-white/10 p-2 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                                <div className="bg-lime-950 h-14 rounded-lg border border-lime-400/30 flex items-center justify-center">
                                    <span className="text-[10px] font-bold text-lime-400 tracking-widest uppercase">Lupin</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="text-2xl font-black tracking-tight text-white/90 z-10">
                        PHONES + SCREEN = <span className="text-yellow-400">CONSOLE</span>
                    </p>
                </div>

                {/* Right Section: Connection Steps */}
                <div className="flex-1 bg-background flex flex-col items-center justify-evenly p-12 text-center border-l border-white/5">
                    <h1 className="text-4xl md:text-5xl font-black leading-tight mb-5">
                        Connect your phones <br /> as controllers
                    </h1>

                    <div className="space-y-2 mb-10">
                        <p className="text-gray-400 text-xl">
                            Open <span className="text-white font-bold underline decoration-blue-500 underline-offset-4">playdeck.com</span>
                        </p>
                        <p className="text-gray-400 text-xl">
                            and <span className="text-blue-400 font-bold uppercase tracking-tighter">enter the code</span> below:
                        </p>
                    </div>

                    {/* Giant Code Display */}
                    <div className="bg-black border-2 border-blue-600/50 rounded-xl px-6 py-3 mb-6 flex items-center space-x-6 shadow-[0_0_40px_rgba(37,99,235,0.2)]">
                        <span className="text-2xl">🎫</span>
                        <span className="text-2xl font-black tracking-[0.2em] text-white tabular-nums">
                            {roomId}
                        </span>
                    </div>

                    <div className="w-full flex items-center justify-center space-x-4 mb-8">
                        <div className="h-px bg-white/10 flex-1"></div>
                        <span className="text-gray-500 uppercase tracking-widest text-xs font-bold">Or scan to play</span>
                        <div className="h-px bg-white/10 flex-1"></div>
                    </div>

                    {/* Real QR Code */}
                    <div className="bg-white p-3 rounded-[1rem] shadow-2xl transition-transform hover:scale-105 duration-300">
                        {roomId && <QRCodeSVG
                            value={`https://playdeck-beta.vercel.app/playgames?roomid=${roomId}`}
                            size={160}
                            level={"H"}
                            includeMargin={false}
                        />}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PlayGame;