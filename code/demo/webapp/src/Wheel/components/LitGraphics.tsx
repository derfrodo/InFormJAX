/* eslint-disable @next/next/no-img-element */
import { useMemo } from "react";
import GraphicxStyle from "../assets/Bild2.png";
import { GRAPHICXASPECT } from "../App";


export function LitGraphics(
  props: {
    showLights: boolean;
    offset: number;
    duration: number;
    playing: boolean;
  }
) {
  const {
    showLights, offset, duration, playing,
  } = props;

  const extraLights = useMemo(() => {
    return [
      { x: 6, y: 26 },
      { x: 7.5, y: 22 },
      { x: 9, y: 18 },
      { x: 10.5, y: 14 },
      { x: 12, y: 10 },
      { x: 13.5, y: 6 },
      { x: 15, y: 2 },
      { x: 20, y: 2.75 },
      { x: 24.5, y: 3.5 },
    ];
  }, []);

  return (<>

    <img
      src={GraphicxStyle.src}
      alt="Logo"
      style={{
        position: "absolute",
        background: "transparent",
        width: "26vw",
        right: `0vw`,
        top: `0vh`,
      }}
    ></img>
    {showLights ?
      extraLights.map((point, index) => {
        return (
          <div
            className="bulb"
            key={`lighte_${index}_${point.x}_${point.y}`}
            style={{
              position: "absolute",
              right: `calc(26vw - ${point.x}%)`,
              top: `calc(26vw / ${GRAPHICXASPECT} - ${point.y}vw / ${GRAPHICXASPECT})`,
              animationDelay: playing
                ? "initial"
                : `${offset * (index % 2)}s`,
              animationDuration: `${duration}s`,
              animationName: "lightonoff",
              animationIterationCount: "infinite",
              animationTimingFunction: "linear",
            }}
          ></div>
        );
      }) :
      <></>}
  </>);
}
