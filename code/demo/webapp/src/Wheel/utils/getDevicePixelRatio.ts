import { useDebugValue, useMemo } from "react";

export function getDevicePixelRatio() {
  if (typeof window !== "undefined") {
    return window.devicePixelRatio;
  }
  return 1;
}

export function getHasWindow() {
  return typeof window !== "undefined";
}
export function useHasWindow() {
  return getHasWindow();
}

export function useDevicePixelRatio() {
  const hasWindow = useHasWindow();
  const devicePixelRatio = useMemo(() => {
    return hasWindow ? window.devicePixelRatio : 1;
  }, [hasWindow]);

  useDebugValue({ devicePixelRatio });
  return devicePixelRatio;
}
