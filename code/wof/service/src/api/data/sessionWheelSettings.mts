import { WheelSettings } from "../generated-types/graphql.mjs";
import { RADIUS } from "./constants/RADIUS";
import { SPIN_DURATION } from "./constants/SPIN_DURATION";
import { SPIN_INNER_DURATION } from "./constants/SPIN_INNER_DURATION";

export const sessionWheelSettings: WheelSettings = {
  radius: RADIUS,
  rotationDurationInner: SPIN_INNER_DURATION,
  rotationDurationNotPlaying: Math.floor(SPIN_DURATION * 100),
  rotationDurationPlaying: SPIN_DURATION,
  minClickDelayMS: 3000,
};
