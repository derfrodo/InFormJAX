import { useMemo } from "react";
import Logo from "../../../assets_generated/logo.jpg";


export function LitLogo(
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


  const logoLights = useMemo(() => {
    const min = 0;
    const max = 16;
    const steps = 4;
    const interval = (max - min) / steps;
    return [
      { x: min, y: 0 },
      { x: min, y: 4 },
      { x: min, y: 8 },
      { x: min, y: 12 },
      { x: min, y: 16 },

      { x: min + interval * 1, y: 16 },
      { x: min + interval * 2, y: 16 },
      { x: min + interval * 3, y: 16 },

      { x: max, y: 16 },
      { x: max, y: 12 },
      { x: max, y: 8 },
      { x: max, y: 4 },
      { x: max, y: 0 },
    ];
  }, []);

  return (
    <>
      <img
        src={Logo}
        alt="Logo"
        style={{
          position: "absolute",
          background: "transparent",
          width: "16rem",
          height: "16rem",
          left: `2vw`,
          top: `0`,
        }}
      ></img>
      {showLights ?
        logoLights.map((point, index) => {
          return (
            <div
              className="bulb"
              key={`lightlogo_${index}`}
              style={{
                position: "absolute",
                left: `calc(2vw + ${point.x}rem)`,
                top: `${point.y}rem`,
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

    </>
  );

}
