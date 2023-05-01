/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useMemo, useState } from "react";

import Digitalization from "./assets/Bild3.png";

import { Winning } from "./components/Winning";
import { LIGHTSINCIRCLE } from "./constants/LIGHTSINCIRCLE";
import { RADIUS } from "./constants/RADIUS";
import { WheelValue } from "./types/WheelValue";
import { CHECK_CHANCE, WIN_CHANCE } from "./constants/WIN_CHANCE";
import { useDevicePixelRatio } from "./utils/getDevicePixelRatio";
import { LitGraphics } from "./components/LitGraphics";
import { LitLogo } from "./components/LitLogo";
import { WheelPointer } from "./components/WheelPointer";
import { InnerWheel } from "./components/InnerWheel";
import { AppWheel } from "./components/AppWheel";

// const wofAudio = new Audio(wofSound);

const GRAPHICXWIDTH = 563;
const GRAPHICXHEIGHT = 764;
export const GRAPHICXASPECT = GRAPHICXWIDTH / GRAPHICXHEIGHT;

export const MATERNA_GREY = "#334357";
const MATERNA_GREY2 = "#44546A";

export const MATERNA_RED = "rgb(196,26,23)";
export const MATERNA_RED2 = "#c30a17";

// kindly have a look at: https://stackoverflow.com/questions/25837158/how-to-draw-a-star-by-using-canvas-html5#25840319
export function strokeStar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  n: number,
  inset: number,
  color = MATERNA_RED
) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.translate(x, y);
  ctx.moveTo(0, 0 - r);
  for (var i = 0; i < n; i++) {
    ctx.rotate(Math.PI / n);
    ctx.lineTo(0, 0 - r * inset);
    ctx.rotate(Math.PI / n);
    ctx.lineTo(0, 0 - r);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function isWinner(winChance: number) {
  if (winChance > 1) {
    console.error("Chance of winning must be between 0 and 1");
  }
  const randomResult = Math.random();

  return randomResult < winChance;
}

function App(props: { values: WheelValue[] }) {
  const [lastWin, setLastWin] = useState(0);
  const [roundDone, setRoundDone] = useState(true);
  const [playing, setPlaying] = useState(false);

  const devicePixelRatio = useDevicePixelRatio();

  const { values } = props;

  const calculateWinner = useCallback(() => {
    const winner = isWinner(WIN_CHANCE);

    if (CHECK_CHANCE) {
      let won = 0;
      let lost = 0;
      for (let i = 0; i < 1000000; i++) {
        if (isWinner(WIN_CHANCE)) {
          won++;
        } else {
          lost++;
        }
      }
      console.log("Checked chance", {
        won,
        lost,
        all: won + lost,
        WIN_CHANCE,
        actual: won / (won + lost),
      });
    }

    if (winner) {
      //WON!
      const winOptions = values.filter((value) => value.win);
      const winOffset =
        winOptions[Math.floor(Math.random() * winOptions.length)];
      const winIndex = values.indexOf(winOffset);
      console.log({ winOffset, winIndex });
      setLastWin(winIndex);
      setRoundDone(false);
    } else {
      // LOST!
      const lostOptions = values.filter((value) => !value.win);
      const lostOffset =
        lostOptions[Math.floor(Math.random() * lostOptions.length)];
      const lostIndex = values.indexOf(lostOffset);
      console.log({ lostOffset, lostIndex });
      setLastWin(lostIndex);
      setRoundDone(false);
    }
  }, [values]);

  const updatePlaying = useCallback(() => {
    setPlaying((p) => {
      return !p;
    });
  }, []);

  const gcs =
    typeof getComputedStyle !== "undefined" ? getComputedStyle : undefined;
  const [bulbWidth, setBulbWidth] = useState<null | number>(null);

  useEffect(() => {
    // see https://stackoverflow.com/questions/36532307/rem-px-in-javascript
    if (typeof gcs !== "undefined" && document.documentElement) {
      const value = 0.3 * parseFloat(gcs(document.documentElement).fontSize);
      setTimeout(() => {
        setBulbWidth(value);
      }, 20);
    }
    return setBulbWidth(null);
  }, [gcs]);

  const lights = useMemo(() => {
    const stepsize = (Math.PI * 2) / LIGHTSINCIRCLE;
    return bulbWidth === null
      ? []
      : new Array(LIGHTSINCIRCLE)
        .fill(1)
        .map((item, index) => stepsize * index)
        .map((angle) =>
          getPosition(
            RADIUS,
            angle,
            -getAngleForRadianMeasure(bulbWidth / 2, RADIUS)
          )
        );
  }, [bulbWidth]);

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


  const duration = useMemo(() => (!playing ? 1.5 : 0.5), [playing]);
  const offset = useMemo(() => duration / 2, [duration]);

  const lastItem = useMemo(() => {
    if (lastWin >= 0 && values.length > lastWin) {
      return values[lastWin];
    }
    return null;
  }, [lastWin, values]);

  const onstart = (e: React.MouseEvent<any>) => {
    e.preventDefault();
    e.stopPropagation();
    updatePlaying();
    if (playing) {
      calculateWinner();
    } else {
      setLastWin(-1);
    }
  };

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

  return (
    <div
      className="App"
      style={{
        // backgroundImage: `url(${Fair})`,
        backgroundRepeat: "no-repeat",
        backgroundPositionY: "bottom",
        backgroundSize: "cover",
      }}
    >
      <div
        style={{
          position: "relative",
          height: "100vh",
          width: "100vw",
          backgroundColor: "#00000099",
          overflow: "hidden",
        }}
      >
        <LitLogo
          duration={duration}
          offset={offset}
          playing={playing}
          showLights={bulbWidth !== null}
        />

        <img
          src={Digitalization.src}
          alt="Logo"
          style={{
            position: "absolute",
            background: "transparent",
            width: "40%",
            right: `0vw`,
            bottom: `16vh`,
          }}
        ></img>

        <LitGraphics

          duration={duration}
          offset={offset}
          playing={playing}
          showLights={bulbWidth !== null}
        />

        <AppWheel
          key={devicePixelRatio}
          onClick={onstart}
          playing={playing}
          lastWin={lastWin}
          values={values}
        />

        <InnerWheel playing={playing} />
        {/* 

        <img
          src={sloth.src}
          style={{
            position: "absolute",
            height: RADIUS / 3,
            width: RADIUS / 3,
            left: `calc(50% - ${RADIUS / 6}px - .5px)`,
            top: `calc(50% - ${RADIUS / 6}px + 5px)`,
          }}
          alt="INNERFIX"
        /> */}

        {/* Borders */}
        <div
          style={{
            position: "absolute",
            height: `calc( ${RADIUS * 2}px - 4rem)`,
            width: `calc( ${RADIUS * 2}px - 4rem)`,
            borderRadius: RADIUS * 2,
            background: "transparent",
            left: `calc(50% - ${RADIUS}px - 2rem)`,
            top: `calc(50% - ${RADIUS}px - 2rem)`,
            borderWidth: "4rem",
            borderStyle: "solid",
            borderColor: MATERNA_GREY,
            boxShadow: "inset 0 0px 50px #44546A",
            pointerEvents: "none",
          }}
        ></div>

        <div
          style={{
            position: "absolute",
            height: `calc( ${RADIUS * 2}px - 4rem)`,
            width: `calc( ${RADIUS * 2}px - 4rem)`,
            borderRadius: RADIUS * 2,
            background: "transparent",
            left: `calc(50% - ${RADIUS}px - 2rem)`,
            top: `calc(50% - ${RADIUS}px - 2rem)`,
            borderWidth: "4rem",
            borderStyle: "solid",
            borderColor: "#334357",
            boxShadow: "0 0px 50px #44546A",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            height: `calc( ${RADIUS * 2}px - 3rem)`,
            width: `calc( ${RADIUS * 2}px - 3rem)`,
            borderRadius: RADIUS * 2,
            background: "transparent",
            left: `calc(50% - ${RADIUS}px - 1.5rem)`,
            top: `calc(50% - ${RADIUS}px - 1.5rem)`,
            borderWidth: "3rem",
            borderStyle: "solid",
            borderColor: "#C30A17",
            pointerEvents: "none",
          }}
        ></div>

        <div
          style={{
            position: "absolute",
            height: "5rem",
            left: `calc(50% - 1.5rem)`,
            top: `calc(50% - ${RADIUS}px - 2rem)`,
          }}
        >
          <WheelPointer playing={playing} />
        </div>

        {/* Lights */}
        {lightbulbs}

        {/* Controls */}
        <button
          style={{
            border: "black",
            height: 80,
            width: 320,
            fontSize: "2rem",
            fontWeight: "bold",
            position: "absolute",
            left: "2vw",
            bottom: "12vh",
            backgroundColor: MATERNA_RED2,
            color: "white",
            boxShadow: "inset 0 0px 4px black",
          }}
          onClick={onstart}
          disabled={!roundDone}
        >
          Spin and Win
        </button>

        <Winning
          hide={roundDone}
          selectedIndex={lastWin}
          onWinningShowFinished={(last) => {
            if (lastWin === last) {
              setRoundDone(true);
            }
          }}
          values={values}
        ></Winning>

        <div
          style={{
            color: "white",
            position: "absolute",
            bottom: "2vh",
            right: "2vw",
          }}
        >
          PRODly created by T. Lansing, S. Pauka & J. Neubauer
        </div>
      </div>
    </div>
  );
}

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

export default App;
