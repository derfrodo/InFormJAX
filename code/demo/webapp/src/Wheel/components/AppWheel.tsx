import { useEffect, useRef, useState } from "react";
import { WheelValue } from "../../api/data/types/WheelValue";
import { anglePart } from "../constants/anglePart";
import { drawPieSections } from "../utils/drawPieSections";
import { useDevicePixelRatio } from "../utils/getDevicePixelRatio";
import { MATERNA_RED2 } from "../App";
import { useGetWheelSettings } from "@/Configuration/WheelSettings/useGetWheelSettings";
import { useQuery } from "@apollo/client";
import { queryDisplaysettings } from "@/Configuration/mutations/queryDisplaysetting";

export function AppWheel(props: {
  onClick: any;
  playing: boolean;
  lastWin: number;
  values: WheelValue[];
}) {
  const { data } = useQuery(queryDisplaysettings);
  const { radius, rotationDurationPlaying, rotationDurationNotPlaying } =
    useGetWheelSettings();
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

  const [playback, setPlayback] = useState(true);

  useEffect(() => {
    const delayInMs =
      2 * (data?.displaySettings?.showResultForMS ?? 0) +
      (data?.displaySettings?.showResultAfterMS ?? 0);
    if (playing && playback) {
      setPlayback(false);
    } else if (!playing && !playback) {
      setTimeout(() => setPlayback(true), delayInMs);
    }
  }, [
    data?.displaySettings?.showResultAfterMS,
    data?.displaySettings?.showResultForMS,
    playback,
    playing,
  ]);

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
            : playback
            ? `${rotationDurationNotPlaying}ms`
            : undefined,
          animationName: "WheelSpin",
          animationIterationCount: "infinite",
          animationTimingFunction: "linear",
          animationDirection: playing ? "normal" : "reverse",
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
