import { UpdateWheelSettingsMutationReturnType } from "@/Configuration/WheelSettings/UpdateWheelSettingsMutationReturnType";
import { RADIUS } from "../../Wheel/constants/RADIUS";
import { SPIN_DURATION } from "../../Wheel/constants/SPIN_DURATION";
import { SPIN_INNER_DURATION } from "../../Wheel/constants/SPIN_INNER_DURATION";

export const sessionWheelSettings: UpdateWheelSettingsMutationReturnType = {
  radius: RADIUS,
  rotationDurationInner: SPIN_INNER_DURATION,
  rotationDurationNotPlaying: Math.floor(SPIN_DURATION * 100),
  rotationDurationPlaying: SPIN_DURATION,
  minClickDelayMS: 1000,
};
