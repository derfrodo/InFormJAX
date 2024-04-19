import { MouseEventHandler, useEffect, useMemo, useRef, useState } from "react";
import { anglePart } from "../../config/constants/anglePart";
import { drawPieSections } from "../utils/drawPieSections";
import { useDevicePixelRatio } from "../utils/getDevicePixelRatio";
import { MATERNA_RED2 } from "../App";
import { useQuery } from "@apollo/client";
import { WheelValue } from "service/src/api/data/types/WheelValue.mts";
import { useGetWheelSettings } from "../../config/WheelSettings/useGetWheelSettings";
import { queryDisplaysettings } from "../../config/mutations/queryDisplaysetting";

export function AppWheel(props: {
  onClick: MouseEventHandler<HTMLCanvasElement> | undefined;
  playing: boolean;
  lastValue: WheelValue & { id: number | string } | null;
  values: (WheelValue & { id: number | string })[];
}) {
  const { data } = useQuery(queryDisplaysettings);
  const { radius, rotationDurationPlaying, rotationDurationNotPlaying } =
    useGetWheelSettings();
  const devicePixelRatio = useDevicePixelRatio();
  const { onClick, playing, values, lastValue } = props;
  const lastWinIndex = useMemo(() =>
    lastValue !== null ? values.findIndex(v => v.id === lastValue?.id) ?? 0 : 0, [lastValue, values])
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
          rotate: `${-(lastWinIndex * anglePart) - Math.PI / 2}rad`,
        }}
        height={`${devicePixelRatio * radius * 2}px`}
        width={`${devicePixelRatio * radius * 2}px`}
        ref={canvas}
        onClick={onClick}
      ></canvas>
    </>
  );
}
