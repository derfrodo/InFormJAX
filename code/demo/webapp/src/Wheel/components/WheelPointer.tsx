import { useEffect, useRef } from "react";
import { RADIUS } from "../constants/RADIUS";
import { SPIN_DURATION } from "../constants/SPIN_DURATION";
import { useDevicePixelRatio } from "../utils/getDevicePixelRatio";
import { MATERNA_RED, MATERNA_GREY } from "../App";


export function WheelPointer(props: { playing: boolean; }) {
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
        const lineWidth = 6;
        context.strokeStyle = MATERNA_RED;
        context.lineWidth = lineWidth;
        context.fillStyle = MATERNA_GREY;
        context.moveTo(lineWidth, lineWidth);
        context.beginPath();
        context.lineTo(lineWidth, lineWidth);
        context.lineTo(current.width - lineWidth, lineWidth);
        context.lineTo(
          (current.width - lineWidth) / 2,
          current.height - lineWidth
        );
        context.closePath();
        context.fill();
        context.stroke();

        // context.fillRect(0, 0, 1000000, 1000000);
      }
    }
  }, [devicePixelRatio]);
  return (
    <>
      {/* Canvas inner Wheel */}
      <canvas
        style={{
          position: "absolute",
          width: "3rem",
          height: "5rem",
          left: `0`,
          top: `0`,
          transformOrigin: "1.5rem center",
          animationDuration: playing ? `${SPIN_DURATION / 4}ms` : undefined,
          animationName: "WheelSpin2",
          animationIterationCount: "infinite",
          animationTimingFunction: "linear",
        }}
        height={`5rem`}
        width={`3rem`}
        ref={canvas2}
      ></canvas>
    </>
  );
}
