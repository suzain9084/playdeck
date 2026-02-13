import { createSlice } from '@reduxjs/toolkit'
import { stat } from 'fs'


export const AppStateSlice = createSlice({
  name: 'appState',
  initialState: {
    isFullScreen: false,
    isMobile: false,
    roomId: "",
    socketId: "",
    name: "",
  },
  reducers: {
    setIsFullScreen: (state, action) => {
      state.isFullScreen = action.payload
    },
    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
    },
    setRoomId: (state, action) => {
      state.roomId = action.payload;
    },
    setScoketId: (state, action) => {
      state.socketId = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    }
  },
})

export const { setIsFullScreen, setIsMobile, setRoomId, setScoketId, setName } = AppStateSlice.actions

export default AppStateSlice.reducer