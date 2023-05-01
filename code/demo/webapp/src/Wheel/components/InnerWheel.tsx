import { useEffect, useRef } from "react";
import { RADIUS } from "../constants/RADIUS";
import { SPIN_INNER_DURATION } from "../constants/SPIN_INNER_DURATION";
import { useDevicePixelRatio } from "../utils/getDevicePixelRatio";
import { strokeStar } from "../App";


export function InnerWheel(props: { playing: boolean; }) {
  const { playing } = props;
  const devicePixelRatio = useDevicePixelRatio();
  const canvas2 = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const current = canvas2.current;
    if (current) {
      current.setAttribute("height", `${(devicePixelRatio * RADIUS) / 2}px`);
      current.setAttribute("width", `${(devicePixelRatio * RADIUS) / 2}px`);
    }
  }, [devicePixelRatio]);
  useEffect(() => {
    const current = canvas2.current;
    if (current) {
      const context = current.getContext("2d");
      if (context) {
        strokeStar(
          context,
          (devicePixelRatio * RADIUS) / 4,
          (devicePixelRatio * RADIUS) / 4,
          (devicePixelRatio * RADIUS) / 8,
          12,
          1.8
        );
      }
    }
  }, [devicePixelRatio]);
  return (
    <>
      {/* Canvas inner Wheel */}
      <canvas
        style={{
          position: "absolute",
          height: RADIUS / 2,
          width: RADIUS / 2,
          left: `calc(50% - ${RADIUS / 4}px - 0px)`,
          top: `calc(50% - ${RADIUS / 4}px - 0px)`,
          animationDuration: !playing ? "10s" : `${SPIN_INNER_DURATION}ms`,
          animationName: "WheelSpin",
          animationIterationCount: "infinite",
          animationDirection: "reverse",
          animationTimingFunction: "linear",
        }}
        height={`${(devicePixelRatio * RADIUS) / 2}px`}
        width={`${(devicePixelRatio * RADIUS) / 2}px`}
        ref={canvas2}
      ></canvas>
    </>
  );
}
