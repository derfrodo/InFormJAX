/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useMemo, useState } from "react";

import Digitalization from "./assets/Bild3.png";

import { useGetWheelSettings } from "@/Configuration/WheelSettings/useGetWheelSettings";
import Link from "next/link";
import { AppWheel } from "./components/AppWheel";
import { InnerWheel } from "./components/InnerWheel";
import { LitGraphics } from "./components/LitGraphics";
import { LitLogo } from "./components/LitLogo";
import { WheelLights } from "./components/WheelLights";
import { WheelPointer } from "./components/WheelPointer";
import { Winning } from "./components/Winning";
import { CHECK_CHANCE } from "./constants/WIN_CHANCE";
import { WheelValue } from "../api/data/types/WheelValue";
import { useDevicePixelRatio } from "./utils/getDevicePixelRatio";
import { useQuery } from "@apollo/client";
import { queryGameSettings } from "./gql/queryGameSettings";

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
  for (let i = 0; i < n; i++) {
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


function getWinner(sumOfChances: number, values: WheelValue[]) {
  if (values.length === 0) {
    console.error("NO values to be found.");
  }
  const randomResult = Math.random() * sumOfChances;

  let currentChance = 0;
  for (const value of values) {
    currentChance += value.winChance;
    if (currentChance > randomResult) {
      return value;
    }
  }

  return values[values.length - 1];
}



function App(props: { values: WheelValue[] }) {
  const { radius } = useGetWheelSettings();
  const { data } = useQuery(queryGameSettings);

  const [lastWin, setLastWin] = useState(0);
  const [roundDone, setRoundDone] = useState(true);
  const [playing, setPlaying] = useState(false);

  const devicePixelRatio = useDevicePixelRatio();

  const { values } = props;
  const winChance = data?.gameSettings?.chanceToWin ?? 0;
  const sumOfLooseChance = data?.gameSettings?.sumOfLooseChance ?? 0;
  const sumOfWinChance = data?.gameSettings?.sumOfWinChance ?? 0;

  const calculateWinner = useCallback(() => {
    console.log(winChance);

    const winner = isWinner(winChance);

    if (CHECK_CHANCE) {
      let won = 0;
      let lost = 0;
      for (let i = 0; i < 1000000; i++) {
        if (isWinner(winChance)) {
          won++;
        } else {
          lost++;
        }
      }
      console.log("Checked chance", {
        won,
        lost,
        all: won + lost,
        winChance,
        actual: won / (won + lost),
      });
    }

    if (winner) {
      //WON!
      const winOptions = values.filter((value) => value.win);
      const winOffset = getWinner(sumOfWinChance, winOptions);
      const winIndex = values.indexOf(winOffset);
      console.log({ winOffset, winIndex });
      setLastWin(winIndex);
      setRoundDone(false);
    } else {
      // LOST!
      const lostOptions = values.filter((value) => !value.win);
      const lostOffset = getWinner(sumOfLooseChance, lostOptions);
      const lostIndex = values.indexOf(lostOffset);
      console.log({ lostOffset, lostIndex });
      setLastWin(lostIndex);
      setRoundDone(false);
    }
  }, [sumOfLooseChance, sumOfWinChance, values, winChance]);

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
            height: `calc( ${radius * 2}px - 4rem)`,
            width: `calc( ${radius * 2}px - 4rem)`,
            borderRadius: radius * 2,
            background: "transparent",
            left: `calc(50% - ${radius}px - 2rem)`,
            top: `calc(50% - ${radius}px - 2rem)`,
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
            height: `calc( ${radius * 2}px - 4rem)`,
            width: `calc( ${radius * 2}px - 4rem)`,
            borderRadius: radius * 2,
            background: "transparent",
            left: `calc(50% - ${radius}px - 2rem)`,
            top: `calc(50% - ${radius}px - 2rem)`,
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
            height: `calc( ${radius * 2}px - 3rem)`,
            width: `calc( ${radius * 2}px - 3rem)`,
            borderRadius: radius * 2,
            background: "transparent",
            left: `calc(50% - ${radius}px - 1.5rem)`,
            top: `calc(50% - ${radius}px - 1.5rem)`,
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
            top: `calc(50% - ${radius}px - 2rem)`,
          }}
        >
          <WheelPointer playing={playing} />
        </div>

        {/* Lights */}
        <WheelLights
          duration={duration}
          offset={offset}
          playing={playing}
          showLights={bulbWidth !== null}
          bulbWidth={bulbWidth}
          roundDone={roundDone}
          lastItem={lastItem}
        />

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
          PRODly created by T. Lansing, S. Pauka & J. Neubauer{" "}
          <Link href="/config" style={{ marginLeft: 8 }}>
            ⚙️
          </Link>
          <Link href="/highscore" style={{ marginLeft: 8 }}>
            🏆
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;
