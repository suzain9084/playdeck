import * as React from "react";

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  React.useEffect(() => {
    const userAgent = window.navigator.userAgent;
    const isAndroidPhone = /Android/i.test(userAgent) && /Mobi/i.test(userAgent);
    const isIPhone = /iPhone/i.test(userAgent) && !/iPad/i.test(userAgent);
    const isOtherPhone = /Windows Phone|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    setIsMobile(isAndroidPhone || isIPhone || isOtherPhone);
  }, []);

  return isMobile;
}
