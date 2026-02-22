import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AppDispatch } from "./store";
import { setIsFullScreen } from "./appState";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toggleFullScreen = (dispatch: AppDispatch) => {
  if (!document.fullscreenEnabled) {
      console.error("Fullscreen is not allowed by your browser or security settings.");
      return;
  }

  if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
          .then(() => {
            dispatch(setIsFullScreen(false));
           })
          .catch((err) => {
              console.error(`Error: ${err.message}`);
          });
      dispatch(setIsFullScreen(false));
  } else {
      document.exitFullscreen();
      dispatch(setIsFullScreen(true));
  }
};