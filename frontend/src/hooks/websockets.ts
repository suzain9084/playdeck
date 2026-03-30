import {
  Player,
  addPlayer,
  removePlayer,
  setConnectionStatus,
  setGamePhase,
  setName,
  setPlayers,
  setPlayingGame,
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
import { gameInfo, rowLengths } from "@/constant/gameListArray";
import { isProduction } from "@/lib/utils";

export const useWebSocket = (roomId, name) => {
  const wsRef = useRef(null);
  const dispatch = useDispatch();
  const playerCount = useSelector(
    (state: RootState) => state.appState.players,
  ).length;
  const selectedRow = useSelector(
    (state: RootState) => state.appState.selectedRow,
  );
  const selectedCol = useSelector(
    (state: RootState) => state.appState.selectedCol,
  );
  const playingGame = useSelector(
    (state: RootState) => state.appState.playingGame,
  );
  const gamePhase = useSelector((state: RootState) => state.appState.gamePhase);
  const navigate = useNavigate();
  const playerCountRef = useRef(playerCount);
  const selectedRowRef = useRef(selectedRow);
  const selectedColRef = useRef(selectedCol);
  const gamePhaseRef = useRef(gamePhase);
  const playingGameRef = useRef(playingGame);

  useEffect(() => {
    playerCountRef.current = playerCount;
    selectedRowRef.current = selectedRow;
    selectedColRef.current = selectedCol;
    gamePhaseRef.current = gamePhase;
    playingGameRef.current = playingGame;
  }, [playerCount, selectedRow, selectedCol, gamePhase, playingGame]);

  const handleMessage = useCallback(
    (event) => {
      const data = JSON.parse(event.data);
      if (data.event === "connect") {
        if (data.name === "screen") {
          dispatch(setName(event.name));
          dispatch(setSocketId(event.socket_id));
          dispatch(setScreenId(event.socket_id));
          dispatch(setRole("screen"));
          dispatch(setGamePhase("starting"));
          dispatch(setGamePhase("lobby"));
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
          dispatch(setGamePhase("ended"));
          navigate("/");
        }
      } else if (data.event === "room_state") {
        toast.message("Connected to the Screen. Let's play");
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
      } else {
        const phase = gamePhaseRef.current;
        if (phase === "lobby") {
          handleKeyDown(
            data,
            dispatch,
            selectedRowRef.current,
            selectedColRef.current,
          );
        } else if (phase === "playing") {
          console.log(data);
          const gameEvent = new CustomEvent(`${playingGameRef.current.toLowerCase().replace(" ", "-")}/action`, {detail: data});
          window.dispatchEvent(gameEvent);
        }
      }
    },
    [dispatch, name, navigate],
  );

  const handleConnectionOpen = useCallback(
    (data) => {
      dispatch(setConnectionStatus("connected"));
    },
    [dispatch],
  );

  const handleOnclose = useCallback(
    (data) => {
      if (data.code === 1008) {
        toast.message(data.reason || "Code does not exist for screen");
        navigate("/");
      } else if (data.code === 1006) {
        toast.message("Connection failed");
        navigate("/");
      }
    },
    [navigate],
  );

  useEffect(() => {
    if (!roomId || !name) return;
    let ws: WebSocket;
    try {
      const connectionURL = `${isProduction() ? "wss://playdeck-1.onrender.com" : "ws://localhost:8000"}/ws/${roomId}/${name}`;
      ws = new WebSocket(connectionURL);
      wsRef.current = ws;
      ws.onopen = (data) => handleConnectionOpen(data);
      ws.onclose = (data) => handleOnclose(data);
      ws.onmessage = (event) => handleMessage(event);
      ws.onerror = (err) => console.error(err);
    } catch (error) {
      toast.error("Failed to connect to server");
    }

    return () => {
      ws.close();
    };
  }, [
    roomId,
    handleMessage,
    name,
    handleConnectionOpen,
    handleOnclose,
    dispatch,
  ]);

  return wsRef;
};

export const handleKeyDown = (action, dispatch, selectedRow, selectedCol) => {
  let newRow = selectedRow;
  let newCol = selectedCol;

  if (action?.action === "select") {
    dispatch(setGamePhase("playing"));
    dispatch(setPlayingGame(gameInfo[newRow][newCol].title));
    return;
  } else if (action?.action === "down") {
    newRow = Math.min(selectedRow + 1, 3);
  } else if (action?.action === "up") {
    newRow = Math.max(selectedRow - 1, 0);
  } else if (action?.action === "right") {
    newCol = (selectedCol + 1) % rowLengths[newRow];
  } else if (action?.action === "left") {
    newCol = Math.max(selectedCol - 1, 0);
  }
  newCol = Math.min(newCol, rowLengths[newRow] - 1);
  dispatch(setSelectedRow(newRow));
  dispatch(setSelectedCol(newCol));
};
