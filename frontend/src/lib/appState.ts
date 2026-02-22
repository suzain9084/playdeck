import { createSlice } from '@reduxjs/toolkit'

export type DeviceRole = "screen" | "controller";

export type ConnectionStatus =
  | "disconnected"
  | "connecting"
  | "connected";

export type GamePhase =
  | "idle"
  | "lobby"
  | "starting"
  | "playing"
  | "ended";

export interface Player {
  name: string;
  socketId: string;
  isHost: boolean;
  deviceType: "mobile" | "desktop";
  connected: boolean;
}

export interface AppStateType {
  role: DeviceRole;
  isMobile: boolean;
  isFullScreen: boolean;
  socketId: string;
  screenId: string;
  connectionStatus: ConnectionStatus;
  roomId: string;
  name: string;
  players: Player[];
  gamePhase: GamePhase;
}

export const AppStateSlice = createSlice({
  name: 'appState',
  initialState: {
    role: "controller",
    isMobile: false,
    isFullScreen: false,
    socketId: "",
    connectionStatus: "disconnected",
    roomId: "",
    name: "",
    players: [],
    gamePhase: "idle"
  } as AppStateType,
  reducers: {
    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
    },

    setRole: (state, action) => {
      state.role = action.payload;
    },
    
    setIsFullScreen: (state, action) => {
      state.isFullScreen = action.payload;
    },

    setConnectionStatus: (state, action) => {
      state.connectionStatus = action.payload;
    },
  
    setSocketId: (state, action) => {
      state.socketId = action.payload;
    },
  
    setRoomId: (state, action) => {
      state.roomId = action.payload;
    },
  
    setName: (state, action) => {
      state.name = action.payload;
    },
  
    setGamePhase: (state, action) => {
      state.gamePhase = action.payload;
    },
  
    setPlayers: (state, action) => {
      state.players = action.payload;
    },
  
    addPlayer: (state, action) => {
      state.players.push(action.payload);
    },
  
    removePlayer: (state, action) => {
      state.players = state.players.filter(
        p => p.socketId !== action.payload
      );
    },

    setScreenId: (state, action) => {
      state.screenId = action.payload;
    },
  }
})

export const {setIsMobile, setRole, setConnectionStatus, setIsFullScreen, setSocketId, setRoomId, setName, setGamePhase, setPlayers, addPlayer, removePlayer, setScreenId} = AppStateSlice.actions
export default AppStateSlice.reducer