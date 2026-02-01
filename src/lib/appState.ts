import { createSlice } from '@reduxjs/toolkit'


export const AppStateSlice = createSlice({
  name: 'appState',
  initialState: {
    isFullScreen: false,
    isMobile: false,
  },
  reducers: {
    setIsFullScreen: (state, action) => {
      state.isFullScreen = action.payload
    },
    setIsMobile: (state, action) => {
      state.isMobile = action.payload
    },
  },
})

export const { setIsFullScreen, setIsMobile } = AppStateSlice.actions

export default AppStateSlice.reducer