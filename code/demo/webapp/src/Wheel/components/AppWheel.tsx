import { useEffect, useRef } from "react";
import { RADIUS } from "../constants/RADIUS";
import { SPIN_DURATION } from "../constants/SPIN_DURATION";
import { WheelValue } from "../types/WheelValue";
import { anglePart } from "../constants/anglePart";
import { drawPieSections } from "../utils/drawPieSections";
import { useDevicePixelRatio } from "../utils/getDevicePixelRatio";
import { MATERNA_RED2 } from "../App";


export function AppWheel(props: {
  onClick: any;
  playing: boolean;
  lastWin: number;
  values: WheelValue[];
}) {
  const devicePixelRatio = useDevicePixelRatio();
  const { onClick, playing, values, lastWin } = props;

  const canvas = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const current = canvas.current;
    if (current) {
      current.setAttribute("height", `${devicePixelRatio * RADIUS * 2}px`);
      current.setAttribute("width", `${devicePixelRatio * RADIUS * 2}px`);
    }
  }, [devicePixelRatio]);

  useEffect(() => {
    const current = canvas.current;
    if (current) {
      const context = current.getContext("2d");
      if (context) {
        drawPieSections(context, current, values, devicePixelRatio);
      }
    }
  }, [devicePixelRatio, values]);

  return (
    <>
      {/* Wheel */}
      <div
        style={{
          position: "absolute",
          height: RADIUS * 2,
          width: RADIUS * 2,
          borderRadius: RADIUS,
          background: MATERNA_RED2,
          left: `calc(50% - ${RADIUS}px)`,
          top: `calc(50% - ${RADIUS}px)`,
        }}
      ></div>

      {/* Wheel */}
      <canvas
        key={devicePixelRatio}
        style={{
          position: "absolute",
          height: RADIUS * 2,
          width: RADIUS * 2,
          borderRadius: RADIUS,
          // background: "pink",
          left: `calc(50% - ${RADIUS}px)`,
          top: `calc(50% - ${RADIUS}px)`,
          animationDuration: playing ? `${SPIN_DURATION}ms` : undefined,
          animationName: "WheelSpin",
          animationIterationCount: "infinite",
          animationTimingFunction: "linear",
          rotate: `${-(lastWin * anglePart) - Math.PI / 2}rad`,
        }}
        height={`${devicePixelRatio * RADIUS * 2}px`}
        width={`${devicePixelRatio * RADIUS * 2}px`}
        ref={canvas}
        onClick={onClick}
      ></canvas>
    </>
  );
}
