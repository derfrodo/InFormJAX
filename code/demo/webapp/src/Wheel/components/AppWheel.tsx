import { useEffect, useRef } from "react";
import { WheelValue } from "../types/WheelValue";
import { anglePart } from "../constants/anglePart";
import { drawPieSections } from "../utils/drawPieSections";
import { useDevicePixelRatio } from "../utils/getDevicePixelRatio";
import { MATERNA_RED2 } from "../App";
import { useGetWheelSettings } from "@/Configuration/WheelSettings/useGetWheelSettings";

export function AppWheel(props: {
  onClick: any;
  playing: boolean;
  lastWin: number;
  values: WheelValue[];
}) {
  const { radius, rotationDurationPlaying } = useGetWheelSettings();
  const devicePixelRatio = useDevicePixelRatio();
  const { onClick, playing, values, lastWin } = props;

  const canvas = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const current = canvas.current;
    if (current) {
      current.setAttribute("height", `${devicePixelRatio * radius * 2}px`);
      current.setAttribute("width", `${devicePixelRatio * radius * 2}px`);
    }
  }, [devicePixelRatio, radius]);

  useEffect(() => {
    const current = canvas.current;
    if (current) {
      const context = current.getContext("2d");
      if (context) {
        drawPieSections(context, current, values, devicePixelRatio, radius);
      }
    }
  }, [devicePixelRatio, radius, values]);

  return (
    <>
      {/* Wheel */}
      <div
        style={{
          position: "absolute",
          height: radius * 2,
          width: radius * 2,
          borderRadius: radius,
          background: MATERNA_RED2,
          left: `calc(50% - ${radius}px)`,
          top: `calc(50% - ${radius}px)`,
        }}
      ></div>

      {/* Wheel */}
      <canvas
        key={devicePixelRatio}
        style={{
          position: "absolute",
          height: radius * 2,
          width: radius * 2,
          borderRadius: radius,
          // background: "pink",
          left: `calc(50% - ${radius}px)`,
          top: `calc(50% - ${radius}px)`,
          animationDuration: playing
            ? `${rotationDurationPlaying}ms`
            : undefined,
          animationName: "WheelSpin",
          animationIterationCount: "infinite",
          animationTimingFunction: "linear",
          rotate: `${-(lastWin * anglePart) - Math.PI / 2}rad`,
        }}
        height={`${devicePixelRatio * radius * 2}px`}
        width={`${devicePixelRatio * radius * 2}px`}
        ref={canvas}
        onClick={onClick}
      ></canvas>
    </>
  );
}
