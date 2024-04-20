import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useMutation, useQuery, useSubscription } from "@apollo/client";
import "./App.css";
import { AppWheel } from "./components/AppWheel";
import { InnerWheel } from "./components/InnerWheel";
import { LitLogo } from "./components/LitLogo";
import { WheelLights } from "./components/WheelLights";
import { WheelPointer } from "./components/WheelPointer";
import { Winning } from "./components/Winning";
import { useDevicePixelRatio } from "./utils/getDevicePixelRatio";

import { Link, useLocation, } from "react-router-dom";
import BackgroundImage from "../../assets_generated/background_full.svg";
import { useGetWheelSettings } from "../config/WheelSettings/useGetWheelSettings";
import { queryWheelParts } from "./gql/queryWheelParts";
import { startWheel } from "./gql/startWheel";
import { stopWheel } from "./gql/stopWheel";
import { subscribeToGame } from "./gql/subscribeToGame";

const GRAPHICXWIDTH = 563;
const GRAPHICXHEIGHT = 764;
export const GRAPHICXASPECT = GRAPHICXWIDTH / GRAPHICXHEIGHT;

export const MATERNA_GREY = "#334357";

export const MATERNA_RED = "rgb(196,26,23)";
export const MATERNA_RED2 = "#c30a17";

function App() {
  const { pathname } = useLocation();
  const { radius } = useGetWheelSettings();
  const { data: wheelparts, refetch } = useQuery(queryWheelParts, { variables: { filter: { disabled: false } } });
  const { data, } = useSubscription(subscribeToGame, { shouldResubscribe: true })
  const [callStartWheel] = useMutation(startWheel)
  const [callStopWheel] = useMutation(stopWheel)

  useEffect(() => { refetch() }, [])
  const values = useMemo(() => wheelparts?.wheelParts ?? [], [wheelparts?.wheelParts])

  const canClick = useMemo(() => data?.gameChanged?.canToggle ?? true, [data?.gameChanged?.canToggle])
  const lastWin = useMemo(() => data?.gameChanged?.resultId ?? -1, [data?.gameChanged?.resultId])
  const lastValue = useMemo(() =>
    typeof lastWin === "string" || lastWin > -1 ? wheelparts?.wheelParts?.find(p => p.id === lastWin) ?? null : null,
    [lastWin, wheelparts?.wheelParts])

  const playing = useMemo(() => data?.gameChanged?.isRunning ?? false, [data?.gameChanged?.isRunning])

  const devicePixelRatio = useDevicePixelRatio();
  const updatePlaying = useCallback(() => {
    if (!data?.gameChanged?.isRunning) {
      callStartWheel()
    } else {
      callStopWheel()
    }
  }, [callStartWheel, callStopWheel, data?.gameChanged?.isRunning]);


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

  const linkRef = useRef<HTMLAnchorElement>(null);

  const onstart = useCallback(
    <T extends MouseEvent | React.MouseEvent<unknown> | KeyboardEvent>(e: T) => {
      if (e.target === linkRef.current) {
        return;
      }
      if (pathname.startsWith("/config")) {
        return
      }
      if (!canClick) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      updatePlaying();
    },
    [canClick, pathname, updatePlaying]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === " ") {
        onstart(e);
      }
    };
    document.addEventListener("keyup", handler);
    document.addEventListener("mouseup", onstart);
    return () => {
      document.removeEventListener("keyup", handler);
      document.removeEventListener("mouseup", onstart);

    }
  }, [onstart]);

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
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
          // backgroundColor: "#00000099",
          overflow: "hidden",
        }}
      >
        <LitLogo
          duration={duration}
          offset={offset}
          playing={playing}
          showLights={bulbWidth !== null}
        />
        {values.length > 0 ?
          <AppWheel
            key={devicePixelRatio}
            onClick={onstart}
            playing={playing}
            lastValue={lastValue}
            values={values}
          />
          : <></>}

        <InnerWheel playing={playing} />

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
          roundDone={data?.gameChanged?.isRoundDone ?? true}
          lastItem={lastValue ?? null}
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
            opacity: !canClick ? .1 : undefined
          }}
          onClick={onstart}
          disabled={!canClick}
        >
          Spin2Win
        </button>

        <Winning
          hide={(data?.gameChanged?.isRoundDone ?? true) || (data?.gameChanged?.isRunning ?? false)}
          lastValue={lastValue}
        ></Winning>

        <div
          style={{
            color: "white",
            position: "absolute",
            bottom: "2vh",
            right: "2vw",
          }}
        >
          <Link
            ref={linkRef}
            replace
            to="/config" style={{ marginLeft: 8 }}>
            ⚙️
          </Link>

        </div>
      </div>
    </div>
  );

}


export default App;
