import { Player, addPlayer, setConnectionStatus, setGamePhase, setName, setPlayers, setRole, setScreenId, setSocketId } from "@/lib/appState";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export const useWebSocket = (roomId, name) => {
    const wsRef = useRef(null);
    const dispatch = useDispatch(); 

    const handleMessage = useCallback((event) => {
        const data = JSON.parse(event.data);
        if (data.event === "connect") {
            if (data.name === "screen") {
                console.log(data);
                dispatch(setName(event.name));
                dispatch(setSocketId(event.socket_id));
                dispatch(setScreenId(event.socket_id));
                dispatch(setRole("screen"));
                dispatch(setConnectionStatus("connected"))
                dispatch(setGamePhase("starting"));
            } else if (event.name !== name) {
                console.log(data);
                dispatch(addPlayer({
                    name: event.name,
                    socketId: event.socket_id,
                    deviceType: "mobile",
                    connected: true,
                    isHost: event.socket_id === event.host_socket_id,
                }));
            } else {
                console.log(data);
                dispatch(setConnectionStatus("connected"));
                dispatch(setGamePhase("lobby"));
                const players: Player[] = [];
                for (const player of event.members) {
                    if (player.name === "screen") {
                        dispatch(setScreenId(player.socket_id));
                        continue;
                    }
                    players.push({
                        name: player.name,
                        socketId: player.socket_id,
                        deviceType: "mobile",
                        connected: true,
                        isHost: player.socket_id === event.host_socket_id,
                    });
                }
                dispatch(setPlayers(players));
            }
        }
    }, [dispatch, name])

    useEffect(() => {
        if (!roomId) return;
        let ws: WebSocket
        try {
            ws = new WebSocket(`ws://localhost:8000/ws/${roomId}/${name}`);
            wsRef.current = ws;
            ws.onopen = (data) => console.log("connected");
            ws.onclose = (data) => console.log("Disconnected: ", data);
            ws.onmessage = (event) => handleMessage(event);
            ws.onerror = (err) => console.error(err);
        } catch (error) {
            toast.error("Failed to connect to server");
        }

        return () => {
            ws.close();
        };
    }, [roomId, handleMessage, name]);

    return wsRef;
};
