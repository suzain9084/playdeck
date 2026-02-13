import { useEffect, useRef } from "react";
import { toast } from "sonner";

export const useWebSocket = (roomId) => {
    const wsRef = useRef(null);

    useEffect(() => {
        if (!roomId) return;
        let ws: WebSocket
        try {
            ws = new WebSocket(`ws://localhost:8000/ws/${roomId}/screen`);
            wsRef.current = ws;    
            ws.onopen = (data) => console.log("Connected: ", data);
            ws.onclose = () => console.log("Disconnected");
            ws.onerror = (err) => console.error(err);
        } catch (error) {
            toast.error("Failed to connect to server");
        }

        return () => {
            ws.close();
        };
    }, [roomId]);

    return wsRef;
};
