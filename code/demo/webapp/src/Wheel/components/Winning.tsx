import { useEffect, useMemo, useRef } from "react";
import { useReward } from "react-rewards";
import { WheelValue } from "../../api/data/types/WheelValue";
import { useQuery } from "@apollo/client";
import { queryDisplaysettings } from "@/Configuration/mutations/queryDisplaysetting";
import { useGetWheelSettings } from "@/Configuration/WheelSettings/useGetWheelSettings";

// import cheer from "./../assets/cheer.mp3";
// import lost from "./../assets/lost.mp3";

// const cheersAudio = new Audio(cheer);
// const lostAudio = new Audio(lost);

export const Winning = (props: {
  hide: boolean;
  selectedIndex: number;
  onWinningShowFinished: (index: number) => any | Promise<any>;
  values: WheelValue[];
}) => {
  const { radius, rotationDurationPlaying } = useGetWheelSettings();
  const { data: displaySettings } = useQuery(queryDisplaysettings);
  const {
    selectedIndex,
    hide,
    onWinningShowFinished: onResult,
    values,
  } = props;
  const { reward } = useReward("rewardLeft", "confetti");
  const { reward: rewardR } = useReward("rewardRight", "confetti");
  const { reward: remoji } = useReward("rewardLeft", "emoji", {
    emoji: ["🥺", "😭"],
    spread: 270,
    startVelocity: 17,
  });
  const { reward: remojiR } = useReward("rewardRight", "emoji", {
    emoji: ["🥺", "😭"],
    spread: 270,
    startVelocity: 17,
  });

  const performRewards = useRef(() => {});
  performRewards.current = () => {
    reward();
    rewardR();
  };

  const performSad = useRef(() => {});
  performSad.current = () => {
    remoji();
    remojiR();
  };
  const onResultCB = useRef((next: number) => {});

  onResultCB.current = onResult;

  const lastItem = useMemo(() => {
    if (selectedIndex >= 0 && values.length > selectedIndex) {
      return values[selectedIndex];
    }
    return null;
  }, [selectedIndex, values]);
  const winLooseNone = useMemo(() => {
    if (lastItem) {
      if (lastItem.win) {
        return "win";
      } else {
        return "loose";
      }
    }
    return "none";
  }, [lastItem]);

  useEffect(() => {
    if (!hide && winLooseNone !== "none") {
      (async () => {
        // if (winLooseNone === "win") {
        //     cheersAudio.pause();
        //     cheersAudio.currentTime = 0;
        //     cheersAudio.play();
        // } else {
        //     lostAudio.pause();
        //     lostAudio.currentTime = 0;
        //     lostAudio.play();
        // }

        await new Promise((r) =>
          setTimeout(
            r,
            displaySettings?.displaySettings?.showResultAfterMS ?? 0
          )
        );
        if (winLooseNone === "win") {
          performRewards.current();
        } else {
          performSad.current();
        }
        await new Promise((r) =>
          setTimeout(r, displaySettings?.displaySettings?.showResultForMS ?? 0)
        );
        onResultCB.current(selectedIndex);
      })();
    }
  }, [
    displaySettings?.displaySettings?.showResultAfterMS,
    displaySettings?.displaySettings?.showResultForMS,
    hide,
    onResult,
    selectedIndex,
    winLooseNone,
  ]);

  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: "#0000008A",
        top: "0%",
        left: "0%",
        right: "0%",
        bottom: "0%",
        overflow: "hidden",
        opacity: hide ? 0 : 1,
        transition: " opacity 1s linear",
        pointerEvents: hide ? "none" : undefined,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "calc(50% - 6rem)",
          left: `calc(50% - ${radius}px - 8rem)`,
          fontSize: "8rem",
          height: "8rem",
          width: "8rem",
        }}
      >
        <span
          id="rewardLeft"
          style={{ position: "absolute", left: "50%", top: "50%" }}
        />
        {winLooseNone === "win"
          ? "🎉"
          : winLooseNone === "loose"
          ? "😢"
          : undefined}
      </div>
      <div
        style={{
          position: "absolute",
          top: "calc(50% - 6rem)",
          left: `calc(50% - ${radius}px)`,
          fontSize: "2.5rem",
          height: "12rem",
          width: radius * 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: "bold",
        }}
      >
        <div>{lastItem?.winText ?? ""}</div>
      </div>
      <div
        style={{
          position: "absolute",
          top: "calc(50% - 6rem)",
          left: `calc(50% + ${radius}px)`,
          fontSize: "8rem",
          height: "8rem",
          width: "8rem",
        }}
      >
        <span
          id="rewardRight"
          style={{ position: "absolute", left: "50%", top: "50%" }}
        />
        {winLooseNone === "win"
          ? "🎉"
          : winLooseNone === "loose"
          ? "😢"
          : undefined}
      </div>
    </div>
  );
};
