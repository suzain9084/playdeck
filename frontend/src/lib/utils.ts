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

export const getInitials = (name = "") => {
  const parts = name.trim().split(" ");

  if (parts.length === 1) {
    return parts[0][0]?.toUpperCase();
  }

  return (
    (parts[0][0] || "") +
    (parts[1][0] || "")
  ).toUpperCase();
};

export const stringToColor = (str = "") => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = hash % 360;
  return `hsl(${hue}, 60%, 60%)`;
};