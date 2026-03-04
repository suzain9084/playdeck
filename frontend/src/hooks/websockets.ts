import {
  Player,
  addPlayer,
  removePlayer,
  setConnectionStatus,
  setGamePhase,
  setName,
  setPlayers,
  setRole,
  setScreenId,
  setSelectedCol,
  setSelectedRow,
  setSocketId,
} from "@/lib/appState";
import { RootState } from "@/lib/store";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { rowLengths } from "@/constant/gameListArray";
import { isProduction } from "@/lib/utils";

export const useWebSocket = (roomId, name) => {
  const wsRef = useRef(null);
  const dispatch = useDispatch();
  const playerCount = useSelector(
    (state: RootState) => state.appState.players,
  ).length;
  const selectedRow = useSelector((state: RootState) => state.appState.selectedRow);
  const selectedCol = useSelector((state: RootState) => state.appState.selectedCol);
  const navigate = useNavigate();
  const playerCountRef = useRef(playerCount);
  const selectedRowRef = useRef(selectedRow);
  const selectedColRef = useRef(selectedCol);
  const appState = useSelector((state: RootState) => state.appState);

  useEffect(() => {
    playerCountRef.current = playerCount;
    selectedRowRef.current = selectedRow;
    selectedColRef .current = selectedCol;
  }, [playerCount, selectedRow, selectedCol, appState]);

  const handleMessage = useCallback(
    (event) => {
      const data = JSON.parse(event.data);
      if (data.event === "connect") {
        if (data.name === "screen") {
          dispatch(setName(event.name));
          dispatch(setSocketId(event.socket_id));
          dispatch(setScreenId(event.socket_id));
          dispatch(setRole("screen"));
          dispatch(setConnectionStatus("connected"));
          dispatch(setGamePhase("starting"));
          toast.message("Screen Connect with Server.");
        } else if (event.name !== name) {
          dispatch(
            addPlayer({
              name: data.name,
              socketId: data.socket_id,
              deviceType: "mobile",
              connected: true,
              isHost: data.socket_id === data.host_socket_id,
            }),
          );
          toast.message(`${data.name} is connected with Screen`);
        }
      } else if (data.event === "disconnect") {
        dispatch(removePlayer(data.socket_id));
        if (playerCountRef.current == 0) {
          navigate("/");
        }
      } else if (data.event === "room_state") {
        dispatch(setConnectionStatus("connected"));
        dispatch(setGamePhase("lobby"));
        const players: Player[] = [];
        for (const player of data.members) {
          if (player.name === "screen") {
            dispatch(setScreenId(player.socket_id));
            continue;
          }
          players.push({
            name: player.name,
            socketId: player.socket_id,
            deviceType: "mobile",
            connected: true,
            isHost: player.socket_id === data.host_socket_id,
          } as Player);
        }
        dispatch(setSocketId(data.host_socket_id));
        dispatch(setPlayers(players));
      } else if (data.event === "button_press") {
        handleKeyDown(data.action, dispatch, selectedRowRef.current, selectedColRef.current);
      }
    },
    [dispatch, name, navigate],
  );

  useEffect(() => {
    if (!roomId || !name) return;
    let ws: WebSocket;
    try {
      const connectionURL = `${isProduction() ? "wss://playdeck-1.onrender.com" : "ws://localhost:8000"}/ws/${roomId}/${name}`
      ws = new WebSocket(connectionURL);
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

export const handleKeyDown = (
    direction,
    dispatch,
    selectedRow,
    selectedCol
) => {
    let newRow = selectedRow;
    let newCol = selectedCol;

    if (direction === "down") {
        newRow = Math.min(selectedRow + 1, 3);
    }

    if (direction === "up") {
        newRow = Math.max(selectedRow - 1, 0);
    }

    if (direction === "right") {
        newCol = (selectedCol + 1) % rowLengths[newRow];
    }

    if (direction === "left") {
        newCol = Math.max(selectedCol - 1, 0);
    }
    newCol = Math.min(newCol, rowLengths[newRow] - 1);
    dispatch(setSelectedRow(newRow));
    dispatch(setSelectedCol(newCol));
};