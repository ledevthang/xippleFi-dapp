import { BREAKPOINTS } from "@/constants";
import { Breakpoints } from "@/types";
import { useEffect, useState } from "react";

const useBreakpoint = () => {
  const [breakpoint, setBreakPoint] = useState<Breakpoints>();
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    if (0 < windowSize.width && windowSize.width < 640) {
      setBreakPoint(BREAKPOINTS[0]);
    }
    if (640 < windowSize.width && windowSize.width < 768) {
      setBreakPoint(BREAKPOINTS[640]);
    }
    if (768 < windowSize.width && windowSize.width < 1280) {
      setBreakPoint(BREAKPOINTS[768]);
    }
    if (1280 < windowSize.width && windowSize.width < 1536) {
      setBreakPoint(BREAKPOINTS[1280]);
    }
    if (windowSize.width >= 1536) {
      setBreakPoint(BREAKPOINTS[1536]);
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [windowSize.width]);

  return breakpoint;
};

export default useBreakpoint;
