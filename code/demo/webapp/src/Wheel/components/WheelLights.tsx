import { useGetWheelSettings } from "@/Configuration/WheelSettings/useGetWheelSettings";
import { useMemo } from "react";
import { LIGHTSINCIRCLE } from "../constants/LIGHTSINCIRCLE";
import { WheelValue } from "../types/WheelValue";

function getAngleForRadianMeasure(radianMeasue: number, radius: number) {
  const circumference = Math.PI * 2 * radius;

  return (radianMeasue / circumference) * 2 * Math.PI;
}

function getPosition(radius: number, angle: number, angleOffset = 0) {
  return {
    x: Math.cos(angle + angleOffset) * radius,
    y: Math.sin(angle + angleOffset) * radius,
  };
}

export function WheelLights(props: {
  showLights: boolean;
  offset: number;
  duration: number;
  playing: boolean;
  bulbWidth: number | null;
  roundDone: boolean;
  lastItem: WheelValue | null;
}) {
  const { radius } = useGetWheelSettings();
  const { offset, duration, playing, bulbWidth, roundDone, lastItem } = props;

  const lights = useMemo(() => {
    const stepsize = (Math.PI * 2) / LIGHTSINCIRCLE;
    return bulbWidth === null
      ? []
      : new Array(LIGHTSINCIRCLE)
          .fill(1)
          .map((item, index) => stepsize * index)
          .map((angle) =>
            getPosition(
              radius,
              angle,
              -getAngleForRadianMeasure(bulbWidth / 2, radius)
            )
          );
  }, [bulbWidth, radius]);

  const lightbulbs = useMemo(
    () =>
      lights.map((point, index) => {
        return (
          <div
            key={`lighte_${index}_${point.x}_${point.y}`}
            id={`wheellighte_${index}_${point.x}_${point.y}`}
            className={!roundDone && lastItem?.win ? "bulb won" : "bulb"}
            style={{
              position: "absolute",
              top: `calc(50vh + ${point.y}px)`,
              left: `calc(50vw + ${point.x}px)`,
              animationDelay: playing
                ? "initial"
                : !roundDone && lastItem?.win
                ? `${(duration / LIGHTSINCIRCLE) * index}s`
                : `${offset * (index % 2)}s`,
              animationDuration: `${duration}s`,
              animationName: "lightonoff",
              animationIterationCount: "infinite",
              animationTimingFunction: "linear",
            }}
          ></div>
        );
      }),
    [duration, lastItem?.win, lights, offset, playing, roundDone]
  );

  return <>{lightbulbs}</>;
}
