import { useEffect, useRef } from "react";
import { strokeStar } from "../utils/strokeStar";
import { useDevicePixelRatio } from "../utils/getDevicePixelRatio";
import { useGetWheelSettings } from "../../config/WheelSettings/useGetWheelSettings";


export function InnerWheel(props: { playing: boolean; }) {
  const { playing } = props;
  const { radius, rotationDurationPlaying } = useGetWheelSettings();
  const devicePixelRatio = useDevicePixelRatio();
  const canvas2 = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const current = canvas2.current;
    if (current) {
      current.setAttribute("height", `${(devicePixelRatio * radius) / 2}px`);
      current.setAttribute("width", `${(devicePixelRatio * radius) / 2}px`);
    }
  }, [devicePixelRatio, radius]);
  useEffect(() => {
    const current = canvas2.current;
    if (current) {
      const context = current.getContext("2d");
      if (context) {
        strokeStar(
          context,
          (devicePixelRatio * radius) / 4,
          (devicePixelRatio * radius) / 4,
          (devicePixelRatio * radius) / 8,
          12,
          1.8
        );
      }
    }
  }, [devicePixelRatio, radius]);
  return (
    <>
      {/* Canvas inner Wheel */}
      <canvas
        style={{
          position: "absolute",
          height: radius / 2,
          width: radius / 2,
          left: `calc(50% - ${radius / 4}px - 0px)`,
          top: `calc(50% - ${radius / 4}px - 0px)`,
          animationDuration: !playing ? "10s" : `${rotationDurationPlaying}ms`,
          animationName: "WheelSpin",
          animationIterationCount: "infinite",
          animationDirection: "reverse",
          animationTimingFunction: "linear",
        }}
        height={`${(devicePixelRatio * radius) / 2}px`}
        width={`${(devicePixelRatio * radius) / 2}px`}
        ref={canvas2}
      ></canvas>
    </>
  );
}
