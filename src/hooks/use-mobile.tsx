import { AppDispatch, RootState } from "@/lib/store";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsMobile } from "@/lib/appState";
const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const dispatch = useDispatch<AppDispatch>();
  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
        dispatch(setIsMobile(window.innerWidth < MOBILE_BREAKPOINT));
    };
    mql.addEventListener("change", onChange);
    dispatch(setIsMobile(window.innerWidth < MOBILE_BREAKPOINT));
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return useSelector((state: RootState) => state.appState.isMobile) as boolean;
}
