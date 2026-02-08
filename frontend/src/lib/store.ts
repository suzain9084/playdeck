import { configureStore } from '@reduxjs/toolkit'
import AppStateReducer from './appState'

export const store = configureStore({
  reducer: {
    appState: AppStateReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store